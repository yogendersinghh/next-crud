import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Forms from "../components/Forms";
import { Button, Typography, Divider, Checkbox, Table, Tag ,message} from "antd";
import "antd/dist/antd.css";
import moment from "moment";


const { Title } = Typography;

export default function Home({ data }) {
  const [ShowForm, setShowForm] = useState(false);
  const [UpdateEmployee, setUpdateEmployee] = useState(false);
  const [userList, setUserList] = useState(false);

  const [Id, setId] = useState(0);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    salary: "",
    date: "",
    isactive: "",
  });

  const [allusers, setAllusers] = useState([]);
  const [deleteIds, setDeleteIds] = useState([]);

  useEffect(() => {
    async function apicalling() {
      const { data } = await axios.get("/api");
      setAllusers(data);
    }
    apicalling();
  }, [userList]);

  const changeHandler = (e, name) => {
    if (name === "salary") {
      setUserData({
        ...userData,
        [name]: e,
      });
    } else if (name === "date") {
      setUserData({
        ...userData,
        [name]: e, //e.format("YYYY-MM-DD"),
      });
    } else {
      setUserData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const updateEmployee = async (e, id) => {
    const { firstname, lastname, email, salary, date, isactive } = id;
    setUserData({
      firstname,
      lastname,
      email,
      salary,
      date: date?.split("T")[0],
      isactive,
    });

    setId(id._id);
    setUpdateEmployee(true);
    setShowForm(true);
  };

  const editEmployee = async (e, id) => {
    e.preventDefault();
    const { firstname, lastname, email, salary, date, isactive } = userData;

    await axios.post(`api/updateapi/${Id}`, {
      firstname,
      lastname,
      email,
      salary: Number(salary),
      date,
      isactive,
    });
    setUserList(!userList);
    setUserData({
      firstname: "",
      lastname: "",
      email: "",
      salary: "",
      date: "",
      isactive: "",
    });
    setUpdateEmployee(false);
    message.success("Employee Updated Successfully");
  };
  const deleteEmployee = async (e, id) => {
    // e.preventDefault();
    await axios.post(`api/deleteapi/${id}`);
    message.success("Employee Deleted Successfully");
    setUserList(!userList);
  };

  const showForm = () => {
    setShowForm(!ShowForm);
  };

  const submitFunction = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, salary, date, isactive } = userData;
    if (!firstname || !lastname || !email || !salary || !date || !isactive) {
      return;
    }
    const data = await axios.post("/api/createemployee", {
      firstname,
      lastname,
      email,
      salary: Number(salary),
      date,
      isactive,
    });
    setUserList(!userList);
    setUserData({
      firstname: "",
      lastname: "",
      email: "",
      salary: "",
      date: "",
      isactive: "",
    });
    message.success("Employee Added Successfully");
  };

  const checked = (e, id) => {
    if (e.target.checked) {
      setDeleteIds([...deleteIds, id]);
      if (deleteIds.length === 0) {
      }
    } else {
      setDeleteIds(deleteIds.filter((item) => item !== id));
      if (deleteIds.length === 0) {
      }
    }
  };

  const deleteAll = async (e) => {
    e.preventDefault();
    await axios.post(`api/deletemultiple`, { deleteIds });
    setUserList(!userList);
    setDeleteIds([]);
    message.success("Employees Deleted Successfully");
  };

  const resetFunction = (e) => {
    e.preventDefault();
    setUserData({
      firstname: "",
      lastname: "",
      email: "",
      salary: "",
      date: "",
      isactive: "",
    });
  };

  const columns = [
    {
      title: "Select",
      render: (key, record) => {
        return (
          <>
            <Checkbox
              onClick={(e) => {
                checked(e, record._id);
              }}
            />
          </>
        );
      },
    },
    {
      title: "firstname",
      dataIndex: "firstname",
    },
    {
      title: "lastname",
      dataIndex: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Salary",
      dataIndex: "salary",
    },
    {
      title: "BirthDate",
      dataIndex: "date",
      render: (text) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "Status",
      dataIndex: "isactive",
      render: (key, record) => {
        return (
          <>
            {key === "active" ? (
              <Tag color="green">
                <i className="fa-solid fa-circle"></i>
                {key}
              </Tag>
            ) : (
              <Tag color="red">
                <i className="fa-solid fa-xmark"></i>
                {key}
              </Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={(e) => {
              updateEmployee(e, record);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <Button
            type="danger"
            onClick={(e) => {
              deleteEmployee(e, record._id);
            }}
          >
            <i className="fa-solid fa-trash-can"></i>
          </Button>
        </>
      ),
    },
  ];
  const rowdata = allusers;

  return (
    <>
      <div>
        <Head>
          <title>Employee Management</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/faCreate Next App<vicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
            integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
            crossOrigin="anonymous"
            referrerpolicy="no-referrer"
          />
        </Head>
        <Title className={styles.header}>Employee Management</Title>
        <Button
          type="primary"
          onClick={() => {
            showForm();
          }}
          className="btn btn-outline-primary"
        >
          Add Employee <i className="fa-solid fa-user-plus"></i>
        </Button>
        {ShowForm && (
          <>
            <Forms
              userData={userData}
              editEmployee={editEmployee}
              changeHandler={changeHandler}
              submitFunction={submitFunction}
              UpdateEmployee={UpdateEmployee}
              resetFunction={resetFunction}
            />
          </>
        )}
        <Divider />
        <Table columns={columns} dataSource={rowdata} pagination={false} />
        {deleteIds.length ? (
          <>
            <Button
              type="danger"
              onClick={(e) => {
                deleteAll(e);
              }}
            >
              Delete All
            </Button>
          </>
        ) : null}
      </div>
    </>
  );
}
