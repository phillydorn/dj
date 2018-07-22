const Router = require('koa-router');
const songRoutes = require('./songs');

const apiRouter = new Router({
  prefix: '/api',
})

apiRouter.use(songRoutes.routes());

const router = new Router();

router.use(apiRouter.routes());
module.exports = router;