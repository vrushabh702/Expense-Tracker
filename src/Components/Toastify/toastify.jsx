import React from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css" // Default Toastify CSS
import "./App.css" // Include Tailwind's CSS

const ToastifyComponent = () => {
  const notifySuccess = (message) => {
    toast.success(`✅  Update successful!`(message), {
      position: toast.POSITION.TOP_RIGHT,
      className: "bg-green-600 text-white rounded-xl p-4 shadow-lg",
      bodyClassName: "text-sm font-medium",
      progressClassName: "bg-green-400",
    })
  }

  const notifyError = (message) => {
    toast.error("❌ Error found!"(message), {
      position: toast.POSITION.TOP_RIGHT,
      className: "bg-red-600 text-white rounded-xl p-4 shadow-lg",
      bodyClassName: "text-sm font-medium",
      progressClassName: "bg-red-400",
    })
  }

  const notifyInfo = (message) => {
    toast.info("⏳ Please wait..."(message), {
      position: toast.POSITION.TOP_RIGHT,
      className: "bg-blue-600 text-white rounded-xl p-4 shadow-lg",
      bodyClassName: "text-sm font-medium",
      progressClassName: "bg-blue-400",
    })
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000} // Automatically dismiss after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Show newest toasts on top
        closeButton={false} // Hide the close button
        rtl={false} // Disable right-to-left support
        draggable={false} // Disable drag to dismiss
      />
    </div>
  )
}

export default ToastifyComponent
