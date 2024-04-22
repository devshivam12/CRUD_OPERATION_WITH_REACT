import React, { useState } from 'react'
import AddCountryForm from './AddCountryForm'

const AddCountry = ({ getData, setGetData }) => {
    const [isModelOpen, setIsModelOpen] = useState(false)

    const openModel = () => {
        setIsModelOpen(true)
    }
    const closeModel = () => {
        setIsModelOpen(false)
    }
    return (
        <div>
            <button
                onClick={openModel}
                className='py-2 px-6 border border-slate-500 rounded-lg hover:bg-yellow-400 hover:outline-none hover:border-0 hover:text-white'>Add Country
            </button>

            {isModelOpen && <AddCountryForm getData={getData} setGetData={setGetData} closeModel={closeModel} />}

        </div>
    )
}

export default AddCountry