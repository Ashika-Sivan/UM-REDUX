import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Phone, Edit2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { logout } from "../../redux/slice/UserSlice";
import '../../assets/Styles/Profile.css'
import { Outlet } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLogoutPopUpVisible, setIsLogoutPopUpVisible] = useState(false);

  function handleEdit() {
    const confirmEdit = window.confirm("Do you want to edit your profile?");
    if (confirmEdit) {
      navigate("/profile/edit");
    }
  }

  function handleLogout() {
    setIsLogoutPopUpVisible(true);
  }

  const confirmLogout = async () => {
    try {
      await axiosInstance.post("user/logout");
      dispatch(logout());
      navigate("/home");
    } catch (err) {
      setError("Logout failed. Please try again.");
    }
  };

  function cancelLogout() {
    setIsLogoutPopUpVisible(false);
  }

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <h1>User Profile</h1>

        {error && <p className="error">{error}</p>}

        <div className="profile-image-container">
          <img
            src={
              user?.profilePicture
                ? `${import.meta.env.VITE_BASE_IMG_URL.replace(
                    /\/$/,
                    ""
                  )}/${user.profilePicture.replace(/^\//, "")}`
                : "/src/assets/dummy.jpg"
            }
            alt={user?.userName || "User"}
            className="profile-image"
          />
        </div>

        {user ? (
          <div className="profile-info">
            <div className="info-item">
              <User size={20} />
              <p>
                <b>Name:</b> {user.userName}
              </p>
            </div>

            <div className="info-item">
              <Mail size={20} />
              <p>
                <b>Email:</b> {user.email}
              </p>
            </div>

            <div className="info-item">
              <Phone size={20} />
              <p>
                <b>Mobile:</b> {user.phone}
              </p>
            </div>
          </div>
        ) : (
          <p className="loading">Loading profile...</p>
        )}

        <div className="button-container">
          <button onClick={handleEdit} className="edit-button">
            <Edit2 size={16} /> Edit
          </button>

          <button onClick={handleLogout} className="delete-button">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
      <Outlet />
      {isLogoutPopUpVisible && (
        <div className="confirmation-popup">
          <div className="popup-content">
            <h3>Are you sure you want to log out?</h3>

            <button className="confirm-btn" onClick={confirmLogout}>
              Confirm
            </button>

            <button className="cancel-btn" onClick={cancelLogout}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
