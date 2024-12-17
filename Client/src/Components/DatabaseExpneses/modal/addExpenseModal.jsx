import React, { useState, useEffect } from "react"
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap"

const AddExpenseModal = ({
  show,
  handleClose,
  formData,
  setFormData,
  handleSave,
  isUpdateMode, // Flag to check if we are in update mode
  categories,
  paymentMethods,
  currencies,
}) => {
  // State to manage form validation
  const [errors, setErrors] = useState({})
  const [formValid, setFormValid] = useState(true)

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
                      value={formData[field.key]}
                      onChange={(e) => handleFormChange(e, field.key)}
                      isInvalid={errors[field.key]} // Show red border if invalid
                    >
                      {(field.key === "category"
                        ? categories
                        : field.key === "paymentMethod"
                        ? paymentMethods
                        : field.key === "currency"
                        ? currencies
                        : []
                      ).map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name || option.code}
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
