import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { getAllGuests,addGuest,findGuests } from "./lib/services";
import { Guest } from "./db/models/DbModels/GuestsSchema";
import { findAncestor } from "typescript";

ipcMain.handle("db:getAll", async () => {
  try {
    return getAllGuests();
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
});
ipcMain.handle("db:addGuest", async (_event, guest:Guest) => {
  try {
    return addGuest(guest);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
});
ipcMain.handle("db:findGuests", async (_event, guestFilter:Partial<Guest>) => {
  try {
    return findGuests(guestFilter);
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
});

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 981,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.webContents.openDevTools();
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
