import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const EditMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    chapter: "",
    keyword: [],
    password: "",
    confirm_password: "",
    profileImg: "", // State for profile image
    bannerImg: "", // State for banner image
  });
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMember();
    fetchCountries();
  }, [id]);

  useEffect(() => {
    if (member.country) {
      fetchCities(member.country);
    }
  }, [member.country]);

  useEffect(() => {
    if (member.city) {
      fetchChapters(member.city);
    }
  }, [member.city]);

  const fetchMember = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/member/getUserById?id=${id}`,
        { withCredentials: true }
      );
      const memberData = response.data.data;
      setMember(memberData);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/country/getCountry?page=1&limit=100`,
        { withCredentials: true }
      );
      setCountries(response.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchCities = async (country) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/city/getAllCity?country=${country}`,
        { withCredentials: true }
      );
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };

  const fetchChapters = async (city) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/chapter/getChapterByCity?city=${city}`,
        { withCredentials: true }
      );
      setChapters(response.data || []);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setChapters([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleCountryChange = (event, newValue) => {
    const selectedCountry = newValue ? newValue.name : "";
    setMember((prevMember) => ({
      ...prevMember,
      country: selectedCountry,
      city: "",
    }));
    if (selectedCountry) {
      fetchCities(selectedCountry);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (event, newValue) => {
    const selectedCity = newValue ? newValue.name : "";
    setMember((prevMember) => ({
      ...prevMember,
      city: selectedCity,
      chapter: "",
    }));
    if (selectedCity) {
      fetchChapters(selectedCity);
    } else {
      setChapters([]);
    }
  };

  const handleChapterChange = (event, newValue) => {
    setMember((prevMember) => ({
      ...prevMember,
      chapter: newValue ? newValue.name : "",
    }));
  };

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMember((prevMember) => ({
        ...prevMember,
        profileImg: file,
      }));
    }
  };

  const handleBannerImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMember((prevMember) => ({
        ...prevMember,
        bannerImg: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", member.name);
      formData.append("email", member.email);
      formData.append("mobile", member.mobile);
      formData.append("country", member.country);
      formData.append("city", member.city);
      formData.append("chapter", member.chapter);
      formData.append("password", member.password);
      formData.append("confirm_password", member.confirm_password);
      formData.append("keyword", member.keyword);
      formData.append("profileImg", member.profileImg); // Append profile image file
      formData.append("bannerImg", member.bannerImg); // Append banner image file

      await axios.put(
        `http://localhost:3002/member/updatememberById?id=${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/memberList");
    } catch (error) {
      console.error(
        "Failed to update member:",
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
          <Link to="/memberList" className="mr-2 text-red-300 hover:text-red-500">
            Members /
          </Link>
          <Link className="font-semibold text-red-500"> Edit Member</Link>
        </nav>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Edit Member</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {Object.keys(member).map((key) => (
            key !== "_id" &&
            key !== "resetOTP" &&
            key !== "password" &&
            key !== "confirm_password" &&
            key !== "__v" && (
              <div className="mb-4" key={key}>
                <label htmlFor={key} className="block font-semibold mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                </label>
                {key === "country" ? (
                  <Autocomplete
                    id={key}
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    value={countries.find((country) => country.name === member.country) || null}
                    onChange={handleCountryChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        className="w-full p-2 border rounded focus:outline-none  focus:border-black-500"
                        required
                      />
                    )}
                  />
                ) : key === "city" ? (
                  <Autocomplete
                    id={key}
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    value={cities.find((city) => city.name === member.city) || null}
                    onChange={handleCityChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        className="w-full p-2 border rounded focus:outline-none focus:border-red-500"
                        required
                      />
                    )}
                  />
                ) : key === "chapter" ? (
                  <Autocomplete
                    id={key}
                    options={chapters}
                    getOptionLabel={(option) => option.name}
                    value={chapters.find((chapter) => chapter.name === member.chapter) || null}
                    onChange={handleChapterChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        className="w-full p-2 border rounded focus:outline-none hover:border-red-500"
                        required
                      />
                    )}
                  />
                ) : key === "profileImg" || key === "bannerImg" ? (
                  <>
                    <input
                      type="file"
                      id={key}
                      name={key}
                      onChange={key === "profileImg" ? handleProfileImgChange : handleBannerImgChange}
                      accept="image/*"
                      className="w-full p-4 border bg-[#F1F1F1] border-[#aeabab] rounded focus:outline-none focus:border-black hover:border-black"
                    />
                    {member[key] && (
                      <div className="mt-2">
                        <img
                          src={`http://localhost:3002/image/download/${member[key]}`}
                          alt=""
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <input
                    type={key === "keyword" ? "text" : "text"}
                    id={key}
                    name={key}
                    value={member[key]}
                    onChange={handleChange}
                    className="w-full p-4 border bg-[#F1F1F1] border-[#aeabab] rounded focus:outline-none focus:border-black hover:border-black"
                    required
                  />
                )}
              </div>
            )
          ))}
          <br />
     <button
            type="submit"
            className="px-4 py-2 w-[5cm] bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default EditMember;
