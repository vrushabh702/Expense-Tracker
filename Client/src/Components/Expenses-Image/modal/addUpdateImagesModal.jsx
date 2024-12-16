import React, { useState, useEffect } from "react"
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap"
import axios from "axios"

const AddUpdateImagesModal = ({
  show,
  handleClose,
  formData,
  setFormData,
  handleSave,
  isUpdateMode, // Flag to check if we are in update mode
}) => {
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [currencies, setCurrencies] = useState([])

  const [errors, setErrors] = useState({})
  const [formValid, setFormValid] = useState(true)

  // Reset form and validation state when modal is closed
  useEffect(() => {
    if (!show) {
      setErrors({})
      setFormValid(true)
    }
  }, [show])

  // Fetching categories, payment methods, and currencies (same as before)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await axios.get(
          "http://localhost:3000/api/categories.json"
        )
        const paymentMethodsRes = await axios.get(
          "http://localhost:3000/api/paymentMethod.json"
        )
        const currenciesRes = await axios.get(
          "http://localhost:3000/api/currency.json"
        )

        setCategories(categoriesRes.data)
        setPaymentMethods(paymentMethodsRes.data)
        setCurrencies(currenciesRes.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const fields = [
    { label: "User Name", key: "userName", type: "text", required: true },
    { label: "Country", key: "userCountry", type: "text", required: true },
    { label: "Email", key: "userEmail", type: "email", required: true },
    { label: "Category", key: "category", type: "select", required: true },
    { label: "Amount", key: "amount", type: "number", required: true },
    {
      label: "Payment Method",
      key: "paymentMethod",
      type: "select",
      required: true,
    },
    { label: "Date", key: "date", type: "date", required: true },
    { label: "Description", key: "description", type: "text", required: false },
    { label: "Budget", key: "budget", type: "number", required: true },
    { label: "Currency", key: "currency", type: "select", required: true },
    { label: "Image Upload", key: "image", type: "file", required: true },
  ]

  // Handle changes in the form fields
  const handleFormChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    })

    // If the user selects a new image, clear the error for image field
    if (key === "image") {
      setErrors({
        ...errors,
        [key]: "", // Clear the image error if the user selects a new file
      })
    }
  }

  // Validate the form including the image field
  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    // Check for all required fields
    fields.forEach((field) => {
      if (field.required && !formData[field.key]) {
        newErrors[field.key] = `${field.label} is required`
        isValid = false
      }
    })

    // Validate image file upload (if required)
    if (!formData.image && !isUpdateMode) {
      newErrors.image = "Image is required" // Only check if not in update mode
      isValid = false
    }

    setErrors(newErrors)
    setFormValid(isValid)
    return isValid
  }

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      handleSave(formData, isUpdateMode) // Pass formData to parent with update flag
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isUpdateMode ? "Update Images" : "Add New Images"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!formValid && (
          <Alert variant="danger" className="mb-3">
            Please provide all required information.
          </Alert>
        )}

        <Form>
          <Row>
            {fields.map((field) => (
              <Col md={6} key={field.key}>
                <Form.Group className="mb-3" controlId={field.key}>
                  <Form.Label>{field.label}</Form.Label>
                  {field.type === "select" ? (
                    <Form.Select
                      value={formData[field.key]}
                      onChange={(e) => handleFormChange(e, field.key)}
                      isInvalid={errors[field.key]}
                    >
                      <option value="">Select {field.label}</option>
                      {field.key === "category"
                        ? categories.map((category, index) => (
                            <option key={index} value={category}>
                              {category}
                            </option>
                          ))
                        : field.key === "paymentMethod"
                        ? paymentMethods.map((method, index) => (
                            <option key={index} value={method}>
                              {method}
                            </option>
                          ))
                        : field.key === "currency"
                        ? currencies.map((currency, index) => (
                            <option key={index} value={currency}>
                              {currency}
                            </option>
                          ))
                        : null}
                    </Form.Select>
                  ) : field.type === "file" ? (
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFormChange(e, field.key)}
                      isInvalid={errors[field.key]} // Show error if image is not selected
                    />
                  ) : (
                    <Form.Control
                      type={field.type}
                      value={formData[field.key]}
                      onChange={(e) => handleFormChange(e, field.key)}
                      isInvalid={errors[field.key]}
                    />
                  )}
                  {errors[field.key] && (
                    <Form.Control.Feedback type="invalid">
                      {errors[field.key]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isUpdateMode ? "Update Images" : "Save Images"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddUpdateImagesModal
