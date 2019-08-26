const Koa = require('koa');
const KoaStatic = require('koa-static');
const path = require('path');
const config = require('./config');
const port = config['url']['port'];
const compress = require('koa-compress');
const logger = require('./logger');

const app = new Koa();
app.use(compress({
    threshold: 2048
}));

app.use(KoaStatic(path.resolve(__dirname, './public')));

app.listen(port, () => {
    logger.info(`server start at ${port}`);
});