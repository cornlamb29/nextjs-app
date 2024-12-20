import { NextResponse } from 'next/server';
import { getUser } from "../../../../data";
import type { User } from "../../../../data/types";
import { JSONResponse, Params } from "../../types";


/*
 Get a single user by id
 */
export function GET(
  _req: Request,
  { params }: Params
): NextResponse<JSONResponse> {
  const id = parseInt(params.id, 10);
  const data: User | undefined = getUser(id);
  let status = 404;
  const json: JSONResponse = { status }

  if (data) {
    status = 200;
    json.data = data;
  } else {
    json.message = "User is not found."
  }

  return NextResponse.json({...json, status}, {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
