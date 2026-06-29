
import React, { useState } from "react";

import {createStudent} from "../services/student-service";

export default function CreateStudent() {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    address: "",
    phone: "",
    parentPhone: "",
    departmentId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await createStudent(student);

      alert(result.message);

      if (result.status) {
        setStudent({
          firstName: "",
          lastName: "",
          gender: "",
          age: "",
          address: "",
          phone: "",
          parentPhone: "",
          departmentId: "",
        });
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStudent({
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      address: "",
      phone: "",
      parentPhone: "",
      departmentId: "",
    });
  };

  return (
    
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg">

        <div className="bg-blue-600 text-white text-center py-5 rounded-t-xl">
          <h2 className="text-3xl font-bold">
            Student Registration Form
          </h2>
          <p className="mt-2">
            Fill in the student information below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <div>
            <label className="font-semibold">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={student.firstName}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={student.lastName}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold">
              Gender
            </label>

            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">
              Address
            </label>

            <textarea
              name="address"
              value={student.address}
              onChange={handleChange}
              rows="3"
              required
              className="w-full mt-2 border rounded-lg p-3"
            ></textarea>
          </div>

          <div>
            <label className="font-semibold">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Parent Phone
            </label>

            <input
              type="text"
              name="parentPhone"
              value={student.parentPhone}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">
              Department
            </label>

            <select
              name="departmentId"
              value={student.departmentId}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3"
            >
              <option value="">Select Department</option>
              <option value="1">Information Technology</option>
              <option value="2">Computer Science</option>
              <option value="3">Accounting</option>
              <option value="4">Business Administration</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-6">

            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Student"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}