
import { NextResponse } from "next/server";
import { getAllUsers } from "../../../data";
import { User } from "../../../data/types";
import { JSONResponse } from "../types";


export function GET(): NextResponse<JSONResponse> {
  const data: User[] = getAllUsers();
  const status = 200;

  return NextResponse.json({
    status,
    data
  }, {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
