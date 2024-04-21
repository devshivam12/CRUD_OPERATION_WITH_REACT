import axios from "axios";
import React, { useEffect, useState } from "react";

import SideBar from "../components/SideBar";
import MainData from "../components/MainData";


const Home = ({ getData, setGetData }) => {
  const [showTrue, setShowTrue] = useState(true);
  const [showAll , setShowAll] = useState(false)
  const [searchItem, setSearchItem] = useState("");

  const filterData = getData.filter((item)=> {
    return item.country_name.toLowerCase().includes(searchItem.toLowerCase())
  })

  return (
    <div className="flex flex-1 justify-center  min-h-screen">

      <div className="w-1/4 border-r-2 h-screen flex flex-col">
        <SideBar searchItem={searchItem} setSearchItem={setSearchItem} getData={getData} setGetData={setGetData} setShowTrue={setShowTrue} showTrue={showTrue} setShowAll={setShowAll}/>
      </div>
      <div className="w-3/4 m-10">
        <MainData
          getData={filterData}
          setGetData={setGetData}
          showTrue={showTrue}
          showAll={showAll}
        />
      </div>

    </div>
  );
};

export default Home;
