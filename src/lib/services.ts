import Database from "better-sqlite3";
import { database } from "../db/models/dbmanager";
import { Guest, GuestRetrieve, GuestFilter, DateObject } from "../db/models/DbModels/GuestsSchema";
import { fileURLToPath } from "node:url";
import { toDate } from "reka-ui/date";
import {dateObjectToDate} from './utils'
import { ActivitySquare } from "lucide-vue-next";

function getAllGuests() {
  let stmt: Database.Statement<[], Guest> = database.prepare(
    "SELECT * from Guests"
  );

  let res = stmt.all();
  return res;
}
function getActiveGuests(): Guest[] {
  const stmt: Database.Statement<[], GuestRetrieve> = database.prepare(`
        SELECT * FROM Guests 
        WHERE status IN ('Active', 'Reserved','Pending')
        ORDER BY 
          CASE status 
            WHEN 'Active' THEN 1
            WHEN 'Reserved' THEN 2
          END;
    `);
  stmt.run();
  const res = stmt.all();
  return res.map((guest) => ({
    id: guest.id,
    name: guest.name,
    room: guest.room,
    status: guest.status,
    nights: guest.nights,
    check_in: JSON.parse(guest.check_in) as DateObject, // Parse JSON back to Date
    check_out: JSON.parse(guest.check_out) as DateObject, // Parse JSON back to Date
    paymentType: guest.paymentType,
    notes: guest.notes,
  }));
}
function getFinishedGuests(): Guest[] {
  const stmt: Database.Statement<[], GuestRetrieve> = database.prepare(`
        SELECT * FROM Guests 
        WHERE status IN ('Finished', 'Cancelled')
        ORDER BY 
          CASE status 
            WHEN 'Finished' THEN 1
            WHEN 'Cancelled' THEN 2
          END;
    `);
  const res = stmt.all();

  return res.map((guest) => ({
    id: guest.id,
    name: guest.name,
    room: guest.room,
    status: guest.status,
    nights: guest.nights,
    check_in: JSON.parse(guest.check_in) as DateObject, // Parse JSON back to Date
    check_out: JSON.parse(guest.check_out) as DateObject, // Parse JSON back to Date
    paymentType: guest.paymentType,
    notes: guest.notes,
  }));
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
    JSON.stringify(guest.check_in),
    JSON.stringify(guest.check_out),
    guest.paymentType,
    guest.notes
  );
}

function findGuests(filter: Partial<GuestFilter>): Guest[] {
  let sql = "SELECT * FROM Guests";
  const conditions: string[] = [];
  const values: (string | number)[] = [];

  if (filter.status) {
    conditions.push("status = ?");
    values.push(filter.status);
  }
  if (filter.name) {
    conditions.push("name = ?");
    values.push(filter.name);
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
    values.push(JSON.stringify(filter.check_in)); // CalendarDate to string
  }

  if (filter.check_out) {
    conditions.push("check_out <= ?");
    values.push(JSON.stringify(filter.check_out));
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  const stmt: Database.Statement<(string | number)[], Guest> =
    database.prepare(sql);
  
  return stmt.all(...values);
}

function removeGuest(id: number) {
  const sql = `DELETE FROM guests WHERE id = ?`;
  const result = database.prepare(sql).run(id);
  if (result.changes === 0) {
    return "no guests were found"; //return if no changes happened
  }
  return result.changes; // Returns number of deleted rows
}
function updateGuest(guest: Guest) {
  const updateGuest = database.prepare(`
    UPDATE guests 
    SET name = ?, room = ?, status = ?, nights = ?, 
        check_in = ?,check_out = ?,paymentType = ?, notes = ?
    WHERE id = ?
`);
  updateGuest.run(
    guest.name,
    guest.room,
    guest.status,
    guest.nights,
    JSON.stringify(guest.check_in),
    JSON.stringify(guest.check_out),
    guest.paymentType,
    guest.notes,
    guest.id
  );
}

function isDateTaken(check_in: DateObject, check_out: DateObject,room:string,id?:number): boolean {
  // Get all active guests from the database
  const activeGuests = getActiveGuests();
  const filteredGuests = activeGuests.filter(g => g.room === room && (id ? g.id !== id : true))

  // Convert the requested dates to Date objects for comparison
  const requestedCheckIn = dateObjectToDate(check_in);
  const requestedCheckOut = dateObjectToDate(check_out);
  
  // Check if the requested date range overlaps with any existing reservation
  for (const guest of filteredGuests) {
    const existingCheckIn = dateObjectToDate(guest.check_in as DateObject);
    const existingCheckOut = dateObjectToDate(guest.check_out as DateObject);
    
    // Check for overlap: two date ranges overlap if one starts before the other ends
    // and vice versa. We need to check if:
    // - The requested check-in is before the existing check-out, AND
    // - The requested check-out is after the existing check-in
    if (requestedCheckIn < existingCheckOut && requestedCheckOut > existingCheckIn) {
      return true; // Date range is taken (overlap found)
    }
  }
  
return false; // No overlap found, date range is available
}
export {
  getAllGuests,
  addGuest,
  findGuests,
  removeGuest,
  updateGuest,
  getFinishedGuests,
  getActiveGuests,
  isDateTaken
};
