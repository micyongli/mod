const Koa = require('koa');
const KoaStatic = require('koa-static');
const path = require('path');
const config = require('./config');
const port = config['url']['port'];
const compress = require('koa-compress');
const logger = require('./logger');
const R = require('koa-router');
const fs = require('fs');
const pug = require('pug');

const app = new Koa();
app.use(compress({
    threshold: 2048
}));

app.use(KoaStatic(path.resolve(__dirname, './public')));

const Route = new R();
app.use(Route.routes());

Route.get(['/', '/chart'], ctx => {
    ctx.body = pug.renderFile(path.resolve(__dirname, './views/index.pug'));
});

app.listen(port, () => {
    logger.info(`server start at ${port}`);
});