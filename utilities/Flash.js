class Falsh {
    constructor (req) {
        this.req = req;
        this.success = this.extractFlashMsg('success');
        this.fail = this.extractFlashMsg('fail');
    }

    extractFlashMsg (name) {
        const msg = this.req.flash(name);
        return msg.length > 0 ? msg[0] : false;
    }

    hashMsg () {
        return this.success && this.fail ? true : false;
    }

    static getFlashMsg(req) {
        const flash = new Falsh(req);
        return {
            success : flash.success,
            fail: flash.fail,
            hashMsg: flash.hashMsg()
        }
    }
}

module.exports = Falsh;