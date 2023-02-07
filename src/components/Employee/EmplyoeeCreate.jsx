import moment from "moment/moment";
import React, { useEffect, useState } from "react";

const AGE = Array.from(Array(71).keys()).filter((x) => x > 20);

const EmplyoeeCreate = ({ employeeCreateProps }) => {
  const { setShowTable, editSwitch } = employeeCreateProps;
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    Age: 21,
    title: "Employee",
    dateOfJoining: moment(new Date()).format("YYYY-MM-DD"),
    department: "IT",
    employeeType: "FullTime",
    currentStatus: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editSwitch) {
      const { selectedEmployeeData } = employeeCreateProps;
      setEmployeeData({ ...selectedEmployeeData });
      return;
    }

    return () => {
      setEmployeeData({
        firstName: "",
        lastName: "",
        Age: 21,
        title: "Employee",
        dateOfJoining: moment(new Date()).format("YYYY-MM-DD"),
        department: "IT",
        employeeType: "FullTime",
        currentStatus: 1,
      });
    };
  }, []);

  const onEmployeeDataChange = (name, value) => {
    let newErrors = errors;
    delete newErrors[name];
    setErrors({ ...newErrors });
    switch (name) {
      case "firstName":
        let firstNameError =
          value.length > 30
            ? "firstName should be less than 30 characters."
            : !new RegExp("^[a-zA-Z]*$").test(value)
            ? "Firstname must contains only alphabets."
            : "";
        if (firstNameError !== "") setErrors((prevErrors) => ({ ...prevErrors, [name]: firstNameError }));
        break;
      case "lastName":
        let lastNameError =
          value.length > 30
            ? "lastName should be less than 30 characters."
            : !new RegExp("^[a-zA-Z]*$").test(value)
            ? "Lastname must contains only alphabets."
            : "";
        if (lastNameError !== "") setErrors((prevErrors) => ({ ...prevErrors, [name]: lastNameError }));
        break;
      default:
        break;
    }

    setEmployeeData((prevEmployeeData) => {
      return { ...prevEmployeeData, [name]: value };
    });
  };

  const onFormSubmit = (e) => {
    const { addEmployee } = employeeCreateProps;
    e.preventDefault();

    // checking for joining date validation
    let dateOfJoiningError =
      new Date(employeeData.dateOfJoining) < Date.now() ? "Date of joining must be equal to or greater that today's date." : "";
    if (dateOfJoiningError !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [`dateOfJoining`]: dateOfJoiningError }));
    }
    console.log(errors);
    if (Object.keys(errors).length > 0) return;
    if (editSwitch) {
      const { editEmployee } = employeeCreateProps;
      editEmployee(employeeData);
      setShowTable(() => true);
      return;
    }
    addEmployee(employeeData);
    setShowTable(() => true);
  };

  console.log("loading editSwitch");
  return (
    <div className="w-75 pt-5 border p-5 shadow-lg">
      <h1 className="text-center pb-5">{`${editSwitch ? "Edit Employee Record" : "Create Employee Record"}`} </h1>
      <form onSubmit={onFormSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">FirstName</label>
          <input
            value={employeeData.firstName}
            onChange={(e) => onEmployeeDataChange(e.target.name, e.target.value)}
            name="firstName"
            type="text"
            required
            className="form-control"
            id="inputEmail4"
            placeholder="Enter FirstName"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">LastName</label>
          <input
            value={employeeData.lastName}
            type="text"
            onChange={(e) => onEmployeeDataChange(e.target.name, e.target.value)}
            name="lastName"
            required
            className="form-control"
            id="inputEmail4"
            placeholder="Enter LastName"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Age</label>
          <select
            onChange={(e) => onEmployeeDataChange(e.target.name, e.target.value)}
            name="Age"
            value={employeeData.Age}
            className="form-control"
            required
            placeholder="Age"
          >
            {AGE.map((value, index) => {
              return <option key={index}>{value}</option>;
            })}
          </select>
        </div>
        <div className="col-md-10">
          <label className="form-label">Title</label>
          <select
            onChange={(e) => onEmployeeDataChange(e.target.name, e.target.value)}
            name="title"
            value={employeeData.title}
            required
            className="form-control"
            id="inputPassword4"
          >
            {["Employee", "Manager", "Director", "VP"].map((x) => {
              return <option key={x}>{x}</option>;
            })}
          </select>
        </div>

        <div className="col-md-5">
          <label className="form-label">DateOfJoining</label>
          <input
            onChange={(e) => onEmployeeDataChange(e.target.name, e.target.value)}
            name="dateOfJoining"
            value={employeeData.dateOfJoining}
            type="date"
            required
            className="form-control"
            id="inputPassword4"
          />
        </div>
        <div className="col-md-7"></div>
        <div className="col-6">
          <label className="form-label">Department</label>
          <select
            onChange={(e) => onEmployeeDataChange(e.target.name, e.target.value)}
            name="department"
            value={employeeData.department}
            required
            className="form-control"
            id="inputPassword4"
          >
            {["IT", "Marketing", "HR", "Engineering"].map((x) => {
              return <option key={x}>{x}</option>;
            })}
          </select>
        </div>

        <div className="col-6">
          <label className="form-label">EmployeeType</label>

          <select
            onChange={(e) => onEmployeeDataChange(e.target.name, e.target.value)}
            name="employeeType"
            value={employeeData.employeeType}
            required
            className="form-control"
            id="inputPassword4"
          >
            {["FullTime", "PartTime", "Contract", "Seasonal"].map((x) => {
              return <option key={x}>{x}</option>;
            })}
          </select>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <button className="w-50 m-auto py-1 bg-primary text-white mt-4" style={{ borderRadius: "0.5em" }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmplyoeeCreate;
