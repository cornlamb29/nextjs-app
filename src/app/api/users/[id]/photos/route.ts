import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { JSONResponse, Params } from "../../../types";


/*
Looks in public images albums directory and user id has images show photos
 */
export function GET(
  _req: Request,
  { params }: Params
): NextResponse<JSONResponse> {
  const id = parseInt(params.id, 10);
  const status = 200;

  // https://milddev.com/list-files-in-a-directory-using-nodejs
  // listing files from a directory

  // https://stackoverflow.com/questions/34696334/node-js-get-relative-to-project-src-path-of-file
  // get relative path
  try {
    const directoryPath = path.relative(process.cwd(), `public/images/albums/${id}`);
    const data = fs.readdirSync(directoryPath);

    return NextResponse.json({
      status,
      data
    }, {
      status
    });
  } catch(e) {
    return NextResponse.json({
      status: 404,
      message: "No photos"
    }, {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
