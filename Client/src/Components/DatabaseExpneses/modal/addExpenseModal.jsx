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
                    // Conditionally render the select dropdown based on the field key
                    field.key === "category" ? (
                      <Form.Select
                        value={formData.category || ""}
                        onChange={(e) => handleFormChange(e, "category")}
                        isInvalid={errors.category}
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        {categories.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.categoryName}
                          </option>
                        ))}
                      </Form.Select>
                    ) : field.key === "paymentMethod" ? (
                      <Form.Select
                        value={formData.paymentMethod || ""}
                        onChange={(e) => handleFormChange(e, "paymentMethod")}
                        isInvalid={errors.paymentMethod}
                      >
                        <option value="" disabled>
                          Select Payment Method
                        </option>
                        {paymentMethods.map((paymentMethod) => (
                          <option
                            key={paymentMethod.paymentMethodId}
                            value={paymentMethod.paymentMethodId}
                          >
                            {paymentMethod.paymentMethodName}
                          </option>
                        ))}
                      </Form.Select>
                    ) : field.key === "currency" ? (
                      <Form.Select
                        value={formData.currency || ""}
                        onChange={(e) => handleFormChange(e, "currency")}
                        isInvalid={errors.currency}
                      >
                        <option value="" disabled>
                          Select Currency
                        </option>
                        {currencies.map((currency) => (
                          <option
                            key={currency.currencyId}
                            value={currency.currencyId}
                          >
                            {currency.currencyCode}
                          </option>
                        ))}
                      </Form.Select>
                    ) : null
                  ) : (
                    // Render normal Form.Control for text inputs
                    <Form.Control
                      type={field.type}
                      value={formData[field.key] || ""}
                      onChange={(e) => handleFormChange(e, field.key)}
                      isInvalid={errors[field.key]}
                    />
                  )}

                  {/* Display validation error if present */}
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
