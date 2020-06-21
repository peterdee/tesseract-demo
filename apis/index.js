const fs = require('fs').promises;
const { Router } = require('express');

const directory = `${process.cwd()}/files`;
const router = Router();

/**
 * Handle index route
 */
router.get('/', async (_, res) => {
  // make sure that the files directory exists
  try {
    await fs.access(directory);
  } catch {
    await fs.mkdir(directory);
  }

  return res.render(
    'index',
    {
      year: new Date().getFullYear(),
    },
  );
});

module.exports = router;
