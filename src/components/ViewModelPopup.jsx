import React from 'react'

const ViewModelPopup = ({ Close, isOpen, country }) => {
    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 '>
            <div className='bg-white p-8 w-96 rounded-md'>
                <div className='flex items-center '>
                    <img src={country.logo_url} alt={country.country_name} className='mr-4' />
                    <h2 className='text-2xl mb-6'>{country.country_name}</h2>
                </div>
                <p className='text-lg mb-4 '>Country code : {country.country_code}</p>
                <p className='italic mb-4'>{country.description}</p>
                <button
                    onClick={Close}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Close</button>
            </div>
        </div>
    )
}

export default ViewModelPopup