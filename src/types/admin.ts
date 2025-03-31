
export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  date: string;
  status: string;
}

export interface Appointment {
  id: number;
  title: string;
  client: string;
  property: string;
  date: string;
  time: string;
}
