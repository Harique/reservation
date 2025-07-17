import { contextBridge, ipcRenderer } from "electron";
import {
  DateObject,
  Guest,
} from "./db/models/DbModels/GuestsSchema";
import { CalendarDate } from "@internationalized/date";
contextBridge.exposeInMainWorld("electronAPI", {
  // Add your API methods here
  // Example: openFile: () => ipcRenderer.invoke('dialog:openFile'),
  getGuests: (type: string) => ipcRenderer.invoke("db:getGuests", type),
  addGuest: (guest: Guest) => ipcRenderer.invoke("db:addGuest", guest),
  findGuests: (guestFilter: Partial<Guest>) =>
    ipcRenderer.invoke("db:findGuests", guestFilter),
  removeGuest: (id: number) => ipcRenderer.invoke("db:removeGuest", id),
  updateGuest: (guest: Guest) => ipcRenderer.invoke("db:updateGuest", guest),
  isDateTaken: (
    check_in: DateObject,
    check_out: DateObject,
    room: string,
    id?: number
  ) => ipcRenderer.invoke("db:isDateTaken", check_in, check_out, room,id),
  getUnAvailableDates:(room: string) => ipcRenderer.invoke("db:getUnAvailableDates", room),
});
declare global {
  interface Window {
    electronAPI: {
      getGuests: (type: string) => Promise<Guest[]>;
      addGuest: (guest: Guest) => void;
      findGuests: (guestFilter: Partial<Guest>) => Guest[];
      removeGuest: (id: number) => number;
      updateGuest: (guest: Guest) => void;
      isDateTaken: (
        check_in: DateObject,
        check_out: DateObject,
        room: string,
        id?: number
      ) => boolean;
      getUnAvailableDates: (room: string) => Promise<CalendarDate[]>;
    };
  }
}
