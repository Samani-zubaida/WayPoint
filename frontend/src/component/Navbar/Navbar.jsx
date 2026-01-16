import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  return (
    <nav className="w-full bg-[#140d1e]">
      {/* TOP BAR */}
      <div className="h-20 flex items-center justify-between  max-w-8xl mx-auto">
        
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3" style={{marginLeft:"40px"}}>
          <img
            src="/icon.jpg"
            alt="icon"
            className="h-10 w-15 rounded-3xl object-cover"
          />
          <span className="text-white font-bold text-3xl">
            WayPoint
          </span>
        </div>

        {/* RIGHT: DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8" style={{marginRight: "40px"}}>
          <span className="text-white font-semibold whitespace-nowrap hover:text-gray-400" onClick={() => navigate("chatAI")}>
            chat with AI
          </span>
          <span className="text-white font-semibold hover:text-gray-400" onClick={() => navigate("/login")}>
            Signup
          </span>
          <button className="h-10 w-[120px] bg-amber-500 text-gray-900 rounded-lg font-semibold hover:opacity-80">
            Login
          </button>
        </div>

        {/* RIGHT: MOBILE MENU ICON */}
        <button
          className="md:hidden text-white text-3xl " style={{paddingRight: "20px"}}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 bg-[#25173b]">
          <span className="text-white font-semibold">
            Join as guest
          </span>
          <span className="text-white font-semibold">
            Signup
          </span>
          <button className="h-10 w-full bg-amber-500 text-gray-900 rounded-lg font-semibold hover:opacity-80">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
