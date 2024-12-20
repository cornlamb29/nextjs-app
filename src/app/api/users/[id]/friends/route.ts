import { NextResponse } from 'next/server';
import { getFriends } from "../../../../../data";
import type { User } from "../../../../../data/types";
import { JSONResponse, Params } from "../../../types";


export function GET(
  _req: Request,
  { params }: Params
): NextResponse<JSONResponse> {
  const id = parseInt(params.id, 10);
  const data: User[] | [] = getFriends(id) || [];
  let status = 404;
  const json: JSONResponse = { status }

  if (data) {
    status = 200;
    json.data = data;
  } else {
    json.message = "No photos found."
  }

  return NextResponse.json({...json, status}, {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
