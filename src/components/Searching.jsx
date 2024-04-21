import React, { useState } from 'react'

const Searching = ({ searhItem, setSearchItem }) => {

   
    return (
        <div className='flex items-center justify-center my-10'>
            <input 
            className='py-2 px-7 border border-slate-800 rounded-md font-normal text-lg'
            type="text" 
            placeholder='Search Country Name' 
            value={searhItem} 
            onChange={(e) => setSearchItem(e.target.value)} />
        </div>
    )
}

export default Searching