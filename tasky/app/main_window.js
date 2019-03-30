const electron = require('electron')

const { BrowserWindow } = electron;
const widthWindow = 320;
const heightWindow = 640;


class MainWindow extends BrowserWindow{

    constructor(options) {
        super({
            width: widthWindow,
            height: heightWindow,
            frame: false,
            resizable: false,
            show: false,
            webPreferences: {
                backgroundThrottling: true,
            }
        })

        this.loadURL(options.htmlUrl);
        this.on('blur', this.onBlur.bind(this))
    }

    onBlur() {
        this.hide()
    }
}

module.exports = MainWindow;