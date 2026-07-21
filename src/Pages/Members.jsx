import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import StudentCard from "../components/StudentCard";
import studentsData from "../data/students";


function Members() {
  const [search, setSearch] = useState("");

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div 
className="
min-h-screen 
bg-gradient-to-br 
from-sky-400 
via-cyan-500 
to-blue-900

dark:from-gray-900
dark:via-gray-800
dark:to-black

pt-28 
pb-20
"
>

        <div className="max-w-7xl mx-auto px-6">

          {/* TITLE */}
          <SectionTitle
            title="Our Students"
            subtitle="Meet our talented students."
          />

          {/* SEARCH */}
          <div className="my-12 flex justify-center">
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full md:w-1/2
                px-6 py-4
                rounded-2xl
                outline-none
                shadow-xl
                border border-gray-200
                text-gray-700
                focus:ring-4 focus:ring-cyan-300
                transition-all
                duration-300
              "
            />
          </div>

          {/* STUDENT CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="transform hover:scale-[1.03] transition-all duration-300"
              >
                <StudentCard
                  image={student.image}
                  name={student.name}
                  course={student.course}
                  email={student.email}
                />
              </div>
            ))}

           <Link
  to="/"
  className="inline-flex items-center justify-center mt-6 border border-blue-900 text-white hover:bg-blue-900 hover:text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300"
>
  Go Back Home
</Link>

  
   
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Members;