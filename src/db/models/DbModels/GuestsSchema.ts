enum PaymentType {
  AirBnB = "Airbnb",
  Booking = "Booking",
  Other = "Other",
}
enum Status {
  Active = "Active",
  Pending= 'Pending',
  Reserved = "Reserved",
  Finished = "Finished",
  Cancelled = "Cancelled",
}
interface DateObject {
  year: number ;
  month: number ;
  day: number ;
}

interface Guest {
  id?: number;
  name: string;
  room: string;
  status: Status;
  nights: number;
  check_in: DateObject | undefined;
  check_out: DateObject | undefined;
  paymentType: PaymentType;
  notes: string;
}
interface GuestFilter {
  id?: number;
  name?: string;
  room?: string;
  status?: Status;
  nights?: number;
  check_in?: DateObject;
  check_out?: DateObject ;
  paymentType?: PaymentType;
  notes?: string;
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


export { Guest, Status, PaymentType, DateObject,GuestRetrieve,GuestFilter };
