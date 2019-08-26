const { modbus_crc16 } = require('./crc');

/**
 * 由低字节到高字节
 * 

 
 04 (0x04)-读输入寄存器-readInputRegister
 格式： addr(1b)+cmd(1b)+reg(2b)+count(2b)+crc(2b)
 返回:  addr(1b)+cmd(1b)+count(1b)+status(1b)+crc(2b)

 

 

 */

class builder {

    /**
     * 16位补码求原码
     * @param {*} int16 
     */
    static toOrgInt(int16) {
        if ((0x8000 & int16) !== 0) {

            return -1 * (((~int16 & 0x7fff) + 1) & 0x7fff);
        }
        return int16;
    }

    static bufferSwap(s, soffset, t, toffset, len) {
        for (let x = 0; x < len; x++) {
            let tmp = s[soffset + x];
            s[soffset + x] = t[soffset + x];
            t[toffset + x] = tmp;
        }
    }

    static bufferCp(s, soffset, t, toffset, len) {
        for (let x = 0; x < len; x++) {
            t[toffset + x] = s[soffset + x] & 0xff;
        }
    }

    /**
     * 
     * @param {总线地址} addr 
     * @param {指令} cmd 
     * @param {数据} data 
     */
    static makeCmd(addr, cmd, data) {
        const bl = data.length;
        let len = bl + 4;
        let inx = 0;
        let buf = Buffer.alloc(len);
        buf.writeUInt8(addr, inx++);
        buf.writeUInt8(cmd, inx++);
        builder.bufferCp(data, 0, buf, inx, bl);
        inx += bl;
        const crc = modbus_crc16(buf, 0, bl + 2);
        buf.writeUInt16LE(crc, inx++);
        return buf;
    }

 

    /**
     *  01 (0x01)-读线圈- readCoil 
        格式： addr(1b)+cmd(1b)+reg(2b)+count(2b)+crc(2b)
        返回:  addr(1b)+cmd(1b)+count(1b)+status(1b)+crc(2b)
     * @param {*} add 
     * @param {*} reg 
     * @param {*} count 
     */
    static readCoil(addr, reg, count) {
        const buf = Buffer.alloc(4);
        buf.writeUInt16BE(reg, 0);
        buf.writeUInt16BE(count, 2);
        return builder.makeCmd(addr, 1, buf);
    }

    /**
     * 05 (0x05)-写单个线圈-writeSingleCoil
       格式： addr(1b)+cmd(1b)+value(2b)+crc(2b)
       返回:  addr(1b)+cmd(1b)+value(2b)+crc(2b)
     * @param {*} addr 
     * @param {*} reg 
     * @param {*} val16 
     */
    static writeSingleCoil(addr, reg, val16) {
        const buf = Buffer.alloc(4);
        buf.writeUInt16BE(reg, 0);
        buf.writeUInt16BE(val16, 2);
        return builder.makeCmd(addr, 5, buf);
    }

    /**
     *  15 (0x0F)-写多个线圈-writeMultipleCoil
        格式： addr(1b)+cmd(1b)+reg(2b)+count(2b)+ctx(1b)+value(Nb)+crc(2b)
        返回:  addr(1b)+cmd(1b)+reg(2b)+count(2b)+crc(2b)
        其它为错误0x82
     * @param {*} addr 
     * @param {*} reg 
     * @param {*} byte_array 
     */
    static writeMultipleCoil(addr, reg, count, byte_array) {
        const sz = byte_array.length;
        const buf = Buffer.alloc(5 + sz);
        buf.writeUInt16BE(reg, 0);
        buf.writeUInt16BE(count, 2);
        builder.bufferCp(byte_array, 0, buf, 4, sz);
        return builder.makeCmd(addr, 15, buf);
    }

    /**
     *  02 (0x02)-读离散量输入-readInputStatus
        格式： addr(1b)+cmd(1b)+reg(2b)+count(2b)+crc(2b)
        返回:  addr(1b)+cmd(1b)+count(1b)+status(1b)+crc(2b)
     */

    static readInputStatus(addr, reg, count) {

        const buf = Buffer.alloc(4);
        buf.writeUInt16BE(reg, 0);
        buf.writeUInt16BE(count, 2);
        return builder.makeCmd(addr, 2, buf);
    }


    /**
     * 03 (0x03)-读保持寄存器-readHoldRegister
       格式： addr(1b)+cmd(1b)+reg(2b)+count(2b)+crc(2b)
       返回:  addr(1b)+cmd(1b)+count(1b)+value(Nb)+crc(2b)
     */
    static readHoldRegister(addr, reg, count) {
        const buf = Buffer.alloc(4);
        buf.writeUInt16BE(reg, 0);
        buf.writeUInt16BE(count, 2);
        return builder.makeCmd(addr, 3, buf);
    }


    /**
     *  06 (0x06)-写单个寄存器-writeSingleRegister
        格式： addr(1b)+cmd(1b)+value(2b)+crc(2b)
        返回:  addr(1b)+cmd(1b)+value(2b)+crc(2b)
     */
    static writeSingleRegister(addr, val_16) {
        const buf = Buffer.alloc(2);
        buf.writeUInt16BE(val_16, 0);
        return builder.makeCmd(addr, 6, buf);
    }

    /**
     *  16 (0x10)-写多个寄存器-writeMultipleRegister
        格式： addr(1b)+cmd(1b)+reg(2b)+count(2b)+ctx(1b)+value(Nb)+crc(2b)
        返回:  addr(1b)+cmd(1b)+reg(2b)+count(2b)+crc(2b)
        其它为错误0x82
     */
    static writeMultipleRegister(addr, reg, count, data) {
        const clone = [];
        const len = data.length;
        for (let i = 0; i < len; i++) {
            clone.push(data[i]);
        }
        const bytes = count * 2;
        if (len < bytes) {
            for (let x = 0; x < bytes - len; x++) {
                clone.push(0);
            }
        }
        const buf = Buffer.alloc(5 + len);
        buf.writeUInt16BE(reg, 0);
        buf.writeUInt16BE(count, 2);
        buf.writeUInt8(len, 4);
        builder.bufferCp(clone, 0, buf, 5, bytes);
        return builder.makeCmd(addr, 16, buf);
    }


}

module.exports = builder;