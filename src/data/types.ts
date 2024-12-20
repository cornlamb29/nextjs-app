export enum Gender {
  Male = 'm',
  Female = 'f',
}

export interface User {
  user_id: number;
  name: string;
  user_name: string;
  image: string;
  location: string;
  dob: string;
  occupation: string;
  gender: Gender;
  description: string;
}

export interface Freindship {
  user_id: number;
  friend_id: number;
}

export interface Post {
  user_id: number;
  content: string;
  date: string;
}
