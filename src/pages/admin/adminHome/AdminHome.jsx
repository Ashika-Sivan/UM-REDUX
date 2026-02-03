import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../../utils/axiosInstance"
import { adminLogout } from "../../../redux/slice/AdminSlice"
import { Toaster } from "sonner"
import '../../../assets/Styles/adminHome.css'

const AdminHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const admin = useSelector((state) => state.admin.admin)

  const [isLogoutPopUpVisible, setIsLogoutPopUpVisible] = useState(false)

  const handleLogout = () => {
    setIsLogoutPopUpVisible(true)
  }

  const confirmLogout = async () => {
    try {
      await axiosInstance.post("/admin/logout")
      dispatch(adminLogout())
      navigate("/admin/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const cancelLogout = () => {
    setIsLogoutPopUpVisible(false)
  }

  const handleDashButton = () => {
    navigate("/admin/dashboard")
  }

  return (
    <>
      <Toaster position="top-right" richColors />

      <div className="admin-home-page">
        <header className="header">
          <div className="container">
            <h1 className="logo">Admin Panel</h1>

            <div className="header-buttons">
              <button className="btn btn-dashboard" onClick={handleDashButton}>
                Dashboard
              </button>

              <button className="btn btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="container">
            <div className="admin-card">
              <div className="admin-info">
                <div className="admin-avatar">
                  {admin?.profilePicture ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_IMG_URL}/${admin.profilePicture}`}
                      alt="Admin Avatar"
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {admin?.userName?.charAt(0) || "A"}
                    </div>
                  )}
                </div>

                <div className="admin-details">
                  <h2 className="admin-name">
                    Welcome, {admin?.userName || "Admin"}
                  </h2>
                  <p className="admin-role">Administration</p>
                </div>
              </div>

              <div className="admin-contact">
                <span>{admin?.email || "admin@example.com"}</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2025 Admin Panel.</p>
          </div>
        </footer>

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
    </>
  )
}

export default AdminHome
