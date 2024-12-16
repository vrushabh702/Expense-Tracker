import React, { useEffect, useState } from "react"
import Loading from "../Loading/loading"
import Error from "../Errors/Error"
import { Carousel } from "react-bootstrap"
import NoDataError from "../Errors/errorNoData"

const Home = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [noData, setNoData] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/carouselImage.json"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch images")
        }
        const data = await response.json()
        if (data.length === 0) {
          setNoData(true)
        } else {
          setImages(data)
        }
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }
    fetchImages()
  }, [])

  const handleSubscribe = () => {
    if (email.trim()) {
      localStorage.setItem("subscribedEmail", email.trim())
      alert("Thank you for subscribing!")
      setEmail("")
    } else {
      alert("Please enter a valid email address.")
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubscribe()
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  if (noData) {
    return <NoDataError message="No Images Available" />
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Carousel */}
      <Carousel style={{ width: "100%", height: "100%" }}>
        {images.map((image) => (
          <Carousel.Item key={image.id}>
            <img
              className="d-block w-full"
              src={image.url}
              alt={`Slide ${image.id}`}
              style={{ objectFit: "cover", height: "100vh" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Heading and Quote */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          textAlign: "right",
          padding: "15px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
          borderRadius: "10px",
          maxWidth: "300px",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", margin: "0" }}>Track Your Spending</h1>
        <h3 style={{ fontSize: "1rem", margin: "5px 0 10px" }}>
          With Expense Tracker
        </h3>
        <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
          "Every rupee saved is a rupee earned."
        </p>
      </div>

      {/* Subscription Form */}
      <div
        style={{
          position: "absolute",
          bottom: "50px", // Adjusted from extreme corner
          right: "50px", // Adjusted from extreme corner
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent background
          borderRadius: "8px",
          padding: "10px 15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown} // Submits on Enter
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
            outline: "none",
            flex: "1",
          }}
        />
        <button
          onClick={handleSubscribe}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default Home
