const electron = require('electron')

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let newToDoWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'Cosas pendientes...'
    });

    console.log(`file://${__dirname}/main.html`)
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    //Si el usuario pulsa el botón cerra de la aplicación cerraremos todos los procesos
    mainWindow.on('closed', () => app.quit() )

    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu);
});

const menuTemplate = [
    {
        label: 'Ficheros',
        submenu: [
            {
                label: 'Nueva tarea',
                accelerator: process.platform === "darwin" ? 'Command+N' : 'Ctrl+N',
                click(){
                    createNewTodoWindow()
                }
            },{
                label: 'Salir',
                accelerator: process.platform === "darwin" ? 'Command+Q' : 'Ctrl+Q',
                click() {
                app.quit();
                }

            }
        ]
    }
]

createNewTodoWindow = () => {
    newToDoWindow = new BrowserWindow({
        height:400,
        width:300,
        title: 'Añade una nueva tarea'
    });

    newToDoWindow.loadURL(`file://${__dirname}/new-todo.html`);
}



//Comprobaciones del sistema
if( process.platform === 'darwin' ) {
    menuTemplate.unshift({});
}


if ( process.env.NODE_ENV !== 'production' ) {
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                label: 'Alternar Herramientas de desarrollador',
                accelerator: process.platform === "darwin" ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ],

    })
}