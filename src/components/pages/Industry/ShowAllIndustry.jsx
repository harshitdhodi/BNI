import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const industryList = () => {
  const [industrys, setindustrys] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchindustrys();
  }, [pageIndex]);

  const fetchindustrys = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/industry/getIndustries?page=${pageIndex + 1}`
      );
      const dataWithIds = response.data.data.map((industry, index) => ({
        ...industry,
        id: pageIndex * pageSize + index + 1,
      }));
      setindustrys(dataWithIds);
      setPageCount(Math.ceil(response.data.total / pageSize));
    } catch (error) {
      console.error("There was an error fetching the industrys!", error);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < pageCount - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3002/industry/deleteIndustry?id=${id}`
      );
      fetchindustrys();
    } catch (error) {
      console.error("There was an error deleting the industry!", error);
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-3 ml-2">Industry List</h1>
        <button className="px-4 py-2 mt-3 bg-[#CF2030] text-white rounded  transition duration-300">
          <Link to="/addIndustry">Add New Industry</Link>
        </button>
      </div>

      <table className="w-full mt-4 border-collapse shadow-lg overflow-x-scroll">
        <thead>
          <tr className="bg-[#CF2030] text-white text-left uppercase font-serif text-[14px]">
            <th className="py-2 px-6 ">ID</th>
            <th className="py-2 px-6 ">Industry Name</th>
            <th className="py-2 px-6 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {industrys.map((industry) => (
            <tr
              key={industry._id}
              className="bg-gray-50 border-b border-gray-300 hover:bg-gray-100 transition duration-150"
            >
              <td className="py-2 px-6">{industry.id}</td>
              <td className="py-2 px-6">{industry.name}</td>
              <td className="py-2 px-4">
                <div className="flex py-1 px-4 items-center space-x-2">
                  <button>
                    <Link to={`/editIndustry/${industry._id}`}>
                      <FaEdit className="text-blue-500 text-lg" />
                    </Link>
                  </button>
                  <button onClick={() => handleDelete(industry._id)}>
                    <FaTrashAlt className="text-red-500 text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={pageIndex === 0}
          className="px-3 py-1 bg-[#CF2030] text-white flex justify-center rounded  transition"
        >
          {"<"}
        </button>
        <button
          onClick={handleNextPage}
          disabled={pageIndex + 1 >= pageCount}
          className="px-3 py-1 bg-[#CF2030] text-white rounded  transition"
        >
          {">"}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>
      </div>
    </div>
  );
};

export default industryList; // Ensure this is a default export
