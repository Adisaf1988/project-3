export interface User {
  users_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "user";
}

export interface Token {
  access_token: string;
}

export type Maybe<T> = T | null | undefined;

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface FollowData {
  destination: string;
  follows: number;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface Vacation {
  id: number;
  vacation_photo: string;
  destination: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
}
