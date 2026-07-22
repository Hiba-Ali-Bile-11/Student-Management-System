function StudentCard({ image, name, course, email }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-2 hover:shadow-cyan-300/40 transition-all duration-300">

      {/* IMAGE FIX (NO BOTTOM CROP ISSUE) */}
      <div className="w-full h-56 overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="
            w-full
            h-full
            object-cover
            object-center
            hover:scale-110
            transition-transform
            duration-500
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 text-center">

        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {name}
        </h3>

        <p className="text-cyan-600 font-medium mb-2">
          {course}
        </p>

        <p className="text-gray-500 text-sm mb-4">
          {email}
        </p>

        <button className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
          View Profile
        </button>

      </div>

    </div>
  );
}

export default StudentCard;