const fs = require('fs').promises;
const multer = require('multer');
const { recognize } = require('node-tesseract-ocr');
const { Router } = require('express');

const directory = `${process.cwd()}/files`;
const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(
    null, 
    `${process.cwd()}/files`,
  ),
  filename: (req, file, cb) => cb(
    null,
    `${Date.now()}.${file.originalname.split('.').slice(-1)}`,
  ),
});
const upload = multer({ storage });

/**
 * Upload and process the file
 */
router.post(
  '/',
  upload.single('file'),
  async (req, res) => {
    try {
      // check file
      const { file: { originalname = '' } = {} } = req;
      if (!originalname) {
        return res.status(400).send({ info: 'MISSING_FILE' });
      }

      // check files directory
      try {
        await fs.access(directory);
      } catch {
        await fs.mkdir(directory);
        return res.status(400).send({ info: 'MISSING_FILE' });
      }

      // check files
      const files = await fs.readdir(directory);
      if (!(Array.isArray(files) && files.length > 0)) {
        return res.status(400).send({ info: 'MISSING_FILE' });
      }
      console.log('-- FILES:\n', files);

      // order files to process the most recent one
      const [file] = files.sort((a, b) => Number(b) - Number(a));

      // process the file
      const result = await recognize(`${directory}/${file}`, {
        lang: 'eng+rus',
        oem: 1,
        psm: 3,
      });

      // delete the file
      await fs.unlink(`${directory}/${file}`);

      return res.render(
        'processed',
        {
          generated: Date.now() - req.incoming,
          result,
          year: new Date().getFullYear(),
        },
      );
    } catch (error) {
      console.log('-- PROCESS ERROR:\n', error);
      return res.status(500).send({ info: 'INTERNAL_SERVER_ERROR' });
    }
  },
);

module.exports = router;
