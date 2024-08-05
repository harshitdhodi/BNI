import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";
import axios from "axios";

const CreateMyAsk = () => {
  const [myAsk, setMyAsk] = useState({
    email: "",
    companyName: "",
    companyId: "",  // Add companyId to state
    dept: "",
    message: "",
  });
  const [departments, setDepartments] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [companyOptions, setCompanyOptions] = useState([]);
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
    fetchEmails();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("/api/department/getAllDepartment");
      setDepartments(response.data.data);
    } catch (error) {
      console.error(
        "Failed to fetch departments:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchCompanies = async (searchTerm) => {
    try {
      const response = await axios.get(
        `/api/company/getFilteredGives?companyName=${searchTerm}`,
        { withCredentials: true }
      );
      setCompanyOptions(
        Array.isArray(response.data.companies) ? response.data.companies : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch companies:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchCompanyId = async (companyName) => {
    try {
      const response = await axios.get(
        `/api/company/getCompanyByName?companyName=${companyName}`,
        { withCredentials: true }
      );
      if (response.data.company) {
        setMyAsk((prevMyAsk) => ({
          ...prevMyAsk,
          companyId: response.data.company._id,
        }));
      }
    } catch (error) {
      console.error(
        "Failed to fetch company ID:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const debouncedFetchCompanies = debounce((searchTerm) => {
    fetchCompanies(searchTerm);
  }, 300);

  const handleCompanyNameChange = (event, newValue) => {
    setSelectedCompanyName(newValue);
    setMyAsk((prevMyAsk) => ({
      ...prevMyAsk,
      companyName: newValue,
    }));
    if (newValue) {
      debouncedFetchCompanies(newValue);
      fetchCompanyId(newValue); // Fetch companyId when companyName changes
    }
  };

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/member/getAllmemberDropdown", {
        withCredentials: true,
      });
      setEmails(response.data.data);
    } catch (error) {
      console.error(
        "Failed to fetch emails:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyAsk((prevMyAsk) => ({
      ...prevMyAsk,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/myAsk/addMyAskByEmail", myAsk, {
        withCredentials: true,
      });
      navigate(`/myAsks/${userId}`);
    } catch (error) {
      console.error(
        "Failed to create My Ask:",
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
            to={`/myAsks/${userId}`}
            className="mr-2 text-red-300 hover:text-red-500"
          >
            My Asks /
          </Link>
          <Link className="font-semibold text-red-500"> Create My Ask</Link>
        </nav>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Create My Ask</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.keys(myAsk).map(
            (key) =>
              key !== "_id" &&
              key !== "createdAt" &&
              key !== "updatedAt" &&
              key !== "user" &&
              key !== "__v" && (
                <div className="mb-4" key={key}>
                  <label htmlFor={key} className="block font-semibold mb-2">
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace("_", " ")}
                  </label>
                  {key === "dept" ? (
                    <select
                      id={key}
                      name={key}
                      value={myAsk[key]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  ) : key === "email" ? (
                    <select
                      id={key}
                      name={key}
                      value={myAsk[key]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                      required
                    >
                      <option value="">Select Email</option>
                      {emails.map((email) => (
                        <option key={email._id} value={email.email}>
                          {email.email}
                        </option>
                      ))}
                    </select>
                  ) : key === "companyName" ? (
                    <Autocomplete
                      freeSolo
                      options={companyOptions.map(
                        (option) => option.companyName
                      )}
                      value={selectedCompanyName}
                      onInputChange={(event, newInputValue) => {
                        handleCompanyNameChange(event, newInputValue);
                      }}
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
                  ) : (
                    <input
                      type="text"
                      id={key}
                      name={key}
                      value={myAsk[key]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                      required
                    />
                  )}
                </div>
              )
          )}
          <button
            type="submit"
            className="px-4 w-fit py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateMyAsk;
