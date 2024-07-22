import React, { useEffect, useState } from "react";
import axios from "axios";
// import LineChart from "./LineChart";
// import DownloadCSV from "./ImportExportData/JsonToCsv";
import { GrChapterAdd } from "react-icons/gr";
import PieChart from "./member/Piechart";
import BarChart from "./member/Barchart";
import { FaAddressBook, FaDatabase, FaUser } from "react-icons/fa";
import { FaFlag, FaTreeCity } from "react-icons/fa6";
const Dashboard = () => {
  const [chapter, setchapter] = useState(0);
  const [city, setcity] = useState(0);
  const [country, setcountry] = useState(0);
  const [department, setdepartment] = useState(0);
  const [customer, setcustomer] = useState(0);
  const [asks, setAsks] = useState(0);
  const [gives, setGives] = useState(0);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const TotalAsks = await axios.get(
          "https://bni-backend-w2c1.onrender.com/myAsk/getTotalAsks",
          {
            withCredentials: true,
          }
        );
     
        setAsks(TotalAsks.data.TotalMyAsks);

        const TotalGives = await axios.get(
          "https://bni-backend-w2c1.onrender.com/myGives/totalGives",
          {
            withCredentials: true,
          }
        );
     console.log(TotalGives.data)
        setGives(TotalGives.data.total);

        const TotalChapter = await axios.get(
          "https://bni-backend-w2c1.onrender.com/chapter/totalchapter",
          {
            withCredentials: true,
          }
        );
        // console.log(TotalChapter.data)
        setchapter(TotalChapter.data.TotalChapters);

        const TotalCity = await axios.get(
          "https://bni-backend-w2c1.onrender.com/city/totalCity",
          {
            withCredentials: true,
          }
        );
        // console.log(TotalCity.data)
        setcity(TotalCity.data.TotalCitys);

        const TotalCountry = await axios.get(
          "https://bni-backend-w2c1.onrender.com/country/totalCountry",
          {
            withCredentials: true,
          }
        );
        // console.log(TotalCountry)
        setcountry(TotalCountry.data.TotalCountries);

        const TotalDepartment = await axios.get(
          "https://bni-backend-w2c1.onrender.com/department/totalDepartment",
          {
            withCredentials: true,
          }
        );
        setdepartment(TotalDepartment.data.TotalDepartments);
        console.log(TotalDepartment.data);

        const TotalCustomer = await axios.get(
          "https://bni-backend-w2c1.onrender.com/member/totalmember",
          {
            withCredentials: true,
          }
        );
        setcustomer(TotalCustomer.data.Totalmembers);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <div className="gap-3 mx-4 my-5 grid place-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-3 mr-6 ">
      <div className="lg:w-full w-[80%]  h-[150px] bg-blue-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <GrChapterAdd />
            </span>
            <p className="text-white font-bold text-lg">Asks</p>
          </div>

          <span className=" font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-blue-500">
            {asks}
          </span>
        </div>

        <div className="lg:w-full w-[80%]  h-[150px] bg-blue-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <GrChapterAdd />
            </span>
            <p className="text-white font-bold text-lg">Gives</p>
          </div>

          <span className=" font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-blue-500">
            {gives}
          </span>
        </div>
        <div className="lg:w-full w-[80%]  h-[150px] bg-blue-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <GrChapterAdd />
            </span>
            <p className="text-white font-bold text-lg">Chapter</p>
          </div>

          <span className=" font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-blue-500">
            {chapter}
          </span>
        </div>
        <div className="lg:w-full w-[80%] h-[150px] bg-green-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <FaTreeCity />
            </span>
            <p className="text-white font-bold text-lg">Cities</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-green-500">
            {city}
          </span>
        </div>
        <div className="lg:w-full w-[80%] h-[150px] bg-red-500 rounded-md flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-xl">
              <FaFlag />
            </span>
            <p className="text-white font-bold text-lg">Countries</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-red-500">
            {country}
          </span>
        </div>
        <div className="lg:w-full w-[80%] h-[150px] rounded-md bg-yellow-500 flex flex-col items-center justify-center">
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
        <div className="lg:w-full w-[80%] h-[150px] rounded-md bg-purple-500 flex flex-col items-center justify-center">
          <div className="flex justify-center items-center gap-2">
            <span className="text-white font-bold text-lg">
              <FaUser />{" "}
            </span>
            <p className="text-white font-bold text-lg">Member</p>
          </div>
          <span className="font-bold border-2 text-xl p-1 px-4 rounded-md mt-2 bg-white text-purple-500">
            {customer}
          </span>
        </div>
      </div>

      <div className="flex gap-16">
      <PieChart className='w-1/2' />
      <BarChart className='' />
      </div>
    </>
  );
};

export default Dashboard;
