function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-purple-950">
        {title}
      </h2>

      <p className="text- hover:bg-cyan-600 mt-4 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

export default SectionTitle;