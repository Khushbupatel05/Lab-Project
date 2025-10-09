import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    email: "", password: ""
  });

  const {user, handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await handleLogin(input.email, input.password);
      if (res) {
        navigate("/")
      }
    } catch (error) {
      if (error.code == "auth/invalid-credential") {
        toast.error("Invalid credential")
      }
    }

  }
  return (
    <>
      <div className=" flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">LMS Login</h2>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your email</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="admin@gmail.com" required value={input.email} onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })} />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Your password</label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="••••••••" required value={input.password} onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })} />
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
            </div>
            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-600">Remember me</label>
          </div>

          <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Submit</button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login
