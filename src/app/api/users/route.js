import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


// get request function
export async function GET(request) {
  let users = [];
  try {
    await connectDb();
    users = await User.find().select("-password");
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to get users",
      success: false,
    });
  }

  return NextResponse.json(users);
}

// post request function
// data post
//create user
export async function POST(request) {
  try {
    await connectDb();
    let payload = await request.json();
    let { name, email, password, about, profileURL } = payload;

    console.log({ name, email, password, about, profileURL });

    // Check if a user with the same email already exists
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User with this email already exists.",
          status: false,
        },
        {
          status: 400, // Bad Request
        }
      );
    }

    // Hash the password
    let pass = bcrypt.hashSync(password, process.env.BCRYPT_SALT);
    payload.password = pass;

    // Create new user
    let data = await User.create(payload);
    console.log('User created:', data);

    return NextResponse.json({ data }, {
      status: 201,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create user.",
        status: false,
      },
      {
        status: 500,
      }
    );
  }
}

// delete request  function
// uri variable
