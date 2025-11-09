import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const { user, handleLogin, handleForgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await handleLogin(input.email, input.password);
      if (res) navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credentials");
      }
    }
  };

  const handleForgotClick = async (e) => {
    e.preventDefault();
    await handleForgotPassword(input.email);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-blue-50">
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-md text-center"
        >
          <h2 className="text-2xl font-semibold text-[#1b1e7b] mb-6">
            Login Into System
          </h2>

          <div className="text-left mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700" >
              Email
            </label>
            <input type="email"  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#1b1e7b] focus:border-[#1b1e7b] block w-full p-2.5"
              placeholder="admin@gmail.com" required value={input.email} onChange={(e) =>
                setInput({ ...input, [e.target.id]: e.target.value }) }
            />
          </div>

          <div className="text-left mb-5">
            <label  htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700" >
              Password
            </label>
            <input type="password" id="password"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#1b1e7b] focus:border-[#1b1e7b] block w-full p-2.5"
              placeholder="••••••••"  required value={input.password} onChange={(e) =>
                setInput({ ...input, [e.target.id]: e.target.value }) }
            />
          </div>

          <div className="text-right mb-5 text-sm">
            <button  onClick={handleForgotClick} className="text-[#1117cb] hover:underline"
              type="button" >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-[#15056b] to-[#2108d8] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-purple-300 font-semibold rounded-lg text-sm px-5 py-2.5 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
