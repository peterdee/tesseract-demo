const { Router } = require('express');

const router = Router();

router.get('/', (_, res) => res.render('index'));

module.exports = router;
