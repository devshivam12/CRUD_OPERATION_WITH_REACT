import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditedModel from './components/EditedModel'
function App() {

  const [getData, setGetData] = useState([]);


  const fetchGetData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/countries/");
      setGetData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchGetData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home getData={getData} setGetData={setGetData} />}/>
        <Route path='/update/:Country_id' element={<EditedModel />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
