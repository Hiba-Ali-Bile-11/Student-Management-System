import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
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

                setTimeout(() => navigate("/dashbord"), 1500);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E3A8A] via-[#06B6D4] to-[#1E3A8A] dark:from-gray-900 dark:via-gray-800 dark:to-black px-4">


            <motion.div

                initial={{ opacity: 0, y: 50 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: .6 }}

                className="
      bg-white/90
      backdrop-blur-xl
      w-full
      max-w-md
      rounded-3xl
      shadow-2xl
      p-8
      "

            >


                {/* HEADER */}

                <div className="text-center mb-8">


                    <div className="
        mx-auto
        mb-4
        w-20
        h-20
        rounded-full
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-[#1E3A8A]
        to-[#06B6D4]
        text-white
        shadow-lg
        ">

                        <Lock size={35} />

                    </div>



                    <h1 className="
        text-4xl
        font-extrabold
        bg-gradient-to-r
        from-[#1E3A8A]
        to-[#06B6D4]
        bg-clip-text
        text-transparent
        ">

                        Welcome Back

                    </h1>


                    <p className="text-gray-500 mt-2">
                        Student Management System
                    </p>


                </div>





                {/* LOGIN FORM */}

                <form onSubmit={handleLogin}>


                    {/* EMAIL */}

                    <div className="mb-5 relative">


                        <Mail

                            className="
          absolute
          left-4
          top-3.5
          text-[#06B6D4]
          "

                            size={22}

                        />


                        <input

                            type="email"

                            placeholder="Enter your email"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                            className="
          w-full
          rounded-2xl
          border
          border-gray-200
          py-3
          pl-12
          pr-4
          outline-none
          focus:ring-4
          focus:ring-cyan-100
          focus:border-[#06B6D4]
          "

                        />


                        {
                            errors.email &&
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        }


                    </div>






                    {/* PASSWORD */}


                    <div className="mb-5">


                        <div className="
          flex
          items-center
          border
          border-gray-200
          rounded-2xl
          px-4
          ">


                            <Lock
                                size={20}
                                className="text-[#1E3A8A]"
                            />


                            <input


                                type={
                                    showPassword
                                        ? "text"
                                        :
                                        "password"
                                }


                                placeholder="Enter password"


                                value={password}


                                onChange={(e) => setPassword(e.target.value)}


                                className="
            w-full
            p-3
            ml-2
            outline-none
            "


                            />



                            <button

                                type="button"

                                onClick={() => setShowPassword(!showPassword)}

                                className="text-gray-500"

                            >

                                {
                                    showPassword
                                        ?
                                        <EyeOff />
                                        :
                                        <Eye />
                                }

                            </button>


                        </div>



                        {
                            errors.password &&
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        }



                    </div>





                    {/* LOGIN BUTTON */}


                    <button

                        disabled={loading}

                        className="
        w-full
        py-3
        rounded-2xl
        bg-gradient-to-r
        from-[#1E3A8A]
        to-[#06B6D4]
        text-white
        font-bold
        text-lg
        shadow-lg
        hover:scale-[1.02]
        transition
        "

                    >

                        {
                            loading
                                ?
                                "Loading..."
                                :
                                "Login"
                        }


                    </button>





                    {/* LINKS */}


                    <div className="
        flex
        justify-between
        mt-6
        text-sm
        ">


                        <button

                            type="button"

                            onClick={() => setShowForgetModal(true)}

                            className="
          text-[#1E3A8A]
          font-medium
          hover:underline
          "

                        >

                            Forgot Password?

                        </button>





                        <button

                            type="button"

                            onClick={() => setShowChangeModal(true)}

                            className="
          text-green-600
          font-medium
          hover:underline
          "

                        >

                            Change Password

                        </button>


                    </div>



                </form>



            </motion.div>





            {/* FORGET PASSWORD MODAL */}


            {
                showForgetModal &&

                <div className="
    fixed
    inset-0
    bg-black/50
    flex
    items-center
    justify-center
    z-50
    ">


                    <form

                        onSubmit={handleForgetPassword}

                        className="
      bg-white
      w-96
      rounded-3xl
      p-6
      shadow-2xl
      "

                    >


                        <h2 className="text-2xl font-bold mb-5">

                            Forgot Password

                        </h2>



                        <input

                            className="
        w-full
        border
        rounded-xl
        p-3
        mb-3
        "

                            placeholder="Email"

                            value={forgetEmail}

                            onChange={(e) => setForgetEmail(e.target.value)}

                        />



                        <input

                            className="
        w-full
        border
        rounded-xl
        p-3
        mb-4
        "

                            placeholder="New Password"

                            value={forgetPasswordValue}

                            onChange={(e) => setForgetPasswordValue(e.target.value)}

                        />



                        <button

                            className="
        bg-[#1E3A8A]
        text-white
        px-5
        py-2
        rounded-xl
        "

                        >

                            Submit

                        </button>



                        <button

                            type="button"

                            onClick={() => setShowForgetModal(false)}

                            className="ml-3"

                        >

                            Close

                        </button>



                    </form>


                </div>

            }





            {/* CHANGE PASSWORD MODAL */}


            {
                showChangeModal &&

                <div className="
    fixed
    inset-0
    bg-black/50
    flex
    items-center
    justify-center
    z-50
    ">


                    <form

                        onSubmit={handleChangePassword}

                        className="
      bg-white
      w-96
      rounded-3xl
      p-6
      shadow-2xl
      "

                    >


                        <h2 className="text-2xl font-bold mb-5">

                            Change Password

                        </h2>



                        <input

                            className="w-full border rounded-xl p-3 mb-3"

                            placeholder="Email"

                            value={changeEmail}

                            onChange={(e) => setChangeEmail(e.target.value)}

                        />



                        <input

                            className="w-full border rounded-xl p-3 mb-3"

                            placeholder="Old Password"

                            value={oldPassword}

                            onChange={(e) => setOldPassword(e.target.value)}

                        />



                        <input

                            className="w-full border rounded-xl p-3 mb-4"

                            placeholder="New Password"

                            value={newPassword}

                            onChange={(e) => setNewPassword(e.target.value)}

                        />



                        <button

                            className="
        bg-green-600
        text-white
        px-5
        py-2
        rounded-xl
        "

                        >

                            Update

                        </button>



                        <button

                            type="button"

                            onClick={() => setShowChangeModal(false)}

                            className="ml-3"

                        >

                            Close

                        </button>


                    </form>


                </div>

            }



        </div>
    )
}