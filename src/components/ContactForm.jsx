import { useState } from "react";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message Sent Successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h2 className="text-3xl font-bold mb-6">
        Send Message
      </h2>

      <div className="mb-5">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <div className="mb-5">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      <div className="mb-5">
        <textarea
          rows="5"
          name="message"
          placeholder="Write your message..."
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition"
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactForm;