module.exports = exports = {
    url: {
        host: 'localhost',
        port: 51200,
        getUrl: function () { return `http://${this.host}:${this.port}`; }
    }
}