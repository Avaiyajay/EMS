import React, { useState } from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import EmplyoeeCreate from "./EmplyoeeCreate";

const Employee = () => {
  const [showTable, setShowTable] = useState(true);
  const [edit, setEdit] = useState({
    status: false,
    employeeId: "",
  });
  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = (employeeData) => {
    // call the api here and if you get success response then do below step
    setEmployeeList((prevData) => {
      return [...prevData, { ...employeeData, id: prevData.length + 1 }];
    });
  };

  const editEmployee = (employeeData) => {
    setEdit(() => ({ ...edit, status: false }));
    setEmployeeList((prevEmployeeList) => {
      return prevEmployeeList.map((x) => {
        if (x.id === employeeData.id) return { ...employeeData };
        return x;
      });
    });
  };

  const deleteEmployee = (id) => {
    // call the api here and if you get success response then do below step
    setEmployeeList(employeeList.filter((x) => x.id !== id));
  };

  const employeeTableProps = {
    setShowTable,
    employeeList,
    setEdit,
    deleteEmployee,
  };

  const employeeCreateProps = {
    setShowTable,
    addEmployee,
    editSwitch: edit.status,
  };

  const employeeEditProps = {
    setShowTable,
    editEmployee,
    editSwitch: edit.status,
    selectedEmployeeData: employeeList.filter((x) => x.id === edit.employeeId)[0],
  };

  console.log(edit);

  return (
    <>
      <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
        {showTable ? (
          <>
            <EmployeeSearch />
            <EmployeeTable employeeTableProps={employeeTableProps} />
          </>
        ) : !edit.status ? (
          <EmplyoeeCreate employeeCreateProps={employeeCreateProps} />
        ) : (
          // this is for editing employee (we are resuing create employee component, but with edit props)
          <EmplyoeeCreate employeeCreateProps={employeeEditProps} />
        )}
      </div>
    </>
  );
};

export default Employee;
