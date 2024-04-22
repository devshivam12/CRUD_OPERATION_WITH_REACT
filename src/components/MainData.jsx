import React, { useState } from "react";
import ViewModelPopup from "./ViewModelPopup";
import axios from "axios";
import { Link } from "react-router-dom";
import Searching from "./Searching";

const MainData = ({ searchItem, setSearchItem, getData, setGetData, showTrue }) => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);

  let filteredByStatus = getData;
  if (showTrue !== null) {
   filteredByStatus = getData.filter((country)=> country.status === showTrue)
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredByStatus.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredByStatus.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleView = (country) => {
    setSelectedCountry(country);
    setIsModelOpen(true);
  };

  const handleClose = () => {
    setSelectedCountry(null);
    setIsModelOpen(false);
  };

  const handleDelete = (Country_id) => {
    try {
      if (window.confirm("Are you sure you want to delete this country?")) {
        axios.delete(`http://127.0.0.1:8000/api/v1/countries/${Country_id}`).then(() => {
          const updatedData = getData.filter((country) => country.Country_id !== Country_id);
          setGetData(updatedData);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <div className='mr-10'>
          <Searching searchItem={searchItem} setSearchItem={setSearchItem} />
        </div>
        <div className="">
          <label htmlFor="itemsPerPage" className="mr-1">
            Items Per Page :{" "}
          </label>
          <select
            className="border py-1 px-4 place-items-center"
            id="itemsPerPage"
            onChange={handleItemsPerPage}
            value={itemsPerPage}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>

      </div>
      <table className="table-fixed w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="w-1/6 py-2 px-4 border border-gray-300">Logo</th>
            <th className="w-1/6 py-2 px-4 border border-gray-300">Code</th>
            <th className="w-2/6 py-2 px-4 border border-gray-300">Name</th>
            <th className="w-2/6 py-2 px-4 border border-gray-300">Description</th>
            <th className="w-2/6 py-2 px-4 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((country, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border border-gray-300 text-center">
                <img src={country.logo_url} alt={country.country_name} className="w-16 h-16 rounded-full mx-auto" />
              </td>
              <td className="py-2 px-4 border border-gray-300 text-center">{country.country_code}</td>
              <td className="py-2 px-4 border border-gray-300">{country.country_name}</td>
              <td className="py-2 px-4 border border-gray-300">{country.description}</td>
              <td className="py-2 px-4 border border-gray-300">
                <button
                  onClick={() => handleView(country)}
                  className="border cursor-pointer border-slate-400 py-1 px-2 rounded-md mr-2 hover:bg-blue-800 hover:border-none hover:text-white"
                >
                  View
                </button>
                <Link to={`/update/${country.Country_id}`}>
                  <button className="border cursor-pointer border-slate-400 py-1 px-2 rounded-md mr-2 hover:bg-green-800 hover:border-none hover:text-white">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(country.Country_id)}
                  className="border border-slate-400 cursor-pointer py-1 px-2 rounded-md hover:bg-red-800  hover:border-none hover:text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-center my-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i + 1)}
            className={`mx-1 px-3 py-1 rounded-sm border ${currentPage === i + 1 ? "bg-gray-800 text-white" : "border-slate-800"
              } hover:bg-gray-300`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <ViewModelPopup Close={handleClose} country={selectedCountry} isOpen={isModelOpen} />
    </div>
  );
};

export default MainData;
