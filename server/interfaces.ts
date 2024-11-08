export interface User {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
}

export interface Birthday {
  id?: string;
  name?: string;
  date?: string; // YYYY-MM-DD
}
