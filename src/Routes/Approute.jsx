

import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashbord";
import DashStatus from "../Pages/DashStatus";
import User from "../Pages/User";
import Student from "../Pages/Student";
import CreateStudent from "../Pages/CreateStudent";
import { updateStudent } from "../services/student-service";

function Approute() {
  return (
    
   
    
    
    <Routes>
    <Route path="/dashboard" element={<Dashboard />}>
    <Route index element={< DashStatus/>} />
    <Route path="users" element={<User />} />
    <Route path="students" element={<Student/>} />
    <Route path="CreateStudent" element={ <CreateStudent/>} />
    <Route path="updateStudent" element={ <updateStudent/>} />
    



    </Route>
   </Routes>
  );

}

export default Approute;