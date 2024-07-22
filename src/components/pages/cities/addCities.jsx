import React, { useState, useEffect } from "react";
import axios from "axios";
import countryList from "country-list";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

const CityForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    countryName: "",
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const countries = countryList.getData();
    const formattedCountries = countries.map((country) => ({
      value: country.code,
      label: country.name,
    }));
    setCountryOptions(formattedCountries);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      countryName: selectedOption.label,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/city/addCity",
        formData
      );
      console.log("City added successfully:", response.data);
      // Redirect to city list page after successful submission
      navigate("/city");
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  return (
    <>
      <div className="w-full p-2 rounded-md">
        <nav>
          <Link to="/" className="mr-2 text-red-300 hover:text-red-500">
            Dashboard /
          </Link>
          <Link to="/cities" className="mr-2 text-red-300 hover:text-red-500">
            Cities /
          </Link>
          <span className="font-semibold text-red-500">Insert City</span>
        </nav>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Create City</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              City Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:border-red-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Select Country
            </label>
            <Select
              options={countryOptions}
              onChange={handleCountryChange}
              value={countryOptions.find(
                (option) => option.label === formData.countryName
              )}
              className="w-1/2"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#CF2030] text-white rounded hover:bg-red-900 transition duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default CityForm;
