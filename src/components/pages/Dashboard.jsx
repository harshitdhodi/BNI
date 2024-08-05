import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrChapterAdd } from "react-icons/gr";
import { FaAddressBook, FaDatabase, FaUser } from "react-icons/fa";
import { FaFlag, FaTreeCity } from "react-icons/fa6";
import PieChart from "./member/Piechart";

const Dashboard = () => {
  const [chapter, setChapter] = useState(0);
  const [city, setCity] = useState(0);
  const [country, setCountry] = useState(0);
  const [department, setDepartment] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [asks, setAsks] = useState(0);
  const [gives, setGives] = useState(0);
  const [business, setBusiness] = useState(0);
  const [company, setCompany] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const TotalAsks = await axios.get("/api/myAsk/getTotalAsks", {
          withCredentials: true,
        });
        setAsks(TotalAsks.data.TotalMyAsks);

        const TotalGives = await axios.get("/api/myGives/totalGives", {
          withCredentials: true,
        });
        setGives(TotalGives.data.total);

        const TotalCompany = await axios.get("/api/company/totalCompany", {
          withCredentials: true,
        });
        setCompany(TotalCompany.data.TotalCompany);

        const TotalBusiness = await axios.get("/api/business/totalbusiness", {
          withCredentials: true,
        });
        setBusiness(TotalBusiness.data.Totalbusiness);

        const TotalChapter = await axios.get("/api/chapter/totalchapter", {
          withCredentials: true,
        });
        setChapter(TotalChapter.data.TotalChapters);

        const TotalCity = await axios.get("/api/city/totalCity", {
          withCredentials: true,
        });
        setCity(TotalCity.data.TotalCitys);

        const TotalCountry = await axios.get("/api/country/totalCountry", {
          withCredentials: true,
        });
        setCountry(TotalCountry.data.TotalCountries);

        const TotalDepartment = await axios.get("/api/department/totalDepartment", {
          withCredentials: true,
        });
        setDepartment(TotalDepartment.data.TotalDepartments);

        const TotalCustomer = await axios.get("/api/member/totalmember", {
          withCredentials: true,
        });
        setCustomer(TotalCustomer.data.Totalmembers);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <div className="gap-3 mx-4 my-5 grid place-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-3 mr-6">
        <div className="lg:w-full w-[80%] h-[150px] bg-rose-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <FaAddressBook />
            </span>
            <p className="text-white font-bold text-lg">Asks</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-rose-500">
            {asks}
          </span>
        </div>

        <div className="lg:w-full w-[80%] h-[150px] bg-lime-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <FaDatabase />
            </span>
            <p className="text-white font-bold text-lg">Gives</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-lime-500">
            {gives}
          </span>
        </div>

        <div className="lg:w-full w-[80%] h-[150px] bg-teal-600 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <FaTreeCity />
            </span>
            <p className="text-white font-bold text-lg">Companies</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-teal-600">
            {company}
          </span>
        </div>

        <div className="lg:w-full w-[80%] h-[150px] bg-sky-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <FaTreeCity />
            </span>
            <p className="text-white font-bold text-lg">Business</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-sky-500">
            {business}
          </span>
        </div>

        <div className="lg:w-full w-[80%] h-[150px] bg-emerald-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <GrChapterAdd />
            </span>
            <p className="text-white font-bold text-lg">Chapter</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-emerald-500">
            {chapter}
          </span>
        </div>

        <div className="lg:w-full w-[80%] h-[150px] bg-green-600 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <FaTreeCity />
            </span>
            <p className="text-white font-bold text-lg">Cities</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-green-600">
            {city}
          </span>
        </div>

        <div className="lg:w-full w-[80%] h-[150px] bg-fuchsia-600 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <FaFlag />
            </span>
            <p className="text-white font-bold text-lg">Countries</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-fuchsia-600">
            {country}
          </span>
        </div>

        <div className="lg:w-full w-[80%] h-[150px] bg-yellow-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <FaAddressBook />
            </span>
            <p className="text-white font-bold text-lg">Department</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-yellow-500">
            {department}
          </span>
        </div>

        <div className="lg:w-full w-[80%] h-[150px] bg-red-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-lg">
              <FaUser />
            </span>
            <p className="text-white font-bold text-lg">Member</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-red-500">
            {customer}
          </span>
        </div>
      </div>

      <div className="lg:flex text-center justify-center shadow-lg bg-white lg:p-8 m-4 mr-7  rounded-lg">
        <PieChart className="w-1/2" />
      </div>
    </>
  );
};

export default Dashboard;
