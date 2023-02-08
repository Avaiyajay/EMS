import React from "react";

const EmployeeSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <div className="d-flex pt-5 w-50 m-auto justify-content-center">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-50 outline-none"
          class="form-control"
          style={{ padding: "1em 1em" }}
          type="text"
          placeholder="Search by firstName or lastName"
        />
      </div>
    </>
  );
};

export default EmployeeSearch;
