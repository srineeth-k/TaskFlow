import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between items-center bg-violet-800 dark:bg-gray-800 text-white py-3 shadow-md">
      <div className="logo">
        <span className="font-extrabold text-xl mx-8 tracking-wide">
          TaskFlow
        </span>
      </div>

      <ul className="flex gap-10 mx-8 text-sm">
        <li className="cursor-pointer hover:text-violet-300 transition">
          Home
        </li>
        <li className="cursor-pointer hover:text-violet-300 transition">
          Your Tasks
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
