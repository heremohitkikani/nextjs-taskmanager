import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { connectDb } from "@/helper/db";

export async function GET(request) {
  try {
    // Connect to the database
    await connectDb();

    // Extract JWT token from request cookies
    const authToken = request.cookies.get("authToken")?.value;

    // If token doesn't exist, return an error response
    if (!authToken) {
      return NextResponse.error(new Error("JWT token is missing"));
    }

    // Verify JWT token
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);

    // Retrieve user data based on the _id from the decoded token
    const user = await User.findById(decodedToken._id).select("-password");

    // If user doesn't exist, return an error response
    if (!user) {
      return NextResponse.error(new Error("User not found"));
    }

    // Return user data as JSON response
    return NextResponse.json(user);
  } catch (error) {
    // Handle errors
    console.error("Error occurred:", error);
    return NextResponse.error(new Error("Internal server error"));
  }
}
