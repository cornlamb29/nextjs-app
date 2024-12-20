import { User, Freindship, Post } from "../../data/types";

export type JSONResponse = {
  status: number;
  message?: string;
  data?: User | User[] | Freindship | Freindship[] | Post | Post[] | string[];
}

export type Params = {
  params: { id: string }
}
