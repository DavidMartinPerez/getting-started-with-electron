const electron = require('electron')

const { app, Tray, Menu } = electron;

class TimerTray extends Tray{

    constructor(options) {
        super(options.iconPath)

        this.window = options.window;

        this.setToolTip('Temporizador App')
        this.on( 'click', this.onClick.bind(this) )
        this.on('right-click', this.onRightClick.bind(this))
    }

    onClick(event, bounds) {
        //click event bounds
        const { x, y } = bounds;
        //window heigh y width
        const { width , height } = this.window.getBounds();


        //Mostramos o ocultamos la capa
        if ( this.window.isVisible() ) {
            this.window.hide();
        } else {
            this.setPosition(this.window, x, y, width, height)
            this.window.show();
        }
    }

    onRightClick(event, ) {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Salir',
                click: () => app.quit()
            }
        ])
        this.popUpContextMenu(menuConfig)
    }

    //Introducimos la posición inicial de la pantalla
    setPosition( container, x, y, width, height ) {
        const yPosition = process.platform == "darwin" ? y : y - height

        container.setBounds({
            x: x - width / 2,
            y: yPosition,
            height,
            width
        })
    }

}

module.exports = TimerTray;