const Router = require('koa-router');
const song = require('../controllers/song');

const BASE_URL = '/songs';

const router = new Router();

router.post(BASE_URL, song.create);
router.get(BASE_URL, song.list);

module.exports = router;