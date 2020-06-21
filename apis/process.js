const fs = require('fs').promises;
const { recognize } = require('node-tesseract-ocr');
const { Router } = require('express');

const directory = `${process.cwd()}/files`;
const router = Router();

/**
 * Process the file
 */
router.get('/', async (req, res) => {
  try {
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
        result,
        year: new Date().getFullYear(),
      },
    );
  } catch (error) {
    console.log('error', error)
    // TODO: fix error handling for the frontend
    return res.render('error', { message: error.message });
  }
});

module.exports = router;
