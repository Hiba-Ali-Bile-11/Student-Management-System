import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
} from "../services/user-service";


export default function UserPage() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [saving, setSaving] = useState(false);


  const [editId, setEditId] = useState(null);

  const [isEdit, setIsEdit] = useState(false);


  // FORM STATES

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");



  const [currentPage,setCurrentPage]=useState(1);

  const [rowsPerPage,setRowsPerPage]=useState(10);



  // ================= LOAD USERS =================

  const loadUsers = async()=>{

    try{

      setLoading(true);

      const res = await getAllUsers();

      setUsers(res?.data || res || []);

    }
    catch(err){

      Swal.fire(
        "Error",
        err.message,
        "error"
      );

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    loadUsers();

  },[]);



  // ================= SEARCH =================


  const filteredUsers = users;



  const handleSearch = async(value)=>{

    setSearch(value);


    try{


      if(value.trim()===""){

        loadUsers();

        return;

      }


      const res = await searchUser(value);


      setUsers(res?.data || []);


    }
    catch(err){

      Swal.fire(
        "Error",
        err.message,
        "error"
      );

    }

  };





  // ================= OPEN CREATE =================


  const openCreate=()=>{


    setName("");

    setEmail("");

    setPassword("");

    setRole("");

    setEditId(null);

    setIsEdit(false);

    setShowModal(true);


  };




  // ================= OPEN EDIT =================


  const openEdit=(u)=>{


    setName(u.name ?? u.Name);

    setEmail(u.email ?? u.Email);

    setPassword("");

    setRole(u.role ?? u.Role);


    setEditId(u.id ?? u.Id);

    setIsEdit(true);

    setShowModal(true);


  };





  // ================= SUBMIT =================


  const handleSubmit=async()=>{


    if(!name || !email || !role){

      Swal.fire(
        "Error",
        "All fields are required",
        "error"
      );

      return;

    }


    try{


      setSaving(true);


      const payload={

        name,

        email,

        password,

        role

      };



      if(isEdit){


        await updateUser(editId,payload);


        Swal.fire(
          "Success",
          "User Updated",
          "success"
        );


      }
      else{


        await createUser(payload);


        Swal.fire(
          "Success",
          "User Created",
          "success"
        );


      }



      setShowModal(false);


      loadUsers();



    }
    catch(err){


      Swal.fire(
        "Error",
        err.message,
        "error"
      );


    }
    finally{


      setSaving(false);


    }


  };





  // ================= DELETE =================


  const handleDelete=async(id)=>{


    const result = await Swal.fire({

      title:"Delete User?",

      icon:"warning",

      showCancelButton:true,

      confirmButtonColor:"#d33"


    });



    if(!result.isConfirmed)
      return;



    try{


      await deleteUser(id);


      Swal.fire(
        "Deleted",
        "User removed",
        "success"
      );


      loadUsers();


    }
    catch(err){


      Swal.fire(
        "Error",
        err.message,
        "error"
      );


    }


  };
return (

<div className="
min-h-screen
bg-blue-50
dark:bg-gray-900
p-8
text-black
dark:text-white
">


{/* HEADER */}

<div className="flex justify-between items-center mb-8">


<div className="flex items-center gap-4">


<div className="
w-14 h-14
rounded-2xl
bg-gradient-to-br
from-[#1E3A8A]
via-[#2563EB]
to-[#3B82F6]
flex items-center justify-center
shadow-lg
">

<User 
className="text-white"
size={28}
/>

</div>



<div>

<h1 className="
text-3xl
font-bold
text-[#1E3A8A]
dark:text-white
">

Users

</h1>


<p className="
text-[#2563EB]
dark:text-cyan-300
">

Total: {users.length}

</p>


</div>


</div>




<button

onClick={openCreate}

className="
px-6 py-3
rounded-xl
bg-gradient-to-r
from-[#1E3A8A]
via-[#2563EB]
to-[#3B82F6]
text-white
flex items-center gap-2
shadow-lg
hover:scale-105
transition-all
"

>


<Plus size={18}/>

Add User


</button>



</div>






{/* SEARCH */}


<div className="mb-6 w-96 relative">


<Search

className="
absolute
left-4
top-3
text-[#2563EB]
"

/>



<input


value={search}


onChange={(e)=>handleSearch(e.target.value)}


placeholder="Search user..."


className="
w-full
pl-11
py-3
rounded-xl
border
border-blue-200
dark:border-gray-700
bg-white
dark:bg-gray-800
text-gray-900
dark:text-white
placeholder-gray-400
focus:ring-4
focus:ring-cyan-300
outline-none
shadow-sm
"

/>



</div>








{/* TABLE */}



<div className="
bg-white
dark:bg-gray-800
rounded-3xl
shadow-2xl
overflow-hidden
">



<table className="
w-full
min-w-[800px]
text-gray-900
dark:text-white
">



<thead className="
bg-gradient-to-r
from-[#1E3A8A]
via-[#2563EB]
to-[#3B82F6]
text-white
">


<tr>


<th className="p-4">
ID
</th>


<th className="p-4">
Name
</th>


<th className="p-4">
Email
</th>


<th className="p-4">
Role
</th>


<th className="p-4">
Actions
</th>


</tr>


</thead>






<tbody>



{

loading ? (


<tr>

<td
colSpan="5"
className="
text-center
p-6
text-gray-500
"
>

Loading...

</td>

</tr>


)

:

users.length > 0 ? (


users.map((u)=>(


<tr

key={u.id ?? u.Id}

className="
border-b
border-gray-200
dark:border-gray-700
hover:bg-blue-50
dark:hover:bg-gray-700
transition-all
"

>



<td className="p-4">

{u.id ?? u.Id}

</td>




<td className="p-4">

{u.name ?? u.Name}

</td>




<td className="p-4">

{u.email ?? u.Email}

</td>




<td className="p-4">

{u.role ?? u.Role}

</td>






<td className="
p-4
flex
gap-2
">



<button

onClick={()=>openEdit(u)}

className="
w-10
h-10
rounded-lg
bg-blue-100
text-[#2563EB]
hover:bg-[#2563EB]
hover:text-white
flex
items-center
justify-center
transition-all
"

>


<Pencil size={18}/>


</button>







<button

onClick={()=>handleDelete(u.id ?? u.Id)}

className="
w-10
h-10
rounded-lg
bg-red-100
text-red-500
hover:bg-red-500
hover:text-white
flex
items-center
justify-center
transition-all
"

>


<Trash2 size={18}/>


</button>




</td>





</tr>


))


)

:

(


<tr>

<td

colSpan="5"

className="
text-center
p-6
text-gray-500
"

>

No Users Found

</td>


</tr>


)



}



</tbody>



</table>



</div>

{/* ================= MODAL ================= */}

<AnimatePresence>

{showModal && (

<motion.div

className="
fixed inset-0
bg-black/50
flex items-center justify-center
z-50
"

>


<motion.div

className="
bg-white
dark:bg-gray-800
rounded-3xl
shadow-xl
p-8
w-[500px]
text-gray-900
dark:text-white
"

>


<h2

className="
text-2xl
font-bold
text-[#1E3A8A]
dark:text-white
mb-6
"

>

{
isEdit 
? 
"Update User"
:
"Add User"
}

</h2>





<input

className="
w-full
mt-3
p-3
rounded-xl
border
border-blue-200
dark:border-gray-600
bg-white
dark:bg-gray-700
text-gray-900
dark:text-white
outline-none
"

placeholder="Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>






<input

className="
w-full
mt-3
p-3
rounded-xl
border
border-blue-200
dark:border-gray-600
bg-white
dark:bg-gray-700
text-gray-900
dark:text-white
outline-none
"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>







<input

className="
w-full
mt-3
p-3
rounded-xl
border
border-blue-200
dark:border-gray-600
bg-white
dark:bg-gray-700
text-gray-900
dark:text-white
outline-none
"

placeholder="Password"

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>







<select

className="
w-full
mt-3
p-3
rounded-xl
border
border-blue-200
dark:border-gray-600
bg-white
dark:bg-gray-700
text-gray-900
dark:text-white
"

value={role}

onChange={(e)=>setRole(e.target.value)}

>


<option value="">
Select Role
</option>


<option value="Admin">
Admin
</option>


<option value="User">
User
</option>


</select>








{/* BUTTONS */}


<div className="
flex
justify-end
gap-3
mt-6
">


<button

onClick={()=>setShowModal(false)}

className="
px-5
py-3
rounded-xl
border
border-blue-200
dark:border-gray-600
text-[#1E3A8A]
dark:text-white
hover:bg-blue-50
dark:hover:bg-gray-700
"

>

Cancel

</button>





<button

onClick={handleSubmit}

className="
px-5
py-3
rounded-xl
bg-gradient-to-r
from-[#1E3A8A]
via-[#2563EB]
to-[#3B82F6]
text-white
shadow-lg
hover:scale-105
transition-all
"

>


{
saving
?
"Saving..."
:
isEdit
?
"Update"
:
"Save"
}


</button>



</div>



</motion.div>



</motion.div>


)}


</AnimatePresence>









{/* ================= PAGINATION ================= */}


<div className="
flex
justify-center
items-center
gap-3
mt-6
">


<button

disabled={currentPage===1}

onClick={()=>setCurrentPage((p)=>p-1)}

className="
px-4
py-2
rounded-lg
border
border-blue-200
dark:border-gray-600
disabled:opacity-40
"

>

Previous

</button>






<button

className="
px-4
py-2
rounded-lg
bg-gradient-to-r
from-[#1E3A8A]
via-[#2563EB]
to-[#3B82F6]
text-white
"

>

{currentPage}

</button>






<button

disabled={users.length < rowsPerPage}

onClick={()=>setCurrentPage((p)=>p+1)}

className="
px-4
py-2
rounded-lg
border
border-blue-200
dark:border-gray-600
disabled:opacity-40
"

>

Next

</button>



</div>


</div>

);

}