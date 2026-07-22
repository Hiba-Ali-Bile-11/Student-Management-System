function ServiceCard({ image, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[26px] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 hover:-translate-y-2 hover:shadow-cyan-300/40 transition-all duration-300">

      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">

        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {title}
        </h3>

        <p className="text-gray-600 text-base leading-7">
          {description}
        </p>

        <button
          className="
            mt-6
            bg-cyan-500
            hover:bg-cyan-600
            hover:scale-105
            text-white
            font-semibold
            text-base
            px-6
            py-2.5
            rounded-lg
            transition-all
            duration-300
          "
        >
          Learn More
        </button>

      </div>

    </div>
  );
}

export default ServiceCard;