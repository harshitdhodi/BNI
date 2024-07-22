import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";

const CreateMyGives = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [webURL, setWebURL] = useState("");
  const [dept, setDept] = useState("");
  const [departments, setDepartments] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3002/department/getAllDepartment");
      setDepartments(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Failed to fetch departments:", error.response ? error.response.data : error.message);
    }
  };

  const fetchCompanies = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:3002/company/getFilteredGives?companyName=${searchTerm}`, { withCredentials: true });
      setCompanyOptions(Array.isArray(response.data.companies) ? response.data.companies : []);
    } catch (error) {
      console.error("Failed to fetch companies:", error.response ? error.response.data : error.message);
    }
  };

  const debouncedFetchCompanies = debounce((searchTerm) => {
    fetchCompanies(searchTerm);
  }, 300);

  const handleCompanyNameChange = (event, newValue) => {
    setCompanyName(newValue);
    debouncedFetchCompanies(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myGivesData = {
      companyName,
      email,
      phoneNumber,
      webURL,
      dept,
    };

    try {
      const response = await axios.post(
        `http://localhost:3002/myGives/addMyGives?user=${userId}`,
        myGivesData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("My Gives created successfully:", response.data);

      navigate(`/myGives/${userId}`);
    } catch (error) {
      console.error("Failed to create My Gives:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div className="w-full p-2">
        <nav>
          <Link to="/" className="mr-2 text-red-300 hover:text-red-600">
            Dashboard /
          </Link>
          <Link
            to={`/myGives/${userId}`}
            className="mr-2 text-red-300 hover:text-red-600"
          >
            My Gives /
          </Link>
          <Link className="font-bold text-red-500"> Add My Gives</Link>
        </nav>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Add My Gives</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Company Name</label>
            <Autocomplete
              freeSolo
              options={companyOptions}
              getOptionLabel={(option) => option.companyName || ""} // Ensure this returns a string
              value={companyOptions.find((option) => option.companyName === companyName) || null}
              onInputChange={handleCompanyNameChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select or Add Company Name"
                  variant="outlined"
                  className="w-full"
                  required
                />
              )}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border bg-[#F1F1F1] border-[#aeabab] rounded focus:outline-none focus:border-black hover:border-black "
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-4 border bg-[#F1F1F1] border-[#aeabab] rounded focus:outline-none focus:border-black hover:border-black "
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Website URL</label>
            <input
              type="text"
              value={webURL}
              onChange={(e) => setWebURL(e.target.value)}
              className="w-full p-4 border bg-[#F1F1F1] border-[#aeabab] rounded focus:outline-none focus:border-black hover:border-black "
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Department</label>
            <Autocomplete
              options={departments}
              getOptionLabel={(option) => option.name || ""} // Ensure this returns a string
              value={departments.find((department) => department.name === dept) || null}
              onChange={(event, newValue) => {
                setDept(newValue ? newValue.name : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Department"
                  variant="outlined"
                  className="w-full"
                  required
                />
              )}
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Add My Gives
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateMyGives;
