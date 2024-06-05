import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { connectDb } from "@/helper/db";
export async function GET(request) {
  await connectDb();
  const authToken = request.cookies.get("authToken")?.value;
  console.log(authToken);
  const data = jwt.verify(authToken, process.env.JWT_KEY);
  console.log(data);
  const user = await User.findById(data._id).select("-password");
  //   console.log("test");
  return NextResponse.json(user);
}
