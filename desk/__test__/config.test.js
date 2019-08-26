const config = require('../config');
const builder = require('../modbus/builder');

test('getUrl', () => {
    expect(config.url.getUrl()).toEqual(`http://localhost:51200`)
});

test('16位补码求原码', () => {
    expect(builder.toOrgInt(0xffb5)).toEqual(-75);
    expect(builder.toOrgInt(0xefff)).toEqual(-4097);
    expect(builder.toOrgInt(0x3344)).toEqual(13124);
})