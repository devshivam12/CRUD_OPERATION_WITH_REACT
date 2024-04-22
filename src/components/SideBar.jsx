import React from 'react'
import AddCountry from './AddCountry'
import StatusSorting from './StatusSorting'

const SideBar = ({ getData, setGetData, setShowTrue, showTrue }) => {

  return (
    <div>
      <div className='flex items-center justify-center mt-10'>
        <AddCountry getData={getData} setGetData={setGetData}/>
      </div>
      
      <div>
        <StatusSorting  setShowTrue={setShowTrue} showTrue={showTrue} />
      </div>
    </div>
  )
}

export default SideBar