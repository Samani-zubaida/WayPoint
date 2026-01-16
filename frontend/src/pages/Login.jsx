import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/authContext";


export default function LoginPage() {
  const [fullName, setFullName] = useState("");
  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const handleSubmit = (event) => {
          event.preventDefault();

    // The backend endpoint state is now correctly determined by currState.
    const apiState = currState === "Login" ? "login" : "signup";

    // Prepare payload based on the current state.
    let payload;
    if (currState === "signup") {
      payload = {
        name: fullName,
        email: email,
        password: password, // The variable name has been changed to lowercase 'p'.
      };
    } else {
      payload = {
        email: email,
        password: password
      };
    }

    // Call the login function with the correct state and payload.
    login(apiState, payload);
  }

  
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">

      {/* Background diagonal */}
      <div className="absolute inset-0 diagonal-bg"></div>

      {/* MAIN CARD */}
      <div
        className="
          relative z-10 w-full max-w-[900px]
          bg-white/10 backdrop-blur-md rounded-xl
          overflow-hidden shadow-xl flex flex-col md:flex-row
          md:h-[500px]
        "
      >

        {/* LEFT SIDE IMAGE */}
        <div
          className="hidden md:flex w-1/2 bg-cover bg-center p-8 text-gray-800 flex-col justify-between"
          style={{ backgroundImage: "url('/login_img.png')" }}
        >
          <h2 className="text-2xl font-bold text-center mt-10 text-gray-950">
            THE WORLD REMAINS OPEN, EVEN WHEN LIFE FEELS CLOSED.
          </h2>

          <div className="flex justify-center gap-4 mb-6">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>

        {/* RIGHT SIDE AUTH FORM */}
        <div
          className="
            w-full md:w-1/2 bg-gray-50
            p-6 sm:p-10 flex flex-col justify-center
          "
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {currState === "Login" ? "LOGIN" : "SIGN UP"}
          </h1>

          {/* NAME FIELD (Signup only) */}
          {currState === "signup" && (
            <input
              className="w-full p-3 rounded-md border border-gray-800 text-black mb-4"
              placeholder="Name"
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
            />
          )}

          {/* EMAIL */}
          <input
            className="w-full p-3 rounded-md border border-gray-800 text-black mb-4"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            className="w-full p-3 rounded-md border border-gray-800 text-black mb-4"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* FORGOT PASSWORD (login only) */}
          {currState === "Login" && (
            <p className="text-right text-sm mb-4 cursor-pointer">
              Forgot Password?
            </p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="
              relative overflow-hidden px-5 py-2 rounded-lg
              text-white font-semibold bg-gradient-to-r
              from-gray-800 to-blue-900 group shadow-md
              hover:shadow-xl hover:scale-105 transition transform
            "
          >
            <span
              className="
                absolute inset-0 bg-white opacity-10 transform
                -translate-x-full group-hover:translate-x-full
                transition-all duration-500 pointer-events-none
              "
            ></span>
            {currState === "Login" ? "Login" : "Create Account"}
          </button>

          {/* SWITCH LOGIN ↔ SIGNUP */}
          <p className="text-center mt-4 text-gray-700 text-sm">
            {currState === "Login" ? (
              <>
                Don't have an account?{" "}
                <span
                  className="text-blue-900 font-semibold cursor-pointer"
                  onClick={() => setCurrState("signup")}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-900 font-semibold cursor-pointer"
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
