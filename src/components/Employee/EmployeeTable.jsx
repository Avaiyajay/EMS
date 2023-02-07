import React, { useEffect } from "react";

const EmployeeTable = ({ employeeTableProps: { setShowTable, employeeList, deleteEmployee, setEdit } }) => {
  return (
    <>
      <div className="w-75">
        <div className="d-flex justify-content-end px-0 py-3">
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
