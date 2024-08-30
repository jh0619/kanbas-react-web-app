import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import * as client from "./client";
import { useSelector } from "react-redux";

export default function PeopleDetails({
  fetchUsers,
}: {
  fetchUsers: () => void;
}) {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [role, setRole] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    setEditingEmail(false);
    setEditingRole(false);
    fetchUsers();
    navigate(`/Kanbas/Courses/${cid}/People`);
  };

  const navigate = useNavigate();
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    fetchUsers();
    navigate(`/Kanbas/Courses/${cid}/People`);
  };
  const { uid, cid } = useParams();
  const [user, setUser] = useState<any>({});
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setEmail(user.email);
    setRole(user.role);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <Link
        to={`/Kanbas/Courses/${cid}/People`}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </Link>
      <div className="text-center mt-2">
        {" "}
        <FaUserCircle className="text-secondary me-2 fs-1" />{" "}
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {currentUser.role == "FACULTY" && (
          <>
            {" "}
            {!editing && (
              <FaPencil
                onClick={() => setEditing(true)}
                className="float-end fs-6 mt-2 wd-edit text-danger"
              />
            )}
            {editing && (
              <FaCheck
                onClick={() => saveUser()}
                className="float-end fs-5 mt-2 me-2 wd-save"
              />
            )}
            {user && editing && (
              <input
                className="form-control w-50 wd-edit-name"
                defaultValue={`${user.firstName} ${user.lastName}`}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveUser();
                  }
                }}
              />
            )}
          </>
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
      </div>
      <div>
        {currentUser.role == "FACULTY" && (
          <>
            {!editingEmail && (
              <FaPencil
                onClick={() => setEditingEmail(true)}
                className="float-end fs-6 mt-2 wd-edit text-danger"
              />
            )}
            {editingEmail && (
              <FaCheck
                onClick={() => saveUser()}
                className="float-end fs-5 mt-2 me-2 wd-save"
              />
            )}
            {user && editingEmail && (
              <input
                type="email"
                className="form-control w-50 wd-edit-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveUser();
                  }
                }}
              />
            )}
          </>
        )}
        {!editingEmail && (
          <div className="wd-email" onClick={() => setEditingEmail(true)}>
            <b>Email:</b> <span className="wd-email"> {user.email} </span>
            <br />
          </div>
        )}
      </div>
      <div>
        {currentUser.role == "FACULTY" && (
          <>
            {" "}
            {!editingRole && (
              <FaPencil
                onClick={() => setEditingRole(true)}
                className="float-end fs-6 mt-2 wd-edit text-danger"
              />
            )}
            {editingRole && (
              <FaCheck
                onClick={() => saveUser()}
                className="float-end fs-5 mt-2 me-2 wd-save"
              />
            )}
            {user && editingRole && (
              <select
                className="form-control w-50 wd-edit-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveUser();
                  }
                }}
              >
                <option value="STUDENT">STUDENT</option>
                <option value="FACULTY">FACULTY</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            )}
          </>
        )}
        {!editingRole && (
          <div className="wd-role" onClick={() => setEditingRole(true)}>
            <b>Roles:</b> <span className="wd-roles"> {user.role} </span> <br />
          </div>
        )}
      </div>
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>{" "}
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>{" "}
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span> <hr />
      {currentUser.role == "FACULTY" && (
        <>
          <button
            onClick={() => deleteUser(uid)}
            className="btn btn-danger float-end wd-delete"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`/Kanbas/Courses/${cid}/People`)}
            className="btn btn-secondary float-start float-end me-2 wd-cancel"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
