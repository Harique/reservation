import Database from "better-sqlite3";
import { error } from "node:console";
import path from "node:path";

export type DatabaseType = Database.Database;

const dbPath = path.join(__dirname, "../../sqlite");

const db = new Database(dbPath);
if (!db) throw error("DB IS NOT CONNECTED");
db.exec(`CREATE TABLE IF NOT EXISTS Guests (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  room TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Active', 'Reserved', 'Finished', 'Cancelled')),
  nights INTEGER NOT NULL,
  check_in TEXT NOT NULL,   -- Store CalendarDate as ISO string
  check_out TEXT NOT NULL,  -- Store CalendarDate as ISO string
  paymentType TEXT NOT NULL CHECK (paymentType IN ('Airbnb', 'Booking', 'Other')),
  notes TEXT
);`);

export const database: DatabaseType = db;
