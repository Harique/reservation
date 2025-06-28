import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Add your API methods here
  // Example: openFile: () => ipcRenderer.invoke('dialog:openFile'),
}); 