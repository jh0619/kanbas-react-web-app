import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showNotification, setShowNotification] = useState(false);
  // const fetchProfile = async () => {
  //   try {
  //     const account = await client.profile();
  //     setProfile(account);
  //   } catch (err: any) {
  //     navigate("/Kanbas/Account/Signin");
  //   }
  // };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  const updateProfile = async () => {
    try {
      const updatedUser = await client.updateProfile(profile);
      console.log("Updated user from backend:", updatedUser);
      dispatch(setCurrentUser(updatedUser));
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate("/Kanbas/Account/Profile");
      }, 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.message);
    }
  };

  const handleDateChange = (e: any) => {
    const date = new Date(e.target.value).toISOString();
    setProfile({ ...profile, dob: date });
  };

  useEffect(() => {
    if (currentUser) {
      setProfile({
        ...currentUser,
        dob: currentUser.dob
          ? new Date(currentUser.dob).toISOString().split("T")[0]
          : "",
      });
    }
  }, [currentUser]);
  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          {/* <input
            className="wd-username"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          /> */}
          <div className="d-flex align-items-center mb-3">
            <label
              htmlFor="username"
              className="form-label me-2"
              style={{ width: "10%" }}
            >
              Username
            </label>
            <input
              className="wd-username form-control mb-2"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>
          <div className="d-flex align-items-center mb-3">
            <label
              htmlFor="password"
              className="form-label me-2"
              style={{ width: "10%" }}
            >
              Password
            </label>
            <input
              className="wd-password form-control mb-2"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
          </div>
          <div className="d-flex align-items-center mb-3">
            <label
              htmlFor="firstname"
              className="form-label me-2"
              style={{ width: "10%" }}
            >
              First Name
            </label>
            <input
              className="wd-firstname form-control mb-2"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
          </div>

          <div className="d-flex align-items-center mb-3">
            <label
              htmlFor="lastname"
              className="form-label me-2"
              style={{ width: "10%" }}
            >
              Last Name
            </label>
            <input
              className="wd-lastname form-control mb-2"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
          </div>

          <div className="d-flex align-items-center mb-3">
            <label
              htmlFor="dob"
              className="form-label me-2"
              style={{ width: "10%" }}
            >
              Date of Birth
            </label>
            <input
              className="wd-dob form-control mb-2"
              value={profile.dob ? profile.dob.split("T")[0] : ""}
              onChange={handleDateChange}
              type="date"
            />
          </div>
          <div className="d-flex align-items-center mb-3">
            <label
              htmlFor="email"
              className="form-label me-2"
              style={{ width: "10%" }}
            >
              Email
            </label>
            <input
              className="wd-email form-control mb-2"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>
          {/* 
          <select
            className="wd-role"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>{" "}
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>{" "}
            <option value="STUDENT">Student</option>
          </select> */}
          <div className="d-flex align-items-center mb-3">
            <label
              htmlFor="role"
              className="form-label me-2"
              style={{ width: "10%" }}
            >
              Role
            </label>
            {/* <select className="wd-role form-control mb-2"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select> */}
            <input
              type="text"
              className="wd-role form-control mb-2"
              value={profile.role}
              readOnly
            />
          </div>
          <div className="d-flex ">
            <button
              onClick={updateProfile}
              className="wd-updateProfile-btn btn btn-primary me-2"
            >
              Update Profile
            </button>
            <button onClick={signout} className="wd-signout-btn btn btn-danger">
              Sign Out
            </button>
          </div>
        </div>
      )}
      {showNotification && (
        <div
          className="position-fixed top-50 start-50 translate-middle p-4 bg-success text-white rounded"
          style={{ zIndex: 1000 }}
        >
          Profile updated successfully!
        </div>
      )}
    </div>
  );
}
