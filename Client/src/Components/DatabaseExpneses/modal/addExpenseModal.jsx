import axios from "axios"
import React, { useState, useEffect } from "react"
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap"

const AddExpenseModal = ({
  show,
  handleClose,
  formData,
  setFormData,
  handleSave,
  isUpdateMode, // Flag to check if we are in update mode
}) => {
  // State to manage
  const [categories, setCategories] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [currencies, setCurrencies] = useState([])

  const [errors, setErrors] = useState({})
  const [formValid, setFormValid] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await axios.get(
          "http://localhost:3001/api/categories"
        )
        const paymentMethodsRes = await axios.get(
          "http://localhost:3001/api/payment-methods"
        )
        const currenciesRes = await axios.get(
          "http://localhost:3001/api/currencies"
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

  console.log("categories", categories)
  console.log("paymentMethods", paymentMethods)
  console.log("currencies", currencies)

  const getOptionKey = (option, fieldKey) => {
    switch (fieldKey) {
      case "category":
        return option.categoryId
      case "paymentMethod":
        return option.paymentMethodId
      case "currency":
        return option.currencyId
      default:
        return null
    }
  }

  const getOptionLabel = (option, fieldKey) => {
    switch (fieldKey) {
      case "category":
        return option.categoryName
      case "paymentMethod":
        return option.paymentMethodName
      case "currency":
        return option.currencyCode
      default:
        return null
    }
  }

  useEffect(() => {
    if (!show) {
      setErrors({})
      setFormValid(true)
    }
  }, [show])

  // Define form fields
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

  // Handle form changes
  const handleFormChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    })
    setErrors({
      ...errors,
      [key]: "", // Clear error for the specific key
    })
  }

  // Validate the form
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

  // Handle form submit
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
                      value={formData[field.key] || ""} // Default to empty if no value is selected
                      onChange={(e) => handleFormChange(e, field.key)}
                      isInvalid={errors[field.key]} // Show red border if invalid
                    >
                      <option value="" disabled>
                        Select {field.label}
                      </option>
                      {(field.key === "category"
                        ? categories
                        : field.key === "paymentMethod"
                        ? paymentMethods
                        : field.key === "currency"
                        ? currencies
                        : []
                      ).map((option) => (
                        <option
                          key={getOptionKey(option, field.key)}
                          value={getOptionKey(option, field.key)}
                        >
                          {getOptionLabel(option, field.key)}
                        </option>
                      ))}
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
