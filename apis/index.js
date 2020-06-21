const fs = require('fs').promises;
const { Router } = require('express');

const directory = `${process.cwd()}/files`;
const router = Router();

/**
 * Handle index route
 */
router.get('/', async (req, res) => {
  // make sure that the files directory exists
  try {
    await fs.access(directory);
  } catch {
    await fs.mkdir(directory);
  }

  return res.render(
    'index',
    {
      generated: Date.now() - req.incoming,
      year: new Date().getFullYear(),
    },
  );
});

module.exports = router;
