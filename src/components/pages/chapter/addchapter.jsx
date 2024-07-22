import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { TextField, Autocomplete, Button } from "@mui/material";
import { Country, City } from "country-state-city"; // Import Country and City modules from country-state-city

const CreateChapter = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]); // Initialize cities state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all countries with their short codes
    const countryData = Country.getAllCountries().map((country) => ({
      isoCode: country.isoCode,
      name: `${country.name} (${country.isoCode})`,
    }));

    // Set default cities for the initial selected country
    if (country) {
      const citiesOfCountry = City.getCitiesOfCountry(country.isoCode);
      setCities(citiesOfCountry.map((city) => city.name));
    }
  }, []); // Run only once on component mount

  useEffect(() => {
    // Reset city selection when country changes
    setCity(null);

    // Fetch cities based on selected country
    const fetchCities = async () => {
      if (country) {
        const citiesOfCountry = City.getCitiesOfCountry(country.isoCode);
        setCities(citiesOfCountry.map((city) => city.name));
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [country]);

  const handleCityInputChange = (event, value) => {
    setCity(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chapterData = {
      name,
      countryName: country?.name,
      city,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/chapter/addChapter",
        chapterData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response.data;

      console.log(data);

      navigate("/ChapterList");
    } catch (error) {
      console.error(
        "Failed to create chapter:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Fetch all countries with their short codes
  const countryData = Country.getAllCountries().map((country) => ({
    isoCode: country.isoCode,
    name: `${country.name} (${country.isoCode})`,
  }));

  // Filter cities based on input in the city text field alphabetically
  const filteredCities = cities
    .filter((cityName) =>
      cityName.toLowerCase().includes(city ? city.toLowerCase() : "")
    )
    .sort((a, b) => a.localeCompare(b)); // Sort cities alphabetically

  return (
    <>
      <div className="w-full p-2">
        <nav>
          <Link to="/" className="mr-2 text-red-300 hover:text-red-500">
            Dashboard /
          </Link>
          <Link
            to="/ChapterList"
            className="mr-2 text-red-300 hover:text-red-500"
          >
            {" "}
            Chapters /
          </Link>
          <span className="font-semibold text-red-500"> InsertChapter</span>
        </nav>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Create Chapter</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Country
            </label>
            <Autocomplete
              options={countryData}
              getOptionLabel={(option) => option.name}
              value={country}
              onChange={(event, newValue) => setCountry(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Country"
                  className="w-1/2"
                  required
                />
              )}
            />
          </div>
          {
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">City</label>
              <Autocomplete
                options={filteredCities}
                value={city}
                onChange={handleCityInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select City"
                    className="w-1/2"
                    required
                  />
                )}
              />
            </div>
          }
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Chapter name
            </label>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-1/2"
              required
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateChapter;
