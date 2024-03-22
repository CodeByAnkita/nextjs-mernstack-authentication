import { ConnectDB } from "@/lib/models/config/db.config";
import { UserModel } from "@/lib/models/User.models";
import { GenerateToken } from "@/lib/services/Token.service";
import { NextRequest, NextResponse } from "next/server";
ConnectDB();
export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    //if user exist
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return NextResponse.json(
        { error: "User Not Found" },
        {
          status: 400,
        }
      );
    }
    //password
    const isMatch = await existUser.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid Crendetials" },
        {
          status: 401,
        }
      );
    }
    //token
    //jwt
    const token = await GenerateToken(existUser._id);
    const response = NextResponse.json(
      { msg: "User login Successfully" },
      {
        status: 201,
      }
    );

    response.cookies.set("authentication", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
};
