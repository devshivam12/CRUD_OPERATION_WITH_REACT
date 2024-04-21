import React from 'react'
import Searching from './Searching'
import AddCountry from './AddCountry'
import StatusSorting from './StatusSorting'

const SideBar = ({ getData, setGetData, setShowAll, setShowTrue, showTrue, searchItem, setSearchItem }) => {

  return (
    <div>
      <div className='flex items-center justify-center mt-10'>
        <AddCountry getData={getData} setGetData={setGetData}/>
      </div>
      <div>
        <Searching searchItem={searchItem} setSearchItem={setSearchItem} />
      </div>
      <div>
        <StatusSorting setShowAll={setShowAll} setShowTrue={setShowTrue} showTrue={showTrue} />
      </div>
    </div>
  )
}

export default SideBar