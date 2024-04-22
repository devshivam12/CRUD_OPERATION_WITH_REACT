import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const EditedModel = () => {
  const { Country_id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [coutnryData, setCountryData] = useState(null)

  useEffect(() => {
    console.log("Country_id:", Country_id); 
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/countries/${Country_id}`);
        const { country_name, country_code, description, logo_url, status } = response.data;
        setValue('country_name', country_name);
        setValue('country_code', country_code);
        setValue('description', description);
        setValue('logo_url', logo_url);
        setValue('status', status);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [Country_id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/v1/up/${Country_id}/`, data);
      alert("Successfully data updated");
      navigate('/');
      setCountryData(data)
    } catch (error) {
      console.log(error);
    }
  };

    const closeUpdateButton = () =>{
      navigate('/')
    }
  return (
    <div className='z-40 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <div className='bg-white p-8 w-96 rounded-md'>
        <form className=' space-y-3' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register('country_name')}
              className='block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              type="text"
              placeholder='Enter your country name'
            />
          </div>

          <div>
            <input
              {...register('country_code')}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder='Enter your country code'
            />
          </div>

          <div>
            <textarea
              {...register('description')}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              name='description'
              placeholder='Enter your country description'
              rows={3}
            />
          </div>

          <div>
            <input
              {...register('logo_url')}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder='Enter the country url'
            />
          </div>

          <div className='border py-1 border-red-400 text-center'>
            <p className='w-full font-light text-sm'> https://flagsapi.com/Your Country Code/flat/64.png</p>
          </div>

          <div>
            <label className="flex items-center">
              <input
                {...register('status')}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500 cursor-pointer"
              />
              <span className="ml-2 text-gray-700">Active</span>
            </label>
          </div>

          <div className='flex items-center justify-center'>
            <button
              type="submit"
              className='py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-md'
            >
              Submit
            </button>

            <button
            onClick={closeUpdateButton}
              type="button"
              className='py-2 px-5 ml-5 bg-blue-500 hover:bg-blue-600 text-white rounded-md'
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditedModel;
