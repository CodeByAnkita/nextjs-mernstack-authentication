import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const response = NextResponse.json(
      { msg: "Logout Success" },
      {
        status: 200,
      }
    );
    response.cookies.delete("authentication");
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
};
