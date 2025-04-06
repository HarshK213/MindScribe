import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
    return(
        <div 
            className="h-12
                        bg-gray-900 
                        flex 
                        pl-9 
                        items-center 
                        gap-5"
        >
            <NavLink
            to='/'
            className={({isActive}) => isActive?'border-b-2 border-purple-800 px-2':''}
            >
                Home
            </NavLink>

            <NavLink
            to='/notes'
            className={({isActive}) => isActive?'border-b-2 border-purple-800 px-2':''}
            >
                Notes
            </NavLink>
        </div>
    )
}

export default Navbar