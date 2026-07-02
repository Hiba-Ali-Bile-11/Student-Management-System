import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  login,
  forgetPassword,
  changePassword,
} from "../services/user-service";

export default function Login() {
  const navigate = useNavigate();

  // LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // MODALS
  const [showForgetModal, setShowForgetModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);

  // CHANGE PASSWORD
  const [changeEmail, setChangeEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // FORGET PASSWORD
  const [forgetEmail, setForgetEmail] = useState("");
  const [forgetPasswordValue, setForgetPasswordValue] = useState("");

  // UI
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ERRORS
  const [errors, setErrors] = useState({});

  const isFourDigit = (val) => /^\d{4}$/.test(val);

  // ================= LOGIN VALIDATION =================
  const validateLogin = () => {
    let temp = {};

    if (!email) {
      temp.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      temp.email = "Invalid email format";
    }

    if (!password) {
      temp.password = "Password is required";
    } else if (!isFourDigit(password)) {
      temp.password = "Password must be exactly 4 digits";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ================= FORGET VALIDATION =================
  const validateForget = () => {
    let temp = {};

    if (!forgetEmail) {
      temp.forgetEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(forgetEmail)) {
      temp.forgetEmail = "Invalid email format";
    }

    if (!forgetPasswordValue) {
      temp.forgetPasswordValue = "Password is required";
    } else if (!isFourDigit(forgetPasswordValue)) {
      temp.forgetPasswordValue = "Password must be exactly 4 digits";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ================= CHANGE VALIDATION =================
  const validateChange = () => {
    let temp = {};

    if (!changeEmail) {
      temp.changeEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(changeEmail)) {
      temp.changeEmail = "Invalid email format";
    }

    if (!oldPassword) {
      temp.oldPassword = "Old password is required";
    } else if (!isFourDigit(oldPassword)) {
      temp.oldPassword = "Must be exactly 4 digits";
    }

    if (!newPassword) {
      temp.newPassword = "New password is required";
    } else if (!isFourDigit(newPassword)) {
      temp.newPassword = "Must be exactly 4 digits";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    try {
      setLoading(true);

      const res = await login(email, password);

      if (res.status) {
        localStorage.setItem("user", JSON.stringify(res.data));

        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: res.message,
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        Swal.fire("Error", res.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= FORGET PASSWORD =================
  const handleForgetPassword = async (e) => {
    e.preventDefault();

    if (!validateForget()) return;

    try {
      setLoading(true);

      const res = await forgetPassword(forgetEmail, forgetPasswordValue);

      if (res.status) {
        Swal.fire("Success", res.message, "success");
        setShowForgetModal(false);

        setForgetEmail("");
        setForgetPasswordValue("");
      } else {
        Swal.fire("Error", res.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= CHANGE PASSWORD =================
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!validateChange()) return;

    try {
      setLoading(true);

      const res = await changePassword(
        changeEmail,
        oldPassword,
        newPassword
      );

      if (res.status) {
        Swal.fire("Success", res.message, "success");
        setShowChangeModal(false);

        setChangeEmail("");
        setOldPassword("");
        setNewPassword("");
      } else {
        Swal.fire("Error", res.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      {/* LOGIN FORM */}
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* EMAIL */}
        <div className="mb-3">
          <label>Email</label>
          <div className="flex items-center border p-2 rounded">
            <Mail size={18} />
            <input
              className="w-full ml-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-3">
          <label>Password</label>
          <div className="flex items-center border p-2 rounded">
            <Lock size={18} />

            <input
              className="w-full ml-2 outline-none"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="4 digit password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* LOGIN BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* LINKS */}
        <div className="flex justify-between mt-4 text-sm">
          <button
            type="button"
            onClick={() => setShowForgetModal(true)}
            className="text-blue-500"
          >
            Forget Password
          </button>

          <button
            type="button"
            onClick={() => setShowChangeModal(true)}
            className="text-green-600"
          >
            Change Password
          </button>
        </div>
      </form>

      {/* FORGET MODAL */}
      {showForgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <form
            onSubmit={handleForgetPassword}
            className="bg-white p-5 rounded w-96"
          >
            <h2 className="font-bold mb-3">Forget Password</h2>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Email"
              value={forgetEmail}
              onChange={(e) => setForgetEmail(e.target.value)}
            />
            {errors.forgetEmail && (
              <p className="text-red-500 text-sm">{errors.forgetEmail}</p>
            )}

            <input
              className="border p-2 w-full mb-3"
              placeholder="New Password"
              value={forgetPasswordValue}
              onChange={(e) => setForgetPasswordValue(e.target.value)}
            />
            {errors.forgetPasswordValue && (
              <p className="text-red-500 text-sm">
                {errors.forgetPasswordValue}
              </p>
            )}

            <button className="bg-blue-600 text-white px-4 py-1 rounded">
              Submit
            </button>

            <button
              type="button"
              onClick={() => setShowForgetModal(false)}
              className="ml-2"
            >
              Close
            </button>
          </form>
        </div>
      )}

      {/* CHANGE MODAL */}
      {showChangeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <form
            onSubmit={handleChangePassword}
            className="bg-white p-5 rounded w-96"
          >
            <h2 className="font-bold mb-3">Change Password</h2>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Email"
              value={changeEmail}
              onChange={(e) => setChangeEmail(e.target.value)}
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
              className="border p-2 w-full mb-3"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button className="bg-green-600 text-white px-4 py-1 rounded">
              Update
            </button>

            <button
              type="button"
              onClick={() => setShowChangeModal(false)}
              className="ml-2"
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}