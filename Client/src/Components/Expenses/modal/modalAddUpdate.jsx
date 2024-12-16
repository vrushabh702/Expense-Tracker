import React, { useState, useEffect } from "react"
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap"
import axios from "axios"

const AddExpenseModal = ({
  show,
  handleClose,
  formData,
  setFormData,
  handleSave,
  isUpdateMode, // Flag to check if we are in update mode
}) => {
  // State to hold dropdown data
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [currencies, setCurrencies] = useState([])

  // State to manage form validation
  const [errors, setErrors] = useState({})
  const [formValid, setFormValid] = useState(true)

  useEffect(() => {
    if (!show) {
      setErrors({})
      setFormValid(true)
    }
  }, [show])

  // Fetch data from the API
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
  }, []) // Empty dependency array to only run once

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
  ]

  const handleFormChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    })
    setErrors({
      ...errors,
      [key]: "", // Clear the error for the specific key
    })
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    fields.forEach((field) => {
      if (field.required && !formData[field.key]) {
        newErrors[field.key] = `${field.label} is required`
        isValid = false
      }
    })

    setErrors(newErrors)
    setFormValid(isValid)
    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave(formData, isUpdateMode) // Pass formData to parent along with update flag
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isUpdateMode ? "Update Expense" : "Add New Expense"}
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
                      isInvalid={errors[field.key]} // Show red border if invalid
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
                  ) : (
                    <Form.Control
                      type={field.type}
                      value={formData[field.key]}
                      onChange={(e) => handleFormChange(e, field.key)}
                      isInvalid={errors[field.key]} // Show red border if invalid
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
          {isUpdateMode ? "Update Expense" : "Save Expense"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddExpenseModal
