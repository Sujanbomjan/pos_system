"use client";
import { routes } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Input } from "rizzui";

const Home: React.FC = () => {
  const [name, setName] = useState("Super Admin");
  const [email, setEmail] = useState("admin@site.com");
  const [logo, setLogo] = useState<string | ArrayBuffer | null>(null);
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Profile updated: ${name}, ${email}`);
  };

  return (
    <>
      <div className="flex flex-row">
        <p className="mr-auto font-medium text-lg">Profile</p>
        <Link href={routes.forms.profileSettings}>
          <Button>Password Setting</Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full p-4">
          <div className="flex space-x-8">
            {/* Profile Section */}
            <div className="p-4  shadow rounded-lg w-[320px]">
              <div className="flex flex-row w-full gap-4">
                <div className="h-16 w-16 rounded-full bg-blue-500 items-center justify-center text-2xl flex flex-row">
                  {name.charAt(0)}
                </div>
                <h2 className="text-xl font-semibold mt-4">{name}</h2>
              </div>
              <div className="ml-4 mt-4">
                <div className="flex flex-row justify-between mb-4">
                  <strong>Name</strong>
                  <p className="text-gray-600">{name}</p>
                </div>
                <div className="flex flex-row justify-between mb-4">
                  <strong>Username</strong>
                  <p className="text-gray-600">admin</p>
                </div>
                <div className="flex flex-row justify-between">
                  <strong>Email</strong>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>
            </div>
            {/* Update Profile Section */}
            <div className="flex flex-row gap-8 p-4 shadow rounded-lg w-full">
              <div className="text-center">
                <div className="border border-gray-300 p-2 rounded-md h-[160px]">
                  {logo ? (
                    <Image
                      fill
                      src={logo as string}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    "Logo"
                  )}
                </div>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, setLogo)}
                  className="mt-2"
                />
              </div>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                  <Input
                    label="Name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-5"
                  />
                  <Input
                    label="Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
