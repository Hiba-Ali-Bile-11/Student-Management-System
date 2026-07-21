function Button({ title }) {
  return (
    <button
      className="
      bg-cyan-500
      hover:bg-cyan-600
      text-white
      font-semibold
      px-6
      py-3
      rounded-lg
      shadow-lg
      hover:shadow-cyan-500/50
      hover:-translate-y-1
      transition-all
      duration-300
      "
    >
      {title}
    </button>
  );
}

export default Button;