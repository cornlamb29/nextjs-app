import { NextResponse } from 'next/server';
import { getPosts } from "../../../../../data";
import type { Post } from "../../../../../data/types";
import { JSONResponse, Params } from "../../../types";


export function GET(
  _req: Request,
  { params }: Params
): NextResponse<JSONResponse> {
  const id = parseInt(params.id, 10);
  const data: Post[] | [] = getPosts(id) || [];
  let status = 404;
  const json: JSONResponse = { status };

  if (data) {
    status = 200;
    json.data = data;
  } else {
    json.message = "No posts found.";
  }

  return NextResponse.json({...json, status}, {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
