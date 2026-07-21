import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import {
  getDepartments,
  deleteDepartment,
  createDepartment,
  updateDepartment,
} from "../services/department-service";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [departmentName, setDepartmentName] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // LOAD DATA
  const loadDepartments = async () => {
    setLoading(true);
    const res = await getDepartments();
    setDepartments(res?.data || res || []);
    setLoading(false);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // SEARCH
  const filtered = departments.filter((d) =>
    String(d.name ?? d.Name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // RESET PAGE WHEN SEARCH
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // PAGINATION
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;

  const currentDepartments = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  // SAFE PAGE FIX
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  // OPEN CREATE
  const openCreate = () => {
    setDepartmentName("");
    setEditId(null);
    setIsEdit(false);
    setShowModal(true);
  };

  // OPEN EDIT
  const openEdit = (d) => {
    setDepartmentName(d.name ?? d.Name);
    setEditId(d.id ?? d.Id);
    setIsEdit(true);
    setShowModal(true);
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (!departmentName.trim()) {
      Swal.fire("Error", "Department name required", "error");
      return;
    }

    setSaving(true);

    const payload = { name: departmentName };

    if (isEdit) {
      await updateDepartment(editId, payload);
      Swal.fire("Success", "Updated successfully", "success");
    } else {
      await createDepartment(payload);
      Swal.fire("Success", "Created successfully", "success");
    }

    setShowModal(false);
    loadDepartments();
    setSaving(false);
  };

  // DELETE
  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Delete Department?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!res.isConfirmed) return;

    await deleteDepartment(id);
    loadDepartments();
  };

 return (
  <div className="
    min-h-screen
    bg-blue-50
    dark:bg-gray-900
    p-4 sm:p-6 lg:p-8
    text-black
    dark:text-white
  ">

    {/* HEADER */}
    <div className="
      flex 
      flex-col 
      md:flex-row 
      justify-between 
      items-start 
      md:items-center 
      gap-5 
      mb-8
    ">

      <div className="flex items-center gap-3 sm:gap-4">

        <div className="
          w-12 h-12 sm:w-14 sm:h-14
          rounded-2xl
          bg-gradient-to-br 
          from-[#1E3A8A] 
          via-[#2563EB] 
          to-[#3B82F6]
          flex 
          items-center 
          justify-center 
          shadow-lg
        ">
          <Building2 className="text-white" size={26}/>
        </div>


        <div>

          <h1 className="
            text-2xl sm:text-3xl
            font-bold 
            text-[#1E3A8A] 
            dark:text-white
          ">
            Departments
          </h1>


          <p className="
            text-sm sm:text-base
            text-[#2563EB] 
            dark:text-cyan-300
          ">
            Total: {filtered.length}
          </p>

        </div>

      </div>



      <button
        onClick={openCreate}
        className="
          w-full md:w-auto
          justify-center
          px-6 py-3
          rounded-xl
          bg-gradient-to-r
          from-[#1E3A8A]
          via-[#2563EB]
          to-[#3B82F6]
          text-white
          shadow-lg
          hover:scale-105
          transition-all
          flex 
          items-center 
          gap-2
        "
      >
        <Plus size={18}/>
        Add Department
      </button>


    </div>




    {/* SEARCH */}
    <div className="
      mb-6 
      w-full 
      md:w-96 
      relative
    ">

      <Search 
        className="absolute left-4 top-3 text-[#2563EB]"
      />


      <input

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        placeholder="Search department..."

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
      overflow-x-auto
    ">


      <table className="
        w-full
        min-w-[650px]
        text-sm
        sm:text-base
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

            <th className="p-3 sm:p-4">
              ID
            </th>


            <th className="p-3 sm:p-4">
              Department Name
            </th>


            <th className="p-3 sm:p-4">
              Actions
            </th>


          </tr>


        </thead>





        <tbody>


          {loading ? (


            <tr>

              <td
                colSpan="3"
                className="
                  text-center
                  p-6
                  text-gray-500
                  dark:text-gray-300
                "
              >
                Loading...
              </td>

            </tr>



          ) : currentDepartments.length > 0 ? (


            currentDepartments.map((d)=>(


              <tr

                key={d.id ?? d.Id}

                className="
                  border-b
                  border-gray-200
                  dark:border-gray-700
                  hover:bg-blue-50
                  dark:hover:bg-gray-700
                  transition
                "

              >



                <td className="p-3 sm:p-4">

                  {d.id ?? d.Id}

                </td>



                <td className="p-3 sm:p-4">

                  {d.name ?? d.Name}

                </td>




                <td className="
                  p-3 sm:p-4
                  flex
                  gap-2
                  whitespace-nowrap
                ">



                  <button

                    onClick={()=>openEdit(d)}

                    className="
                      w-9 h-9
                      sm:w-10 sm:h-10
                      rounded-lg
                      bg-blue-100
                      text-[#2563EB]
                      hover:bg-[#2563EB]
                      hover:text-white
                      flex
                      items-center
                      justify-center
                    "

                  >

                    <Pencil size={18}/>

                  </button>





                  <button

                    onClick={()=>handleDelete(d.id ?? d.Id)}

                    className="
                      w-9 h-9
                      sm:w-10 sm:h-10
                      rounded-lg
                      bg-red-100
                      text-red-500
                      hover:bg-red-500
                      hover:text-white
                      flex
                      items-center
                      justify-center
                    "

                  >

                    <Trash2 size={18}/>

                  </button>



                </td>


              </tr>


            ))



          ) : (


            <tr>

              <td
                colSpan="3"
                className="
                  text-center
                  p-6
                  text-gray-500
                  dark:text-gray-300
                "
              >
                No Departments Found
              </td>

            </tr>


          )}


        </tbody>


      </table>


    </div>





    {/* PAGINATION */}

    <div className="
      flex
      flex-wrap
      justify-center
      items-center
      gap-2
      mt-6
    ">


      <button

        disabled={currentPage === 1}

        onClick={()=>setCurrentPage(p=>p-1)}

        className="
          px-3 sm:px-4
          py-2
          rounded-lg
          border
          border-blue-200
          dark:border-gray-600
          text-[#1E3A8A]
          dark:text-white
          disabled:opacity-40
        "

      >
        Previous
      </button>





      {Array.from({length:totalPages}).map((_,i)=>(


        <button

          key={i}

          onClick={()=>setCurrentPage(i+1)}

          className={`
            px-3 sm:px-4
            py-2
            rounded-lg

            ${
              currentPage===i+1
              ?
              "bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white"
              :
              "border border-blue-200 dark:border-gray-600 text-[#1E3A8A] dark:text-white"
            }
          `}

        >

          {i+1}

        </button>


      ))}





      <button

        disabled={currentPage === totalPages}

        onClick={()=>setCurrentPage(p=>p+1)}

        className="
          px-3 sm:px-4
          py-2
          rounded-lg
          border
          border-blue-200
          dark:border-gray-600
          text-[#1E3A8A]
          dark:text-white
          disabled:opacity-40
        "

      >

        Next

      </button>


    </div>







    {/* MODAL */}

    <AnimatePresence>


      {showModal && (


        <motion.div

          className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
            px-4
          "

        >



          <motion.div

            className="
              bg-white
              dark:bg-gray-800
              p-5
              sm:p-8
              rounded-3xl
              w-full
              max-w-[400px]
              text-gray-900
              dark:text-white
            "

          >


            <h2 className="
              text-xl
              sm:text-2xl
              font-bold
              text-[#1E3A8A]
              dark:text-white
              mb-5
            ">

              {isEdit ? "Update Department" : "Add Department"}

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

              placeholder="Department Name"

              value={departmentName}

              onChange={(e)=>setDepartmentName(e.target.value)}

            />





            <div className="
              flex
              flex-col
              sm:flex-row
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
                  border-gray-300
                  dark:border-gray-600
                  dark:text-white
                  hover:bg-gray-100
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
                "

              >

                {saving ? "Saving..." : isEdit ? "Update" : "Save"}

              </button>



            </div>



          </motion.div>


        </motion.div>


      )}


    </AnimatePresence>



  </div>
);
}