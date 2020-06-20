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
    console.log(req.file);

    // const result = await recognize(`${process.cwd()}/files/file.png`, {
    //   lang: 'eng',
    //   oem: 1,
    //   psm: 3,
    // });
    // console.log('result', result);

    return res.render('process');
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
