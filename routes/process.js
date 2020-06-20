const multer = require('multer');
const { recognize } = require('node-tesseract-ocr');
const { Router } = require('express');

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, `${process.cwd()}/files`),
  filename: (req, file, cb) => cb(
    null,
    `${file.fieldname}.${file.originalname.split('.').slice(-1)}`,
  ),
});
const upload = multer({ storage });

/**
 * Process the file
 */
router.post('/', upload.single('file'), async (req, res) => {
  try {
    // TODO: check file

    // TODO: load file differently (do not hardcode the filename)
    const result = await recognize(`${process.cwd()}/files/file.png`, {
      lang: 'eng',
      oem: 1,
      psm: 3,
    });

    // TODO: remove the loaded file from the disk

    return res.render('processed', { result });
  } catch (error) {
    // TODO: fix error handling for the frontend
    return res.render('error', { message: error.message });
  }
});

module.exports = router;
