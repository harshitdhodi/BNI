import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import debounce from "lodash/debounce";

const AllGives = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const pageSize = 5;

  // Fetch companies based on search value or page number
  const fetchCompanies = async (searchValue = "", page = 1) => {
    try {
      setIsSearching(!!searchValue);
      const url = searchValue
        ? `http://localhost:3002/myGives/getFilteredGives?companyName=${searchValue}`
        : `http://localhost:3002/myGives/getMyAllGives?page=${page}`;
      const response = await axios.get(url, { withCredentials: true });

      // Debugging: Log the response data
      console.log("API Response:", response.data);

      if (searchValue) {
        // Handle search results
        setFilteredData(response.data.companies || []);
        setCompanies(response.data.companies || []);
        setHasNextPage(false); // Searching does not support pagination
        setTotalPages(1); // Only one page for search results
      } else {
        // Handle paginated results
        setCompanies(response.data.data || []);
        setFilteredData(response.data.data || []);
        setHasNextPage(response.data.hasNextPage || false);
        setTotalPages(Math.ceil(response.data.total / pageSize) || 1);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    // Fetch all data on initial render
    fetchCompanies();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    console.log("Filtered Data:", filteredData);
    console.log("Companies:", companies);
  }, [filteredData, companies]);

  // Debounced search handler
  const debouncedFilterData = debounce((e) => {
    const searchValue = e.target.value;
    setValue(searchValue);
    setCurrentPage(1); // Reset to first page on search
    fetchCompanies(searchValue, 1); // Fetch filtered data
  }, 300);

  // Handle page changes
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchCompanies(value, currentPage + 1); // Fetch data for the next page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchCompanies(value, currentPage - 1); // Fetch data for the previous page
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/myGives/deletemyGivesById?id=${id}`, {
        withCredentials: true,
      });
      fetchCompanies(value, currentPage); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const getItemId = (index) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  return (
    <div className="p-4 ">
      <div className="lg:flex lg:flex-wrap lg:justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-3 ml-2">Give List</h1>
        <div className="lg:flex" >
          <input
            type="text"
            onChange={debouncedFilterData}
            placeholder="Search Company..."
            className="p-2 mr-3 mt-3 border border-gray-300 rounded w-full "
          />
       <div className="flex gap-2">
       <button className="px-4 w-1/2 lg:w-[200px] py-1 mt-3 bg-[#CF2030] text-white rounded hover:bg-red-600 transition duration-300">
            <Link to="/addGivesbyEmail">Add Members Gives</Link>
          </button>
          <button className="px-4 py-2 w-1/2 lg:w-[200px]  mt-3 bg-[#0fc29e] text-white rounded hover:bg-slate-900 transition duration-300">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="btn btn-success"
              table="table-to-xls"
              filename="give_list"
              sheet="give_list"
              buttonText="Export to Excel"
            />
          </button>
       </div>
        </div>
      </div>
<div className="overflow-x-scroll">
  
<table
        id="table-to-xls"
        className="w-full mt-4 border-collapse shadow-lg overflow-x-auto"
      >
        <thead>
          <tr className="bg-[#CF2030] text-white text-left uppercase font-serif text-[14px]">
            <th className="py-2 px-6">ID</th>
            <th className="py-2 px-6">Company Name</th>
            <th className="py-2 px-6">Email</th>
            <th className="py-2 px-6">URL</th>
            <th className="py-2 px-6">Phone</th>
            <th className="py-2 px-6">Department</th>
            <th className="py-2 px-6">Actions</th>
          </tr>
        </thead>
        <tbody className="overflow-x-auto">
          {filteredData.length > 0 ? (
            filteredData.map((company, index) => (
              <tr
                key={company._id}
                className="bg-gray-50 border-b border-gray-300 hover:bg-gray-100 transition duration-150"
              >
                <td className="py-2 px-6">{getItemId(index)}</td>
                <td className="py-2 px-6">{company.companyName}</td>
                <td className="py-2 px-6">{company.email}</td>
                <td className="py-2 px-6">
                  <a
                    href={company.webURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {company.webURL}
                  </a>
                </td>
                <td className="py-2 px-6">{company.phoneNumber}</td>
                <td className="py-2 px-6">{company.dept}</td>
                <td className="py-2 px-6 flex space-x-2">
                  <button>
                    <Link to={`/editAllMyGives/${company._id}`}>
                      <FaEdit className="text-blue-500 text-lg" />
                    </Link>
                  </button>
                  <button onClick={() => handleDelete(company._id)}>
                    <FaTrashAlt className="text-red-500 text-lg" />
                  </button>
                  {/* <button
                    onClick={() => {
                      setModalData(company);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#0fc29e] text-white rounded hover:bg-slate-900 transition duration-300"
                  >
                    View
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-2 px-6 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
</div>

      {!isSearching && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-[#CF2030] text-white rounded hover:bg-slate-900 transition"
          >
            {"<"}
          </button>
          <button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className="px-3 py-1 bg-[#CF2030] text-white rounded hover:bg-slate-900 transition"
          >
            {">"}
          </button>
          <span>
            Page{" "}
            <strong>
              {currentPage} of {totalPages}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default AllGives;
