const {contextBridge, ipcRenderer, remote} = require('electron');

contextBridge.exposeInMainWorld('api', {
    closeWindow: ()=>ipcRenderer.invoke("closeWindow"),
    minimizeWindow: ()=>ipcRenderer.invoke("minimizeWindow"),
    toggleMaximizeWindow: ()=>ipcRenderer.invoke("toggleMaximizeWindow"),
    handle: (channel,callable,event,data)=>ipcRenderer.on(channel, callable(event, data))
});
