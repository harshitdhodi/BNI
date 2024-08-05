import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchDepartments();
  }, [pageIndex]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `/api/department/getDepartment?page=${pageIndex + 1}`
      );
      const dataWithIds = response.data.data.map((department, index) => ({
        ...department,
        id: pageIndex * pageSize + index + 1,
      }));
      setDepartments(dataWithIds);
      setPageCount(Math.ceil(response.data.total / pageSize));
    } catch (error) {
      console.error("There was an error fetching the departments!", error);
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
      await axios.delete(`/api/department/deleteDepartmentById?id=${id}`);
      fetchDepartments();
    } catch (error) {
      console.error("There was an error deleting the department!", error);
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <div className="lg:flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-3 sm:ml-2">Department List</h1>
        <button className="px-4 py-2 mt-3 bg-[#CF2030] text-white rounded transition duration-300">
          <Link to="/createDepartment">Add New Department</Link>
        </button>
      </div>

      <table className="w-full mt-4 border-collapse shadow-lg overflow-x-scroll">
        <thead>
          <tr className="bg-[#CF2030] text-white text-left uppercase font-serif text-[14px]">
            <th className="py-2 px-6 ">ID</th>
            <th className="py-2 px-6 ">Department Name</th>
            <th className="py-2 px-6 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr
              key={department._id}
              className="bg-gray-50 border-b border-gray-300 hover:bg-gray-100 transition duration-150"
            >
              <td className="py-2 px-6">{department.id}</td>
              <td className="py-2 px-6">{department.name}</td>
              <td className="py-2 px-4">
                <div className="flex py-1 px-4 items-center space-x-2">
                  <button>
                    <Link to={`/editdepartment/${department._id}`}>
                      <FaEdit className="text-blue-500 text-lg" />
                    </Link>
                  </button>
                  <button onClick={() => handleDelete(department._id)}>
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
          className="px-3 py-1 bg-[#CF2030] text-white flex justify-center rounded transition"
        >
          {"<"}
        </button>
        <button
          onClick={handleNextPage}
          disabled={pageIndex + 1 >= pageCount}
          className="px-3 py-1 bg-[#CF2030] text-white rounded transition"
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

export default DepartmentList;
