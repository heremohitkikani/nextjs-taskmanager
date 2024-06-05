"use client";

import React, { useState } from "react";
import signUpBanner from "../../assets/singup.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { signUp } from "@/services/userService";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1K1evWjMTfR3IMBxQxXSGV2pTaO2rAP7EzIMB4u0YwxfFL4pJ269eff6sNvuxtjI7c4s",
  });

  const doSignup = async (event) => {
    event.preventDefault();

    if (data.name.trim() === "" || data.name == null) {
      toast.warning("Name is required !!", {
        position: "top-center",
      });
      return;
    }

    // TODO: Validate the rest of the fields

    try {
      const result = await signUp(data);

      toast.success("User is registered !!", {
        position: "top-center",
      });
      setData({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1K1evWjMTfR3IMBxQxXSGV2pTaO2rAP7EzIMB4u0YwxfFL4pJ269eff6sNvuxtjI7c4s",
      });
    } catch (error) {
      toast.error("Signup Error !!", {
        position: "top-center",
      });
    }
  };

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
      profileURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1K1evWjMTfR3IMBxQxXSGV2pTaO2rAP7EzIMB4u0YwxfFL4pJ269eff6sNvuxtjI7c4s",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex justify-center mb-5">
          <Image src={signUpBanner} alt="Signup banner" className="w-32 sm:w-40" />
        </div>
        <h1 className="text-3xl text-center mb-5 text-white">Signup Here</h1>
        <form action="#!" onSubmit={doSignup}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="user_name" className="block text-sm font-medium mb-2 text-white">
              Username
            </label>
            <input
              type="text"
              id="user_name"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              onChange={(event) => setData({ ...data, name: event.target.value })}
              value={data.name}
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="user_email" className="block text-sm font-medium mb-2 text-white">
              Email
            </label>
            <input
              type="email"
              id="user_email"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(event) => setData({ ...data, email: event.target.value })}
              value={data.email}
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label htmlFor="user_password" className="block text-sm font-medium mb-2 text-white">
              Password
            </label>
            <input
              type="password"
              id="user_password"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(event) => setData({ ...data, password: event.target.value })}
              value={data.password}
            />
          </div>
          {/* About */}
          <div className="mb-4">
            <label htmlFor="user_about" className="block text-sm font-medium mb-2 text-white">
              About
            </label>
            <textarea
              id="user_about"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Tell us about yourself"
              rows={4}
              onChange={(event) => setData({ ...data, about: event.target.value })}
              value={data.about}
            ></textarea>
          </div>
          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Signup
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
