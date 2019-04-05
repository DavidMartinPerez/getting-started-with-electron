const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash');

const { app, BrowserWindow, ipcMain, shell } = electron

let window = null;

app.on('ready', () => {
    window = new BrowserWindow({
        height:600,
        width:800,
        webPreferences: {
            backgroundThrottling: false
        }
    })
    window.loadURL(`file://${__dirname}/src/index.html`)
})

ipcMain.on('video:added', (event, videos) => {
    const promises = _.map(videos, video => {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(video.path, (err, metadata) => {
                video.duration = metadata.format.duration;
                video.format = 'avi'
                resolve(video);
            })
        })
    })

    Promise.all(promises)
        .then((results) => {
            window.webContents.send('metadata:complete', results);
        })
})

ipcMain.on('conversion:start', (event, videos) => {
    _.each(videos, video => {
        const outputDirectory = video.path.split(video.name)[0]
        const outputName = video.name.split('.')[0]
        const outputPath = `${outputDirectory}${outputName}.${video.format}`

        console.log(outputPath)

        ffmpeg(video.path)
            .output(outputPath)
            .on('progress', ( { timemark } ) => {
                window.webContents.send('conversion:progress', { video, timemark });
            })
            .on('end', () => {
                window.webContents.send('conversion:end', { video, outputPath })
            }).run();
    })
})

ipcMain.on('folder-video:open', (event, path) => {
    shell.showItemInFolder(path);
})