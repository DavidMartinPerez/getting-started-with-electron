const electron = require('electron')

const { app, BrowserWindow, Menu, ipcMain } = electron;

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

    //Evento focus en window para cambiar template
    mainWindow.on('focus', () => {
        createMenuTemplate(menuTemplate);
    })
});

//Abrimos la pantalla de añadir nota
createNewTodoWindow = () => {
    newToDoWindow = new BrowserWindow({
        height:400,
        width:300,
        title: 'Añade una nueva tarea'
    });

    newToDoWindow.loadURL(`file://${__dirname}/new-todo.html`);
    newToDoWindow.on('closed', ()=> newToDoWindow = null); //Con esto limpiamos la memoria RAM de esta referencia

    //Evento focus en window para cambiar template
    newToDoWindow.on('focus', () => {
        createMenuTemplate(menuTemplateNewToDo)
    })
}

//Evento de escucha para crear una nueva tarea
ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo)
    newToDoWindow.close();
})




//TEMPLATES
createMenuTemplate = (template) => {
    let menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu);
}

const menuTemplate = [
    {
        label: 'Ficheros',
        submenu: [
            {
                label: 'Nueva tarea',
                accelerator: process.platform === "darwin" ? 'Command+N' : 'Ctrl+N',
                click(){
                    if( newToDoWindow == null ) {
                        createNewTodoWindow()
                    } else {
                        newToDoWindow.focus();
                    }
                }
            },{
                label: 'Eliminar todos',
                click() {
                    mainWindow.webContents.send('todos:delete')
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
const menuTemplateNewToDo = []



//COMPROBACIONES DEL SO
if( process.platform === 'darwin' ) {
    menuTemplate.unshift({});
}


if ( process.env.NODE_ENV !== 'production' ) {
    menuTemplate.push(
        { role: 'reload' },
        {
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

        }
    )
}