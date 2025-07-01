import {
  CalendarDate,
} from "@internationalized/date";

enum PaymentType{
  AirBnB = 'airbnb',
  Booking = 'booking',
  Other = 'other'
}
 enum Status {
  Active = "active",
  Reserved = "reserved",
  Finished = "finished",
  Cancelled = "cancelled"
}

interface Guest {
  id?: number,
  name: string,
  room: string,
  status: Status,
  nights:number,
  check_in:CalendarDate,
  check_out:CalendarDate,
  paymentType: PaymentType,
  notes:string
}

export { Guest,Status,PaymentType };
