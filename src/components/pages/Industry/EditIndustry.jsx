import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditIndustry = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchIndustry();
  }, [id]);

  const fetchIndustry = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/industry/getIndustryById?id=${id}`,
        { withCredentials: true }
      );
      const { name } = response.data;
      setName(name);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const industryData = { name };

    try {
      await axios.put(
        `http://localhost:3002/industry/updateIndustry?id=${id}`,
        industryData,
        { withCredentials: true }
      );
      setName("");
      navigate("/industryList");
    } catch (error) {
      console.error(
        "Failed to update industry:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <div className="w-full p-2">
        <nav>
          <Link to="/" className="mr-2 text-red-300 hover:text-red-500">
            Dashboard /
          </Link>
          <Link
            to="/industryList"
            className="mr-2 text-red-300 hover:text-red-500"
          >
            Industries /
          </Link>
          <span className="font-semibold text-red-500"> Edit Industry</span>
        </nav>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Edit Industry</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2">
              Industry Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-1/2 p-2 border rounded focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default EditIndustry;
