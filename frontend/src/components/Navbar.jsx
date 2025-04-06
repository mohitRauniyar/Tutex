import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome } from "react-icons/fi";
import { MdOutlineSearch } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";
import { VscGraphLine } from "react-icons/vsc";

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 bg-[#ffffff] border-t-[1px] border-t-[#555555] h-16 w-full flex justify-between px-12 items-center text-2xl z-50">
        <Link to="/">
            <FiHome/>
        </Link>
        <Link to="/analytics">
            <VscGraphLine />
        </Link>
        <Link to="/search">
            <MdOutlineSearch />
        </Link>
        <Link to="/profile">
            <CgProfile/>
        </Link>
    </div>
  )
}
