import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      {pathname !== "/login" && (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 md:px-8">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="img/logo.png"
                className="h-11"
                alt="Lab Logo"
              />
              <span className="text-2xl font-bold text-[#0b2a97] tracking-wide">
                ComputeHub
              </span>
            </Link>

           
            <ul className="hidden md:flex space-x-8 font-medium">
              <li>
                <Link
                  to="/"
                  className={`pb-1 transition-all duration-300 border-b-2 ${
                    pathname === "/"
                      ? "border-[#0b2a97] text-[#0b2a97]"
                      : "border-transparent text-gray-700 hover:text-[#0b2a97]"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/labs"
                  className={`pb-1 transition-all duration-300 border-b-2 ${
                    ["/labs", "/add-lab", "/edit-lab"].includes(pathname)
                      ? "border-[#0b2a97] text-[#0b2a97]"
                      : "border-transparent text-gray-700 hover:text-[#0b2a97]"
                  }`}
                >
                  Labs
                </Link>
              </li>
              <li>
                <Link
                  to="/pcs"
                  className={`pb-1 transition-all duration-300 border-b-2 ${
                    ["/pcs", "/add-pc", "/edit-pc"].includes(pathname)
                      ? "border-[#0b2a97] text-[#0b2a97]"
                      : "border-transparent text-gray-700 hover:text-[#0b2a97]"
                  }`}
                >
                  PCs
                </Link>
              </li>
              <li>
                <Link
                  to="/students"
                  className={`pb-1 transition-all duration-300 border-b-2 ${
                    ["/students", "/add-student", "/edit-student"].includes(
                      pathname
                    )
                      ? "border-[#0b2a97] text-[#0b2a97]"
                      : "border-transparent text-gray-700 hover:text-[#0b2a97]"
                  }`}
                >
                  Students
                </Link>
              </li>
            </ul>

      
            <div className="hidden md:block">
              {user ? (
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-[#5c407a] to-[#af5a94] text-white font-medium rounded-full px-6 py-2.5 shadow-md hover:opacity-90 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-[#6A11CB] to-[#924972] text-white font-medium rounded-full px-6 py-2.5 shadow-md hover:opacity-90 transition-all duration-300"
                >
                  Login
                </Link>
              )}
            </div>

            
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 ml-2 text-[#0b2a97] rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-white text-[#0b2a97] shadow-inner border-t">
              {[
                { to: "/", label: "Home" },
                { to: "/labs", label: "Labs" },
                { to: "/pcs", label: "PCs" },
                { to: "/students", label: "Students" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block py-2 px-5 font-semibold rounded-md transition-all duration-300 ${
                    pathname === item.to
                      ? "bg-blue-100 text-[#0b2a97]"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-[#673478] to-[#822965] text-white font-medium rounded-full px-5 py-2.5 shadow-md hover:opacity-90 transition-all duration-300 mt-2"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-[#763380] to-[#6f2259] text-white font-medium rounded-full px-5 py-2.5 shadow-md hover:opacity-90 transition-all duration-300 mt-2"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Header;
