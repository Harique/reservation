import { contextBridge, ipcRenderer } from "electron";
import { Guest } from "./db/models/DbModels/GuestsSchema";
contextBridge.exposeInMainWorld("electronAPI", {
  // Add your API methods here
  // Example: openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getNames: () => ipcRenderer.invoke("db:getAll"),
  addGuest: (guest:Guest)=> ipcRenderer.invoke('db:addGuest',guest),
  findGuests: (guestFilter:Partial<Guest>)=> ipcRenderer.invoke('db:findGuests',guestFilter),

});
declare global {
  interface Window {
    electronAPI: {
      getNames: () => Promise<Guest[]>;
      addGuest: (guest:Guest)=> void;
      findGuests: (guestFilter:Partial<Guest>) => void;
    };
  }
}
