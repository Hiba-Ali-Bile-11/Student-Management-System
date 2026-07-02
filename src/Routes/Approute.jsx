

import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashbord";
import DashStatus from "../Pages/DashStatus";
import User from "../Pages/User";
import Student from "../Pages/Student";
// import CreateStudent from "../Pages/CreateStudent";
// import { updateStudent } from "../services/student-service";
import Department from "../Pages/Department";
import Course from "../Pages/Course";
import Logout from "../Pages/Logout";
import Login from '../Pages/Login'

function Approute() {
  return (
    
   
    
    
    <Routes>

      
    <Route path="/login" element={<Login />}/>
    <Route path="/dashboard" element={<Dashboard />}>

    <Route index element={< DashStatus/>} />
    <Route path="users" element={<User />} />
    <Route path="students" element={<Student/>} />
    {/* <Route path="CreateStudent" element={ <CreateStudent/>} /> */}
    {/* <Route path="updateStudent" element={ <updateStudent/>} /> */}
    <Route path="department" element={<Department/>}/>
    <Route path="Course" element={<Course/>} />
    <Route path="Logout" element={<Logout/>} />
    



    </Route>
   </Routes>
  );

}

export default Approute;