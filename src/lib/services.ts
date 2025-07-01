import Database from "better-sqlite3";
import { database } from "../db/models/dbmanager";
import { Guest } from "../db/models/DbModels/GuestsSchema";

function getAllGuests() {
  let stmt: Database.Statement<[], Guest> = database.prepare("SELECT * from Guests");
  let res = stmt.all();
  return res;
}
function addGuest(guest: Guest) {
  const stmt = database.prepare(`
    INSERT INTO Guests (
      name, room, status, nights, check_in, check_out, paymentType, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    guest.name,
    guest.room,
    guest.status,
    guest.nights,
    guest.check_in.toString(),  // CalendarDate to ISO string
    guest.check_out.toString(),
    guest.paymentType,
    guest.notes
  );

}

function findGuests(filter: Partial<Guest>):Guest[] {
  let sql = "SELECT * FROM Guests";
  const conditions: string[] = [];
  const values: (string | number)[] = [];

  if (filter.status) {
    conditions.push("status = ?");
    values.push(filter.status);
  }

  if (filter.room) {
    conditions.push("room = ?");
    values.push(filter.room);
  }

  if (filter.paymentType) {
    conditions.push("paymentType = ?");
    values.push(filter.paymentType);
  }

  if (filter.nights) {
    conditions.push("nights = ?");
    values.push(filter.nights);
  }

  if (filter.check_in) {
    conditions.push("check_in >= ?");
    values.push(filter.check_in.toString()); // CalendarDate to string
  }

  if (filter.check_out) {
    conditions.push("check_out <= ?");
    values.push(filter.check_out.toString());
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  const stmt: Database.Statement<(string | number)[], Guest>= database.prepare(sql);
  return stmt.all(...values);
}



export { getAllGuests,addGuest,findGuests };
