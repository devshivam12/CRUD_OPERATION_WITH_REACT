import axios from "axios";
import React, { useEffect, useState } from "react";

import SideBar from "../components/SideBar";
import MainData from "../components/MainData";


const Home = ({ getData, setGetData }) => {
  const [showTrue, setShowTrue] = useState(null);

  const [searchItem, setSearchItem] = useState('');

  const filterData = getData.filter((item) => {
    return item.country_name.toLowerCase().includes(searchItem.toLowerCase())
  })

  return (
    <div className="flex justify-center  min-h-screen">

      <div className="w-1/4 border-r-2 h-screen flex flex-col">
        <SideBar getData={getData} setGetData={setGetData} setShowTrue={setShowTrue} showTrue={showTrue} />
      </div>
      <div className="w-3/4 mx-10">
        <MainData
          getData={filterData}
          setGetData={setGetData}
          showTrue={showTrue}
          searchItem={searchItem}
          setSearchItem={setSearchItem}
        />
      </div>

    </div>
  );
};

export default Home;
