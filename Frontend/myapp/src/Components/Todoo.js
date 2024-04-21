import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import "./Style/Todo.css";

function Todoo() {
  const [Todo, setTodo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const { _id } = useParams();
  const [PageNumber, setPageNumber] = useState(0);
  const [editedTasks, setEditedTasks] = useState([]);

  const perpage = 5;
  const pageclick = PageNumber * perpage;
  const countpage = Math.ceil(Todo.length / perpage);
  const history = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:4000/gettask").then((team) => {
      setTodo(team.data);
    });
  }, []);

  const handleView = (data) => {
    history("/addtodo", { state: { data: data } });
    console.log(`View member with ID ${_id}`);
  };

  const handleDelete = (_id) => {
    setDeleteId(_id);
    setShowModal(true);
  };

  const deleteMember = () => {
    axios.delete(`http://localhost:4000/deletetask/${deleteId}`).then((res) => {
      setTodo(Todo.filter((del) => del._id !== deleteId));
      console.log(`member with ID ${deleteId} deleted`);
      setShowModal(false);
    });
  };

  const handleEdit = (_id) => {
    const updatedTodo = Todo.map((task) =>
      task._id === _id ? { ...task, status: "completed" } : task
    );
    setTodo(updatedTodo);

    axios
      .put(`http://localhost:4000/updatetask/${_id}`, {
        status: "completed",
      })
      .then((response) => {
        console.log(`Task with ID ${_id} updated in the database`);
      })
      .catch((error) => {
        console.error("Error updating the task:", error);
      });

    setEditedTasks([...editedTasks, _id]);
  };

  const isTaskEdited = (_id) => {
    return editedTasks.includes(_id);
  };

  const getRowClassName = (status) => {
    return status === "completed" ? "completed-row" : "";
  };

  const getStatusIcon = (status) => {
    return status === "completed" ? (
      <span role="img" aria-label="completed">
        ✅
      </span>
    ) : (
      status
    );
  };

  const changepage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container-main">
      <h2>TODO APP</h2>
      <div className="container" style={{ overflow: "auto", width: "auto" }}>
        <div className="d-flex justify-content-end mb-3"></div>
        <Table className="table table-bordered table-hover mt-5 table-responsive">
          <thead>
            <tr class="table-dark">
              <th>TASK</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>MARK AS COMPLETED</th>

              <th>VIEW</th>
              <th>DELETE</th>
            </tr>
          </thead>

          <tbody class="table-light">
            {Todo.slice(pageclick, pageclick + perpage).map((data, index) => (
              <tr
                key={index}
                className={`${getRowClassName(data.status)} ${
                  isTaskEdited(data._id) ? "edited-task" : ""
                }`}
              >
                <td>{data.task}</td>
                <td>{data.date}</td>
                <td>{data.status}</td>
                <td>
                  {data.status !== "completed" ? (
                    <BiEdit
                      style={{
                        cursor: "pointer",
                        marginRight: "18px",
                        color: "black",
                      }}
                      onClick={() => handleEdit(data._id)}
                    />
                  ) : (
                    getStatusIcon(data.status)
                  )}
                </td>
                <td>
                  <HiEye
                    style={{ cursor: "pointer", marginRight: "18px" }}
                    onClick={() => handleView(data)}
                  />{" "}
                </td>
                <td>
                  <FaTrashAlt
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(data._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={countpage}
          onPageChange={changepage}
          containerClassName={
            "pagination justify-content-center paginationBttns"
          }
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          activeClassName={"paginationActive"}
          disabledClassName={"paginationDisabled "}
        />
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this member?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteMember}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Link to="/addtodo">
          <button className="cta1">Add Task</button>
        </Link>
      </div>
    </div>
  );
}

export default Todoo;
