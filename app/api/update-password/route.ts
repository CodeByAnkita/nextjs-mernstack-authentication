import { ConnectDB } from "@/lib/models/config/db.config";
import { UserModel } from "@/lib/models/User.models";
import { SendEmail } from "@/lib/services/MainService";
import {
  GenerateToken,
  GenerateTokenReset,
  verifyTokenReset,
} from "@/lib/services/Token.service";
import { NextRequest, NextResponse } from "next/server";

ConnectDB();
export const PUT = async (request: NextRequest) => {
  try {
    const { password, cpassword, token } = await request.json();

    if (password !== cpassword) {
      return NextResponse.json(
        { error: "password and cpassword not matched" },
        {
          status: 404,
        }
      );
    }

    const data = await verifyTokenReset(token);

    const existUser = await UserModel.findByIdAndUpdate(data);
    if (!existUser) {
      return NextResponse.json(
        { error: "User Not Found" },
        {
          status: 404,
        }
      );
    }

    const hasPassword = await existUser.UpdatePassword(password);
    await UserModel.findByIdAndUpdate(data, {
      $set: {
        password: hasPassword,
      },
    });
    await SendEmail(existUser.name, existUser.email, token);

    const response = NextResponse.json(
      { msg: "Password reset successfully" },
      {
        status: 200,
      }
    );
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
