const path = require('path')
const electron = require('electron')

const TimerTray = require('./app/timer_tray')

const { app, BrowserWindow } = electron;

const widthWindow = 320;
const heightWindow = 640;
let tray;
let mainWindow;

app.on('ready', () => {

    createMainWindow();
    createMainTray();

});


createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: widthWindow,
        height: heightWindow,
        frame: false,
        resizable: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
}

createMainTray = () => {
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    tray = new TimerTray({ iconPath, window: mainWindow });
}
