import { contextBridge, ipcRenderer } from "electron";
import { Guest, GuestRetrieve } from "./db/models/DbModels/GuestsSchema";
contextBridge.exposeInMainWorld("electronAPI", {
  // Add your API methods here
  // Example: openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getGuests: (type:string) => ipcRenderer.invoke("db:getGuests",type),
  addGuest: (guest: Guest) => ipcRenderer.invoke("db:addGuest", guest),
  findGuests: (guestFilter: Partial<Guest>) =>
    ipcRenderer.invoke("db:findGuests", guestFilter),
  removeGuest: (id: number) => ipcRenderer.invoke("db:removeGuest", id),
  updateGuest: (guest: Guest) => ipcRenderer.invoke("db:updateGuest", guest),
});
declare global {
  interface Window {
    electronAPI: {
      getGuests:(type:string)=> Promise<Guest[]>;
      addGuest: (guest: Guest) => void;
      findGuests: (guestFilter: Partial<Guest>) => Guest[];
      removeGuest: (id: number) => number;
      updateGuest: (guest: Guest) => void;
    };
  }
}
