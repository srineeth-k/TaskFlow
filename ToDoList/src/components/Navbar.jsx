import React from "react";

function Navbar(){
    return (
        <div className="flex justify-between bg-slate-700 text-white py-3">
            <div className="logo">
                <span className="font-bold text-xl mx-8">iTask</span>
            </div>
            <ul className="flex gap-10">
                <li className="cursor-pointer hover:font-bold">Home</li>
                <li className="cursor-pointer hover:font-bold">Your Tasks</li>
                <li></li>
            </ul>
        </div>
    )

}
export default Navbar;