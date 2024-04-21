import React, { useState } from "react";
import ViewModelPopup from "./ViewModelPopup";
import axios from "axios";
import { Link } from "react-router-dom";

const MainData = ({ getData, setGetData, showTrue, showAll }) => {

  const itemsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContry, setSelectedCountry] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);

  let filterdByStatus = getData;
  if (!showAll) {

    filterdByStatus = showTrue ? getData.filter(country => country.status === true) : getData.filter(country => country.status === false);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterdByStatus.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filterdByStatus.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleView = (country) => {
    setSelectedCountry(country)
    setIsModelOpen(true)
  }

  const handlClose = () => {
    setSelectedCountry(null);
    setIsModelOpen(false)
  }

  const handleDelete = (Country_id) => {
    try {
      if (window.confirm("Are you sure you want to delete this country")) {
        axios.delete(`http://127.0.0.1:8000/api/v1/countries/${Country_id}`).then(() => {

          const updateData = getData.filter(country => country.Country_id !== Country_id);
          setGetData(updateData)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="grid grid-cols-3 gap-4">

        {currentItems.map((country, index) => (
          <div
            key={index}
            className="border shadow-lg px-10 rounded-lg m-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <img
                  src={country.logo_url}
                  alt={country.country_name}
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <p className=" font-normal text-center text-xl">
                {country.country_code}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-center font-normal text-2xl">
                {country.country_name}
              </p>
              <div className="m-3 w-full ">
                <p className="font-semibold italic text-center">
                  {country.description}
                </p>
              </div>
              <div className="flex items-center justify-center mt-10 mb-5 cursor-pointer">
                <button
                  onClick={() => handleView(country)}
                  className="border cursor-pointer border-slate-400 py-2 px-6 rounded-md mr-4 hover:bg-blue-800 hover:border-none hover:text-white">
                  View
                </button>
                <Link to={`/update/${country.Country_id}`}>
                  <button className="border cursor-pointer border-slate-400 py-2 px-6 rounded-md mr-4 hover:bg-green-800 hover:border-none hover:text-white">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(country.Country_id)}
                  className="border border-slate-400 cursor-pointer py-2 px-6 rounded-md hover:bg-red-800  hover:border-none hover:text-white">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}



        <ViewModelPopup
          Close={handlClose}
          country={selectedContry}
          isOpen={isModelOpen} />
      </div>
      <div className=" flex items-center justify-center mt-4">

        {Array.from({ length: totalPages }, (_, i) => (

          <button
            key={i}
            onClick={() => handleClick(i + 1)}
            className={`mx-1 px-3 py-1 rounded-sm border ${currentPage === i + 1
              ? "bg-gray-800 text-white"
              : "border-slate-800"
              } hover:bg-gray-300`}
          >
            {i + 1}
          </button>

        ))}
      </div>
    </>
  );
};

export default MainData;
