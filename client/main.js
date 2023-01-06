const {ipcMain, app, BrowserWindow} = require('electron');
const path = require('path');
const fs = require('fs');
const rpc = require("discord-rpc");
const client = new rpc.Client({ transport: 'ipc' });

var window;

var setupDone = false;

function createWindow() {
    const win = new BrowserWindow({
        title: "Minecraft 1.19.3*",
        icon: 'src/icon.png',
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
    });

    window.once('ready-to-show', ()=>{
        if (!setupDone) {
            window.maximize();
            window.show();
            setupDone = true;
        }
    });

    app.on('window-all-closed', ()=>{
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
});

ipcMain.handle("closeWindow", ()=>{
    window.close();
});

ipcMain.handle("minimizeWindow", ()=>{
    window.minimize();
});

ipcMain.handle("toggleMaximizeWindow", ()=>{
    if (window.isMaximized()) {
        window.unmaximize();
    } else {
        window.maximize();
    }
    return window.isMaximized();
});

client.login({ clientId: "1061041345382322227" }).catch(console.error);

client.on('ready', () => {
    console.log('Discord Rich Presence now active!');
    client.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            details: "Playing Minecraft 1.19.3",
            state: "Developing the client",
            timestamps: {
                start: Date.now()
            },
            assets: {
                large_image: "prootclient",
                large_text: "ProotClient"
            },
            buttons: [
                {
                    label: "Join Game",
                    url: "https://www.youtube.com/watch?v=jKdM6MhiSyo"
                }
            ]
        }
    });
});
