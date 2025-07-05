import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import {
  getAllGuests,
  addGuest,
  findGuests,
  removeGuest,
  updateGuest,
  getFinishedGuests,
  getActiveGuests,
  isDateTaken,
} from "./lib/services";
import { DateObject, Guest } from "./db/models/DbModels/GuestsSchema";

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 981,
    autoHideMenuBar: true, // This hides the menu bar
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    const filePath = path.join(
      __dirname,
      `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`
    );
    mainWindow.loadURL(`file://${filePath}#/`); // The #/ sets the route to root
  }
  //mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("db:getGuests", async (_event, type: string) => {
  try {
    if (type == "active") {
      return getActiveGuests();
    }
    return getFinishedGuests();
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
});
ipcMain.handle("db:addGuest", async (_event, guest: Guest) => {
  try {
    return addGuest(guest);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
});
ipcMain.handle("db:findGuests", async (_event, guestFilter: Partial<Guest>) => {
  try {
    return findGuests(guestFilter);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
});
ipcMain.handle("db:removeGuest", async (_event, id: number) => {
  try {
    return removeGuest(id);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
});
ipcMain.handle("db:updateGuest", async (_event, guest: Guest) => {
  try {
    return updateGuest(guest);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
});
ipcMain.handle("db:isDateTaken", async (_event, check_in: DateObject, check_out: DateObject,room:string,id?: number) => {
  try {
    return isDateTaken(check_in,check_out,room,id);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
});
