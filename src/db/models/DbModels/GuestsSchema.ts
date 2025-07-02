enum PaymentType {
  AirBnB = "Airbnb",
  Booking = "Booking",
  Other = "Other",
}
enum Status {
  Active = "Active",
  Reserved = "Reserved",
  Finished = "Finished",
  Cancelled = "Cancelled",
}
interface Date {
  year: number;
  month: number;
  day: number;
}

interface Guest {
  id?: number;
  name: string;
  room: string;
  status: Status;
  nights: number;
  check_in: Date;
  check_out: Date;
  paymentType: PaymentType;
  notes: string;
}
interface GuestRetrieve {
  id?: number;
  name: string;
  room: string;
  status: Status;
  nights: number;
  check_in: string;
  check_out: string;
  paymentType: PaymentType;
  notes: string;
}


export { Guest, Status, PaymentType, Date,GuestRetrieve };
