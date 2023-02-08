import React, { useEffect, useState } from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import EmplyoeeCreate from "./EmplyoeeCreate";

const Employee = () => {
  const [showTable, setShowTable] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [edit, setEdit] = useState({
    status: false,
    employeeId: "",
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setSearchResult(
      employeeList.filter((x) => {
        if (x.firstName.includes(searchQuery) || x.lastName.includes(searchQuery)) {
          return x;
        }
      })
    );
  }, [searchQuery]);

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
    employeeList: searchQuery !== "" ? searchResult : employeeList,
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

  return (
    <>
      <EmployeeSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} className="pb-5" />
      <div className="w-100 pt-5 d-flex flex-column justify-content-center align-items-center">
        {showTable ? (
          <>
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
