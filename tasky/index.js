const path = require('path')
const electron = require('electron')

const TimerTray = require('./app/timer_tray')
const MainWindow = require('./app/main_window')

const { app } = electron;

let tray;
let mainWindow;

app.on('ready', () => {
    if ( process.platform === 'darwin' ) {
        app.dock.hide();
    }
    createMainWindow();
    createTray();

});


createMainWindow = () => {
    const htmlUrl = `file://${__dirname}/src/index.html`;

    mainWindow = new MainWindow({htmlUrl});
}

createTray = () => {
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    tray = new TimerTray({ iconPath, window: mainWindow });
}
