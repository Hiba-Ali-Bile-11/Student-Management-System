import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaAward,
} from "react-icons/fa";

function StatsSection() {
  const stats = [
    {
      id: 1,
      icon: <FaUserGraduate />,
      number: "1,200+",
      title: "Students",
    },
    {
      id: 2,
      icon: <FaChalkboardTeacher />,
      number: "80+",
      title: "Teachers",
    },
    {
      id: 3,
      icon: <FaBookOpen />,
      number: "45+",
      title: "Courses",
    },
    {
      id: 4,
      icon: <FaAward />,
      number: "98%",
      title: "Success Rate",
    },
  ];

  return (
    <section 
className="
bg-yellow-50
dark:bg-gray-900
py-20
px-6
text-gray-900
dark:text-white
"
>
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#1E3A8A]">
            Our Statistics
          </h2>

          <p className="text-gray-600 mt-4 text-2xl">
            Trusted by hundreds of students every year.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((item) => (
            <div
              key={item.id}
              className="
                group
                bg-gradient-to-br
                from-[#1E3A8A]
                to-[#2563EB]
                rounded-3xl
                p-10
                text-center
                shadow-2xl
                hover:shadow-[0_25px_60px_rgba(30,58,138,0.45)]
                hover:-translate-y-6
                hover:scale-110
                transition-all
                duration-700
                cursor-pointer
              "
            >
              <div
                className="
                  w-24
                  h-24
                  mx-auto
                  mb-6
                  rounded-full
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  text-cyan-300
                  text-5xl
                  group-hover:bg-white
                  group-hover:text-[#1E3A8A]
                  group-hover:rotate-12
                  group-hover:scale-125
                  transition-all
                  duration-700
                "
              >
                {item.icon}
              </div>

              <h3 className="text-5xl font-extrabold text-white group-hover:tracking-wider transition-all duration-500">
                {item.number}
              </h3>

              <p className="mt-4 text-blue-100 text-lg font-medium group-hover:text-white transition-colors duration-500">
                {item.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default StatsSection;