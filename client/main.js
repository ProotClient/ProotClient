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
		icon: 'src/icon_taskbar.png',
		show: false,
		backgroundColor: '#323232',
		titleBarStyle: 'hidden',
		minWidth: 640,
		minHeight: 480,
		webPreferences: {
			preload: `${__dirname}/src/preload.js`,
			webgl: true,
			webSecurity: true,
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: true
		}
	});
	
	win.loadFile('src/web/index.html');
	
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
			require("./src/node/ipc.js")(ipcMain, window, console);
			setupDone = true;
		}
	});
	
	app.on('window-all-closed', ()=>{
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});
});

require("./src/node/discordrpc.js")(client, process, console);
