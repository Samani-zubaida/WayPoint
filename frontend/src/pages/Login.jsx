import { useContext, useState } from "react";
import { AuthContext } from "../Context/authContext";
import Navbar from "../component/Navbar/Navbar";

export default function LoginPage() {

  const [fullName, setFullName] = useState("");
  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiState = currState === "Login" ? "login" : "signup";

    let payload;

    if (currState === "signup") {
      payload = {
        name: fullName,
        email: email,
        password: password
      };
    } else {
      payload = {
        email: email,
        password: password
      };
    }

    login(apiState, payload);
  };

  return (

   
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 p-6">
     <Navbar />
      {/* CARD */}
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-white/90 backdrop-blur-lg flex flex-col md:flex-row">

        {/* LEFT SIDE IMAGE */}
        <div
          className="hidden md:flex md:w-1/2 relative bg-cover bg-center"
          style={{ backgroundImage: "url('/login_img.png')" }}
        >

          {/* overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 text-white p-10 flex flex-col justify-between h-full">

            <h2 className="text-4xl font-bold leading-snug">
              Explore The World
              <br />
              With Snap2Map
            </h2>

            <p className="text-sm opacity-90">
              Discover hidden places, connect with travelers,
              and map your journey across the globe.
            </p>

            <div className="flex gap-6 text-xl">
              <i className="fa-brands fa-facebook hover:scale-125 transition"></i>
              <i className="fa-brands fa-instagram hover:scale-125 transition"></i>
              <i className="fa-brands fa-twitter hover:scale-125 transition"></i>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">

          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {currState === "Login" ? "Welcome Back" : "Create Account"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            {currState === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />

            {currState === "Login" && (
              <p className="text-right text-sm text-gray-500 hover:text-blue-600 cursor-pointer">
                Forgot password?
              </p>
            )}

            {/* BUTTON */}
            <button
              className="w-full py-3 rounded-lg font-semibold text-white
              bg-gradient-to-r from-blue-500 to-indigo-600
              hover:scale-[1.02] hover:shadow-lg transition-all"
            >
              {currState === "Login" ? "Login" : "Create Account"}
            </button>

          </form>

          {/* SWITCH */}
          <p className="text-center mt-6 text-gray-600 text-sm">
            {currState === "Login" ? (
              <>
                Don’t have an account?{" "}
                <span
                  className="text-blue-600 font-semibold cursor-pointer"
                  onClick={() => setCurrState("signup")}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-600 font-semibold cursor-pointer"
                  onClick={() => setCurrState("Login")}
                >
                  Login
                </span>
              </>
            )}
          </p>

        </div>

      </div>
    </div>
  );
}