import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditedModel = ({ onClose, country, onSubmit }) => {

  const { Country_id } = useParams();
  const  navigate  = useNavigate()
  const [updateData, setUpdateData] = useState({
    country_name: "",
    country_code: "",
    description: "",
    logo_url: "",
    status: ""
  })


  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const fetchData = () => {
      try {
        axios.get(`http://127.0.0.1:8000/api/v1/countries/${Country_id}`).then((response) => {
          setUpdateData(response.data)
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [Country_id])


  const handleUpdateData = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/v1/up/${Country_id}/`, updateData)
      setUpdateData(response.data)
      alert("Successfully data updated")
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='z-40 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 '>
      <div className='bg-white p-8 w-96 rounded-md'>

        <form className=' space-y-3' action="#" method='post'>
          <div>
            <input
              className='block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"'
              type="text"
              name='country_name'
              placeholder='Enter your country name'
              value={updateData.country_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              name='country_code'
              placeholder='Enter your country code'
              value={updateData.country_code}
              onChange={handleChange}
            />
          </div>

          <div>
            <textarea
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              name='description'
              placeholder='Enter your country description'
              value={updateData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div>
            <input
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              name='logo_url'
              placeholder='Enter the country url'
              value={updateData.logo_url}
              onChange={handleChange}
            />
          </div>

          <div className='border py-1 border-red-400 text-center'>
            <p className='w-full font-light text-sm'> https://flagsapi.com/Your Country Code/flat/64.png</p>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name='status'
                checked={updateData.status}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-500 cursor-pointer"
              />
              <span className="ml-2 text-gray-700">Active</span>
            </label>
          </div>



          <div >
            <button
              className='py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-md'
              onClick={handleUpdateData}>Submit</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditedModel