import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";

import servicesData from "../data/services";
import img1 from "../assets/images/image1.jpg";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";


function Services() {
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
"
>

        <div className="max-w-7xl mx-auto px-6">

          {/* SECTION TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              title="Our Services"
              subtitle="We provide smart digital solutions for educational institutions."
            />
          </motion.div>

          {/* HERO SECTION */}
          <div className="grid lg:grid-cols-2 gap-20 items-center py-24">

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
                Smart Educational Services
              </h2>

              <p className="text-2xl text-cyan-100 leading-9 mb-10 max-w-xl">
                Our Student Management System helps schools,
                colleges, and universities manage students,
                teachers, attendance, grades, and reports
                using one powerful modern platform.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 25px rgba(34,211,238,0.9)",
                }}
                whileTap={{ scale: 0.95 }}
                className="
                  bg-white
                  text-cyan-700
                  hover:bg-cyan-100
                  px-8 py-4
                  rounded-full
                  text-lg
                  font-bold
                  shadow-xl
                  transition-all
                  duration-500
                "
              >
                Explore Services
              </motion.button>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              viewport={{ once: true }}
            >
              <img
                src={img1}
                alt="Services"
                className="w-full h-[500px] object-cover rounded-[35px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] border-4 border-white"
              />
            </motion.div>

          </div>

          {/* PART 2 WILL CONTINUE (CARDS SECTION) */}
                    {/* SERVICE CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 pb-24">

            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.08,
                  y: -12,
                  rotate: -1,
                }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                />
              </motion.div>
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

export default Services;