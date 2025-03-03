import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  return (
    <div>
      <ToastContainer />
      <header className="bg-zinc-900 text-white ">
        <nav className="w-full py-4 md:w-[80%] mx-auto flex item-center gap-x-4 justify-between">
          <Link href={"/"}>Authentication</Link>
          <ul className="flex item-center gap-x-4">
            <li>
              <Link href={"/"}> Home</Link>
            </li>
            <li>
              {" "}
              <Link href={"/login"}> Login</Link>
            </li>

            <li>
              {" "}
              <Link href={"/register"}>Register</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
