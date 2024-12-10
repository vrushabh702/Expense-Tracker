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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/carouselImage.json"
        )
        if (!response.ok) {
          throw new Error("failed to fetch images")
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
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100 p-0">
      <Carousel className="w-screen h-screen">
        {images.map((image) => (
          <Carousel.Item key={image.id}>
            <img
              className="d-block w-full h-full"
              src={image.url}
              alt={`Slide ${image.id}`}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100vh",
                margin: 0,
                padding: 0,
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Home
