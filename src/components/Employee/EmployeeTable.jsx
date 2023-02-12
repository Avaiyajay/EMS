import React, { useEffect, useState } from "react";

const EmployeeTable = ({ employeeTableProps: { setShowTable, employeeList, deleteEmployee, setEdit } }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const [filterOptions, setFilterOptions] = useState({
    department: [],
    employeeType: [],
    title: [],
  });

  useEffect(() => {
    document.getElementById("filter").style.visibility = "hidden";
  }, []);

  useEffect(() => {
    console.log(filterOptions);
    const { department, employeeType, title } = filterOptions;
    return setFilteredData(() => {
      employeeList?.filter((x) => {
        if (department.includes(x.department) || employeeType.includes(x.employeeType) || title.includes(x.employeeType)) {
          return true;
        }
        return false;
      });
    });
  }, [filterOptions.department, filterOptions.employeeType, filterOptions.title]);

  const onChangeCheckbox = (e, filterName) => {
    if (e.target.checked) {
      setFilterOptions((prevState) => {
        return { ...prevState, [filterName]: [...prevState[filterName], e.target.value] };
      });
    } else {
      setFilterOptions((prevState) => {
        return { ...prevState, [filterName]: prevState[filterName].filter((x) => x !== e.target.value) };
      });
    }
  };

  console.log(filteredData);
  return (
    <>
      <div className="w-75">
        <div className="d-flex justify-content-between px-0 py-3 position-relative">
          <div
            id="filter"
            className="badge text-bg-light border border-dark w-25 top-100 start-0 fs-6 position-absolute"
            style={{ start: "20px" }}
          >
            <div className="position-relative">
              <div
                onClick={(e) => {
                  document.getElementById("filter").style.visibility = "hidden";
                }}
                className="position-absolute top-0 end-0"
              >
                <img style={{ height: "25px", width: "25px" }} src="/images/cancel.png" alt="" />
              </div>
              <div className="relative d-flex gap-2 flex-column align-items-start pt-5">
                <div className="text-dark">
                  <div className="fs-4">Department</div>
                  <div className="d-flex flex-column gap-1 align-items-start py-2 fs-5">
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "department")} value="IT" type="checkbox" name="IT" id="" />
                      <span>&nbsp;&nbsp;IT</span>
                    </label>
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "department")} value="Marketing" type="checkbox" name="Marketing" id="" />
                      <span>&nbsp;&nbsp;Marketing</span>
                    </label>
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "department")} type="checkbox" name="HR" value="HR" id="" />
                      <span>&nbsp;&nbsp;HR</span>
                    </label>
                    <label>
                      <input
                        onChange={(e) => onChangeCheckbox(e, "department")}
                        type="checkbox"
                        name="Engineering"
                        value="Engineering"
                        id=""
                      />
                      <span>&nbsp;&nbsp;Engineering</span>
                    </label>
                  </div>
                </div>
                <div className="text-dark">
                  <div className="fs-4">EmployeeType</div>
                  <div className="d-flex flex-column gap-1 align-items-start py-2 fs-5">
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "employeeType")} type="checkbox" name="FullTime" value="FullTime" id="" />
                      <span>&nbsp;&nbsp;FullTime</span>
                    </label>
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "employeeType")} type="checkbox" name="PartTime" value="PartTime" id="" />
                      <span>&nbsp;&nbsp;PartTime</span>
                    </label>
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "employeeType")} type="checkbox" name="Contract" value="Contract" id="" />
                      <span>&nbsp;&nbsp;Contract</span>
                    </label>
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "employeeType")} type="checkbox" name="Seasonal" value="Seasonal" id="" />
                      <span>&nbsp;&nbsp;Seasonal</span>
                    </label>
                  </div>
                </div>
                <div className="text-dark">
                  <div className="fs-4 text-start">Title</div>
                  <div className="d-flex flex-column gap-1 align-items-start py-2 fs-5">
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "title")} type="checkbox" name="Employee" value="Employee" id="" />
                      <span>&nbsp;&nbsp;Employee</span>
                    </label>
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "title")} type="checkbox" name="Manager" value="Manager" id="" />
                      <span>&nbsp;&nbsp;Manager</span>
                    </label>
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "title")} type="checkbox" name="Director" value="Director" id="" />
                      <span>&nbsp;&nbsp;Director</span>
                    </label>
                    <label>
                      <input onChange={(e) => onChangeCheckbox(e, "title")} type="checkbox" name="VP" value="VP" id="" />
                      <span>&nbsp;&nbsp;VP</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              document.getElementById("filter").style.visibility = "visible";
            }}
            className="badge text-bg-light outline-white border-white fs-6"
          >
            Filter <img style={{ height: "30px", width: "30px" }} className="p-0" src="/images/filter.png" alt="" />
          </button>

          <button onClick={() => setShowTable(false)} className="px-2 py-3 badge text-bg-light outline-white border-white fs-6">
            Add New Employee
          </button>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">Age</th>
              <th scope="col">DateOfJoining</th>
              <th scope="col">Title</th>
              <th scope="col">Department</th>
              <th scope="col">EmployeeType</th>
              <th scope="col">CurrentStatus</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employeeList?.map((employeeDetails) => {
              return (
                <tr key={employeeDetails.id}>
                  <th scope="row">{employeeDetails.id}</th>
                  <td>{employeeDetails.firstName}</td>
                  <td>{employeeDetails.lastName}</td>
                  <td>{employeeDetails.Age}</td>
                  <td>{employeeDetails.dateOfJoining}</td>
                  <td>{employeeDetails.title}</td>
                  <td>{employeeDetails.department}</td>
                  <td>{employeeDetails.employeeType}</td>
                  <td>{employeeDetails.currentStatus}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={() => {
                        setShowTable(false);
                        setEdit({ status: true, employeeId: employeeDetails.id });
                      }}
                    >
                      <img style={{ height: "20px", width: "20px" }} src="/images/edit.png" alt="" />
                    </button>
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => deleteEmployee(employeeDetails.id)}>
                      <img style={{ height: "20px", width: "20px" }} src="/images/delete.png" alt="" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;
