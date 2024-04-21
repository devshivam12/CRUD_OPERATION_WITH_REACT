import React from 'react';

const StatusSorting = ({ setShowTrue, showTrue, setShowAll }) => {

  const handleToggle = () => {
    setShowTrue(!showTrue);
  };

  const handleShowAll = (e) => {
    setShowAll(e.target.checked);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center items-center">
        <div className="mr-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              checked={showTrue}
              onChange={() => setShowTrue(true)}
            />
            <span className="ml-2">True</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              checked={!showTrue}
              onChange={() => setShowTrue(false)}
            />
            <span className="ml-2">False</span>
          </label>
        </div>
      </div>
     
      <div className="flex justify-center mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            onChange={handleShowAll}
          />
          <span className="ml-2">Show All</span>
        </label>
      </div>
    </div>
  );
};

export default StatusSorting;
