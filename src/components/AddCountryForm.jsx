



import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const AddCountryForm = ({ getData, setGetData, closeModel }) => {
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const existingCountry = getData.find(country => country.country_name.toLowerCase() === data.country_name.toLowerCase());
        if (existingCountry) {
            setError("Country already exists!");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/cc/", data);
            alert("Country added successfully");
            console.log("Country added successfully:", response);

            setGetData([...getData, response.data])

            closeModel();
        } catch (error) {
            console.error("Error adding country:", error);
        }
    };

    return (
        <div className='z-40 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 '>
            <div className='bg-white p-8 w-96 rounded-md'>
                <FaTimes size={20} onClick={closeModel} className='mb-2 cursor-pointer float-right ' />
                <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            className='block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                            type="text"
                            name='country_name'
                            placeholder='Enter your country name'
                            {...register('country_name', { required: true })}
                        />
                        {errors.country_name && <span className="text-red-400">This field is required</span>}
                    </div>

                    <div>
                        <input
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            name='country_code'
                            placeholder='Enter your country code'
                            {...register('country_code', { required: true })}
                        />
                        {errors.country_code && <span className="text-red-400">This field is required</span>}
                    </div>

                    <div>
                        <textarea
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            name='description'
                            placeholder='Enter your country description'
                            {...register('description', { required: true })}
                            rows={3}
                        />
                        {errors.description && <span className="text-red-400">This field is required</span>}
                    </div>

                    <div>
                        <input
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            name='logo_url'
                            placeholder='Enter the country url'
                            {...register('logo_url', { required: true })}
                        />
                        {errors.logo_url && <span className="text-red-400">This field is required</span>}
                    </div>

                    <div className='border py-1 border-red-400 text-center'>
                        <p className='w-full font-light text-sm'> https://flagsapi.com/Your Country Code/flat/64.png</p>
                    </div>

                    <div className='flex items-center'>
                        <h2 className='mr-5 font-light'>Select by status : </h2>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                {...register('status')}
                                className="form-checkbox h-5 w-5 text-blue-500 cursor-pointer"
                            />
                            <span className="ml-2 text-gray-700">Status</span>
                        </label>
                    </div>

                    {error && <div className="text-red-500">{error}</div>}

                    <div >
                        <button
                            className='py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-md'
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddCountryForm;
