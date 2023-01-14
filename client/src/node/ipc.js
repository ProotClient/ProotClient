module.exports = function(ipcMain, window, console) {
	
	ipcMain.handle("log", (info)=>{
		console.log(info);
	});
	
	ipcMain.handle("isWindowMaximized", ()=>{
		return window.isMaximized();
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
	
}
