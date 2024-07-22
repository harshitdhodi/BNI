import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Country } from "country-state-city";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [mobile, setMobile] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);
   
  useEffect(() => {
    if (country) {
      axios
        .get(`http://localhost:3002/city/getCityByCountry?countryName=${country.name}`)
        .then((response) => {
          const citiesData = response.data;
          if (Array.isArray(citiesData)) {
            setCities(citiesData);
          } else {
            setCities([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
          setCities([]);
        });
    } else {
      setCities([]);
    }
  }, [country]);

  useEffect(() => {
    if (city) {
      axios
        .get(`http://localhost:3002/chapter/getChapterByCity?city=${city.name}`)
        .then((response) => {
          const chaptersData = response.data;
          if (Array.isArray(chaptersData)) {
            setChapters(chaptersData);
          } else {
            setChapters([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching chapters:", error);
          setChapters([]);
        });
    } else {
      setChapters([]);
    }
  }, [city]);

  const handleAddKeyword = (event) => {
    event.preventDefault();
    if (keywordInput.trim() !== "") {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleDeleteKeyword = (keywordToDelete) => {
    setKeywords(keywords.filter((kw) => kw !== keywordToDelete));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Convert keywords array to a single string
  const keywordString = keywords.join(", "); // Adjust the delimiter as needed

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("confirm_password", confirmPassword);
  formData.append("country", country ? country.name : "");
  formData.append("city", city ? city.name : "");
  formData.append("chapter", chapter ? chapter.name : "");
  formData.append("mobile", mobile);
  formData.append("keyword", keywordString); // Use keywordString here
  if (profileImg) formData.append("profileImg", profileImg);
  if (bannerImg) formData.append("bannerImg", bannerImg);

  try {
    // setLoading(true); // Set loading state to true++
    const response = await axios.post(
      "http://localhost:3002/member/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    navigate("/memberList");
  } catch (error) {
    console.error(
      "Failed to create user:",
      error.response ? error.response.data : error.message
    );
  } finally {
    setLoading(false); // Set loading state to false
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
            to="/memberList"
            className="mr-2 text-red-300 hover:text-red-600"
          >
            {" "}
            Members /
          </Link>
          <Link className="font-bold text-red-500"> Insert User</Link>
        </nav>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Create User</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-[15px] border rounded focus:outline-none focus:border-red-500 transition duration-300 bg-[#F1F1F1] border-[#aeabab]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-[15px] border rounded focus:outline-none focus:border-red-500 transition duration-300 bg-[#F1F1F1] border-[#aeabab]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-[15px] border rounded focus:outline-none focus:border-red-500 transition duration-300 bg-[#F1F1F1] border-[#aeabab]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-[15px] border rounded focus:outline-none focus:border-red-500 transition duration-300 bg-[#F1F1F1] border-[#aeabab]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Country</label>
            <Autocomplete
              options={countries}
              getOptionLabel={(option) => option.name}
              value={country}
              onChange={(event, newValue) => setCountry(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Country"
                  variant="outlined"
                  className="w-full"
                  required
                />
              )}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">City</label>
            <Autocomplete
              options={cities}
              getOptionLabel={(option) => option.name}
              value={city}
              onChange={(event, newValue) => setCity(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select City"
                  variant="outlined"
                  className="w-full"
                  required
                  disabled={!country}
                />
              )}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Chapter</label>
            <Autocomplete
              options={chapters}
              getOptionLabel={(option) => option.name}
              value={chapter}
              onChange={(event, newValue) => setChapter(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Chapter"
                  variant="outlined"
                  className="w-full"
                  required
                  disabled={!city}
                />
              )}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Mobile Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-[15px] border rounded focus:outline-none focus:border-red-500 transition duration-300 bg-[#F1F1F1] border-[#aeabab]"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold mb-2">Keyword</label>
            <div className="flex">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                className="flex-grow p-[15px] border rounded-l-md focus:outline-none focus:border-red-500 transition duration-300 bg-[#F1F1F1] border-[#aeabab]"
                placeholder="Enter a keyword"
              />
              <button
                type="button"
                onClick={handleAddKeyword}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded-r-md hover:bg-red-600 transition duration-300"
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {keywords.map((kw, index) => (
                <Chip
                  key={index}
                  label={kw}
                  onDelete={() => handleDeleteKeyword(kw)}
                  color="primary"
                  className="mr-1 mb-1"
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Profile Image</label>
            <input
              type="file"
              onChange={(e) => setProfileImg(e.target.files[0])}
              className="w-full p-[15px] border rounded focus:outline-none focus:border-red-500 transition duration-300 bg-[#F1F1F1] border-[#aeabab]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Banner Image</label>
            <input
              type="file"
              onChange={(e) => setBannerImg(e.target.files[0])}
              className="w-full p-[15px] border rounded focus:outline-none focus:border-red-500 transition duration-300 bg-[#F1F1F1] border-[#aeabab]"
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition duration-300"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
