

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import ContactForm from "../components/ContactForm";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Contact() {
  return (
    <>
      <Navbar />

        <div 
        className="
        min-h-screen 
        bg-gradient-to-br 
        from-[#06B6D4] 
        via-cyan-500 
        to-[#1E3A8A]
        dark:from-gray-900
        dark:via-gray-800
        dark:to-black
        pt-28
        "
        >
        <div className="max-w-7xl mx-auto px-6">

          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              title="Contact Us"
              subtitle="We would love to hear from you."
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 py-16">

            {/* CONTACT INFO */}
            <div className="space-y-6">

              {/* ADDRESS */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="
                  bg-white/15
                  backdrop-blur-xl
                  border
                  border-white/30
                  rounded-2xl
                  p-6
                  shadow-2xl
                  flex
                  items-center
                  gap-5
                  cursor-pointer
                  transition-all
                  duration-500
                  hover:border-cyan-300
                  hover:shadow-cyan-400/40
                "
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
                  <FaMapMarkerAlt className="text-4xl text-cyan-300" />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Address
                  </h3>
                  <p className="text-gray-100">
                    Mogadishu, Somalia
                  </p>
                </div>
              </motion.div>

              {/* PHONE */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="
                  bg-white/15
                  backdrop-blur-xl
                  border
                  border-white/30
                  rounded-2xl
                  p-6
                  shadow-2xl
                  flex
                  items-center
                  gap-5
                  cursor-pointer
                  transition-all
                  duration-500
                  hover:border-cyan-300
                  hover:shadow-cyan-400/40
                "
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
                  <FaPhoneAlt className="text-4xl text-cyan-300" />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Phone
                  </h3>
                  <p className="text-gray-100">
                    +252 61 1234567
                  </p>
                </div>
              </motion.div>

              {/* EMAIL */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="
                  bg-white/15
                  backdrop-blur-xl
                  border
                  border-white/30
                  rounded-2xl
                  p-6
                  shadow-2xl
                  flex
                  items-center
                  gap-5
                  cursor-pointer
                  transition-all
                  duration-500
                  hover:border-cyan-300
                  hover:shadow-cyan-400/40
                "
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
                  <FaEnvelope className="text-4xl text-cyan-300" />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Email
                  </h3>
                  <p className="text-gray-100">
                    info@studentms.com
                  </p>
                </div>
              </motion.div>

            </div>

            {/* CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/30
                rounded-3xl
                p-6
                shadow-2xl
                hover:shadow-cyan-400/30
                transition-all
                duration-500
              "
            >
              <ContactForm />
            </motion.div>

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

export default Contact;

