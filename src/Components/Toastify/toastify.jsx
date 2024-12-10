import React from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const notifySuccess = (message) => {
  toast.success(`✅ ${message}`, {
    position: toast.POSITION.TOP_RIGHT,
    className: "bg-green-600 text-white rounded-xl p-4 shadow-lg",
    bodyClassName: "text-sm font-medium",
    progressClassName: "bg-green-400",
  })
}

export const notifyError = (message) => {
  toast.error(`❌ ${message}`, {
    position: toast.POSITION.TOP_RIGHT,
    className: "bg-red-600 text-white rounded-xl p-4 shadow-lg",
    bodyClassName: "text-sm font-medium",
    progressClassName: "bg-red-400",
  })
}

export const notifyInfo = (message) => {
  toast.info(`⏳ ${message}`, {
    position: toast.POSITION.TOP_RIGHT,
    className: "bg-blue-600 text-white rounded-xl p-4 shadow-lg",
    bodyClassName: "text-sm font-medium",
    progressClassName: "bg-blue-400",
  })
}

const ToastifyComponent = () => {
  return <ToastContainer autoClose={2000} hideProgressBar={false} />
}

export default ToastifyComponent
