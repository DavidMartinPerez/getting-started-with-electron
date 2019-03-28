const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow; //Pantalla principal

app.on('ready', () => {
    console.log('App is now ready');

    mainWindow = new BrowserWindow({
        width: 360,
        height: 680
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    console.log(ipcMain)

    // ######3######################## Comunicación con electron -> webview ########################################
    // MainWindow (ipcRenderer.send) -- Webview envia evento a electron -> Electron App (ipcMain.on)
    // Electron App (mainWindow.webContents.send) --  electron envia evento al webview-> MainWindow (ipcRenderer.on)
    // ######3######################## Comunicación con electron -> webview ########################################


})

ipcMain.on('video:submit', ( event, path) => {
    ffmpeg.ffprobe(path, ( err, metadata ) => {
        mainWindow.webContents.send('video:metadata',metadata.format.duration)
    })
})