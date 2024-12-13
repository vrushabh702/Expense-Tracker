import React from "react"
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap"
// import { Line, Bar, Pie } from "react-chartjs-2" // For charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  Filler,
} from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  Filler
)

const Dashboard = () => {
  // Dummy data for charts
  const spendingData = {
    labels: ["Healthcare", "Transport", "Shopping", "Food", "Entertainment"],
    datasets: [
      {
        label: "Spending",
        data: [210, 230, 56, 120, 18],
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
        ],
        hoverOffset: 4,
      },
    ],
  }

  const paymentMethodsData = {
    labels: ["Cash", "Debit Card", "Credit Card", "PayPal", "Bank Transfer"],
    datasets: [
      {
        data: [200, 150, 180, 120, 100],
        backgroundColor: [
          "#4e73df",
          "#36b9cc",
          "#1cc88a",
          "#f6c23e",
          "#e74a3b",
        ],
      },
    ],
  }

  const userActivityData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Active Users",
        data: [120, 150, 180, 200],
        borderColor: "#4e73df",
        backgroundColor: "rgba(78, 115, 223, 0.2)",
        tension: 0.3,
      },
      {
        label: "Inactive Users",
        data: [80, 70, 50, 30],
        borderColor: "#e74a3b",
        backgroundColor: "rgba(231, 74, 59, 0.2)",
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Container fluid className="px-4 py-6">
        {/* Header Section */}
        <Row className="mb-6">
          <Col>
            <h1 className="text-3xl font-semibold text-gray-800">
              User Spending Dashboard
            </h1>
            <p className="text-gray-600">
              Overview of user spending, activities, and trends
            </p>
          </Col>
        </Row>

        {/* Key Metrics and KPIs */}
        <Row className="mb-6">
          <Col lg={3} sm={6} className="mb-6">
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Total Spending
                </h5>
                <p className="text-2xl text-blue-600">$1,500</p>
                <Button variant="outline-primary" className="mt-2 w-full">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-6">
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Active Users
                </h5>
                <p className="text-2xl text-green-600">200</p>
                <Button variant="outline-primary" className="mt-2 w-full">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-6">
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Inactive Users
                </h5>
                <p className="text-2xl text-red-600">300</p>
                <Button variant="outline-primary" className="mt-2 w-full">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} sm={6} className="mb-6">
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Total Users
                </h5>
                <p className="text-2xl text-gray-800">500</p>
                <Button variant="outline-primary" className="mt-2 w-full">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Graph Section */}
        <Row className="mb-6">
          <Col lg={6} md={12} className="mb-6">
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Spending by Category
                </h5>
                <Pie data={spendingData} height={300} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={12} className="mb-6">
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Payment Method Distribution
                </h5>
                <Pie data={paymentMethodsData} height={300} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* User Activity */}
        <Row className="mb-6">
          <Col lg={12} className="mb-6">
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  User Activity by Week
                </h5>
                <Line data={userActivityData} height={300} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Transactions Table */}
        <Row className="mb-6">
          <Col lg={12}>
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Recent Transactions
                </h5>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Country</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Kajal</td>
                      <td>France</td>
                      <td>Healthcare</td>
                      <td>$210</td>
                      <td>Debit Card</td>
                      <td>2024-12-20</td>
                    </tr>
                    <tr>
                      <td>Komal</td>
                      <td>India</td>
                      <td>Transport</td>
                      <td>₹230</td>
                      <td>PayPal</td>
                      <td>2024-12-09</td>
                    </tr>
                    <tr>
                      <td>Niki</td>
                      <td>USA</td>
                      <td>Shopping</td>
                      <td>$56</td>
                      <td>Cash</td>
                      <td>2024-12-17</td>
                    </tr>
                    {/* More rows can go here */}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* User Activity and Insights */}
        <Row className="mb-6">
          <Col lg={4} sm={6} className="mb-6">
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  Top Users by Spending
                </h5>
                <div className="h-32 bg-gray-300 rounded-lg mt-4">
                  <p className="text-center text-gray-600 mt-12">
                    Top Users List Placeholder
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} sm={6} className="mb-6">
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  User Activity by Country
                </h5>
                <div className="h-32 bg-gray-300 rounded-lg mt-4">
                  <p className="text-center text-gray-600 mt-12">
                    Map Placeholder
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} sm={6} className="mb-6">
            <Card className="shadow-lg rounded-lg bg-white p-4">
              <Card.Body>
                <h5 className="text-lg font-semibold text-gray-800">
                  User Growth
                </h5>
                <div className="h-32 bg-gray-300 rounded-lg mt-4">
                  <p className="text-center text-gray-600 mt-12">
                    Growth Graph Placeholder
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer */}
        <Row className="mt-6">
          <Col className="text-center text-gray-500">
            <p>&copy; 2024 Dashboard | All rights reserved</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
