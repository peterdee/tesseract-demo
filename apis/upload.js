const multer = require('multer');
const { Router } = require('express');

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
 * Upload the file
 */
router.post(
  '/',
  upload.single('file'),
  (req, res) => {
    try {
      // check file
      const { file: { originalname = '' } = {} } = req;
      if (!originalname) {
        return res.status(400).send({ info: 'MISSING_FILE' });
      }

      return res.redirect('/processed');
    } catch (error) {
      return res.status(500).send({ info: 'INTERNAL_SERVER_ERROR' });
    }
  },
);

module.exports = router;
