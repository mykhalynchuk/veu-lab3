export interface User {
  id: number;
  gender: 'male' | 'female';
  name: { title: string; first: string; last: string };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: number;
    timezone: { offset: string; description: string };
  };
  email: string;
  dob: { date: string; age: number };
  phone: string;
  cell: string;
  picture: string;
  hobbies: string[];
  details: string;
}
