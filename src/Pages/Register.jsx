import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/user-service";

import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { User, Mail, Lock } from "lucide-react";
import Navbar from "../components/Navbar";


export default function Register(){

    const navigate = useNavigate();


    const [form, setForm] = useState({
        username:"",
        email:"",
        password:"",
        role:"USER"
    });



    const handleChange = (e)=>{

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };



    const handleSubmit = async(e)=>{

        e.preventDefault();


        try{

            await registerUser(form);


            Swal.fire({
                icon:"success",
                title:"Registration Successful",
                text:"You can login now"
            });


            navigate("/login");


        }catch(error){

            Swal.fire({
                icon:"error",
                title:"Registration Failed",
                text:error.response?.data?.message || "Something went wrong"
            });

        }

    };



    return(
        <>
        
        <Navbar/>
        

<div className="
min-h-screen flex items-center justify-center
bg-gradient-to-br from-[#1E3A8A] via-[#06B6D4] to-[#1E3A8A]
px-4
">


<motion.div

initial={{opacity:0,y:50}}
animate={{opacity:1,y:0}}
transition={{duration:.6}}

className="
bg-white w-[420px]
rounded-3xl
shadow-2xl
p-8
"


>


<h1 className="
text-3xl font-bold text-center
text-[#1E3A8A]
mb-6
">

Create Account

</h1>



<form onSubmit={handleSubmit}>



<div className="mb-4">

<label className="font-semibold">
Username
</label>


<div className="flex items-center border rounded-xl px-3">

<User size={20}/>

<input

type="text"
name="username"
value={form.username}
onChange={handleChange}

className="
w-full p-3 outline-none
"

placeholder="Enter username"

/>

</div>

</div>




<div className="mb-4">

<label className="font-semibold">
Email
</label>


<div className="flex items-center border rounded-xl px-3">

<Mail size={20}/>


<input

type="email"
name="email"
value={form.email}
onChange={handleChange}

className="
w-full p-3 outline-none
"

placeholder="Enter email"

/>


</div>

</div>




<div className="mb-6">

<label className="font-semibold">
Password
</label>


<div className="flex items-center border rounded-xl px-3">

<Lock size={20}/>


<input

type="password"
name="password"
value={form.password}
onChange={handleChange}

className="
w-full p-3 outline-none
"

placeholder="Enter password"

/>


</div>


</div>




<button

type="submit"

className="
w-full
bg-[#1E3A8A]
text-white
py-3
rounded-xl
font-bold
hover:bg-[#06B6D4]
transition
"

>

Register

</button>



</form>



<p className="
text-center mt-5
">

Already have account?

<span

onClick={()=>navigate("/login")}

className="
text-blue-600
cursor-pointer
ml-2
font-semibold
"

>

Login

</span>


</p>


</motion.div>


</div>
</>

    );

}