import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer 
className="
bg-[#1E3A8A]
dark:bg-gray-900
text-blue-200
dark:text-gray-300
mt-16
relative
overflow-hidden
"
>

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">

        <div className="grid md:grid-cols-3 gap-10">

          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-white hover:scale-105 transition">
              Student<span className="text-cyan-300">MS</span>
            </h2>

            <p className="mt-3 text-blue-200 leading-7">
              A modern Student Management System built with React and Tailwind CSS.
            </p>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-4 text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Students", path: "/students" },
                { name: "Contact", path: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className="
                      hover:text-cyan-300
                      transition-all
                      duration-300
                      hover:pl-2
                      hover:scale-105
                      inline-block
                    "
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-white">
              Contact
            </h3>

            <div className="space-y-2 text-blue-200">

              <p className="hover:text-white transition">
                📧 info@studentms.com
              </p>

              <p className="hover:text-white transition">
                📞 +252 61 1234567
              </p>

              <p className="hover:text-white transition">
                📍 Mogadishu, Somalia
              </p>

            </div>
          </motion.div>

        </div>

        {/* LINE */}
        <motion.hr
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="my-8 border-cyan-400/40"
        />

        {/* BOTTOM TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center text-blue-300 text-sm"
        >
          © 2026 Student Management System. All Rights Reserved.
        </motion.p>

      </div>
    </footer>
  );
}

export default Footer;