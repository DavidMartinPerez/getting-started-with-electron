const electron = require('electron');

const { app, BrowserWindow, ipcMain } = electron;

app.on('ready', () => {
    console.log('App is now ready');

    const mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    console.log(ipcMain)

    // ######3######################## Comunicación con electron -> webview ########################################
    // MainWindow (ipcRenderer.send) -- Webview envia evento a electron -> Electron App (ipcMain.on)
    // Electron App (mainWindow.webContents.send) --  electron envia evento al webview-> MainWindow (ipcRenderer.on)
    // ######3######################## Comunicación con electron -> webview ########################################


})

ipcMain.on('video:submit', () => {
    console.log("Hey")
})