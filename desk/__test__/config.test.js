const config = require('../config');

test('config url match', () => {
    expect(config.url.getUrl()).toEqual(`http://localhost:51200`)
});