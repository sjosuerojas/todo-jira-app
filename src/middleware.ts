import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PATH_API = "/api/task/";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith(PATH_API)) {
    const id = req.nextUrl.pathname.replace(PATH_API, "");
    const checkTaskId = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkTaskId.test(id)) {
      return new NextResponse(JSON.stringify({ message: "Invalid ID task" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: `/api/task/:path`,
};
