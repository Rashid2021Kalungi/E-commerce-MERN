import React from "react";
import { Logo } from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white top-0 sticky">
      <div className="h-full flex items-center container mx-auto px-4 justify-between">
        <div className="">
          <Link to={'/'}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search products here ....."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[50px] bg-red-600 text-white h-8 flex items-center justify-center rounded-r-full">
            <GrSearch className="" />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            <FaRegCircleUser />
          </div>
          <div className="text-2xl cursor-pointer relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-500 text-white w-5 p-1 h-5 rounded-full absolute flex items-center justify-center -top-3 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>

          <Link to={'login'} className="px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

//here
