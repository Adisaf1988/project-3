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

export interface LoginData {
  email: string;
  password: string;
}
