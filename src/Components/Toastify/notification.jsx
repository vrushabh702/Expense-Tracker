import React, { useEffect } from "react"

const Notification = ({ message, type, onClose, duration = 2000 }) => {
  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-600"

  const progressColor =
    type === "success"
      ? "bg-green-400"
      : type === "error"
      ? "bg-red-400"
      : "bg-blue-400"

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-xl shadow-lg text-white ${bgColor} animate-slide-in`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">
            {type === "success" && "✅"} {type === "error" && "❌"}{" "}
            {type === "info" && "⏳"} {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-white font-bold text-lg focus:outline-none"
        >
          ✖
        </button>
      </div>
      <div className="relative h-1 mt-2 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${progressColor}`}
          style={{ animation: `progress ${duration}ms linear` }}
        />
      </div>
    </div>
  )
}

export default Notification
