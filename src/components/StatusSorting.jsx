import React from 'react';

const StatusSorting = ({ setShowTrue, showTrue}) => {

  const handleToggle = () => {
    setShowTrue(!showTrue);
  };


  return (
    <div className="mt-10">
      <div className="flex justify-center items-center">
        <div className="mr-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              checked={showTrue === true}
              onChange={handleToggle}
            />
            <span className="ml-2">Active</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              checked={showTrue === false}
              onChange={handleToggle}
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
      </div>


    </div>
  );
};

export default StatusSorting;
