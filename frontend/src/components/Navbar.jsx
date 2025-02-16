import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // If using Redux to get the user data
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();

  // Fetch user data from Redux store or any global state (this can be your authenticated user data)
  const { user } = useSelector((state) => state.auth); // Assume the user is fetched from your auth slice in Redux
  // Use useEffect to log the user data once on mount
  useEffect(() => {
    console.log("User data from Redux store:", user); // Log user data to inspect it
  }, [user]);

  return (
    <nav className="text-black p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo (left side) */}
        <div className="text-2xl font-bold">
          <span className="text-yellow-400">QUIZ</span> APP
        </div>

        {/* Navigation buttons (right side) */}
        <div className="space-x-4">
          {/* Show the Dashboard button only if the user is logged in and is an instructor */}
          {user && user.role === "instructor" && (
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </button>
          )}

          {/* Show the Logout button if the user is logged in */}
          {user ? (
            <Button
              variant="destructive"
              className="bg-red-400"
              onClick={() => {
                // Implement logout logic here (e.g., clearing the user session or token)
                console.log("User logged out");
                navigate("/login");
              }}
            >
              LogOut
            </Button>
          ) : (
            // If the user is not logged in, show Login and Signup buttons
            <>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
