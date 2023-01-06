const {ipcMain, app, BrowserWindow} = require('electron');
const path = require('path');
var fs = require('fs');

var window;

var setupDone = false;

function createWindow() {
    const win = new BrowserWindow({
        title: "Minecraft 1.19.3*",
        icon: 'src/icon_taskbar.png',
        show: false,
        backgroundColor: '#323232',
        titleBarStyle: 'hidden',
        minWidth: 640,
        minHeight: 480,
        webPreferences: {
            preload: `${__dirname}/src/js/preload.js`,
            webgl: true,
            webSecurity: true,
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: true
        }
    });

    win.loadFile('src/index.html');

    return win;
}

app.whenReady().then(()=>{
    const {screen} = require('electron');
    window = createWindow();

    app.on('activate', ()=>{
        if (BrowserWindow.getAllWindows().length === 0) {
            window = createWindow();
        }
    }
    );

    window.once('ready-to-show', ()=>{
        if (!setupDone) {
            window.maximize();
            window.show();
            setupDone = true;
        }
    }
    );

    app.on('window-all-closed', ()=>{
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }
    );
}
);

ipcMain.handle("closeWindow", ()=>{
    window.close();
}
);
ipcMain.handle("minimizeWindow", ()=>{
    window.minimize();
}
);
ipcMain.handle("toggleMaximizeWindow", ()=>{
    if (window.isMaximized()) {
        window.unmaximize();
    } else {
        window.maximize();
    }
    return window.isMaximized();
}
);
