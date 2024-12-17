const fs = require("fs")
const path = require("path")

// Path to the folder where your JSON files are stored
const jsonFolderPath = path.join(__dirname, "api")

// Function to dynamically load JSON files from the directory
function loadJSONFiles() {
  const files = fs.readdirSync(jsonFolderPath)
  let data = {}

  files.forEach((file) => {
    const filePath = path.join(jsonFolderPath, file)
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    data[file] = fileData
  })

  return data
}

// Function to process dynamic data
function processDynamicData(data) {
  for (const fileName in data) {
    const fileData = data[fileName]

    // Dynamically determine the type of data based on file name or structure
    if (fileName === "users.json") {
      fileData.forEach((user) => {
        if (user.userId) {
          console.log(`Processing user with userId: ${user.userId}`)
        } else {
          console.log(`Skipping user with missing userId`)
        }
      })
    }

    if (fileName === "budgets.json") {
      fileData.forEach((budget) => {
        if (budget.budgetId) {
          console.log(`Processing budget with budgetId: ${budget.budgetId}`)
        } else {
          console.log(`Skipping budget with missing budgetId`)
        }
      })
    }

    if (fileName === "expenses.json") {
      fileData.forEach((expense) => {
        if (expense.expenseId) {
          console.log(`Processing expense with expenseId: ${expense.expenseId}`)
        } else {
          console.log(`Skipping expense with missing expenseId`)
        }
      })
    }

    if (fileName === "categories.json") {
      fileData.forEach((category) => {
        if (category) {
          console.log(`Processing category: ${category}`)
        } else {
          console.log(`Skipping invalid category`)
        }
      })
    }

    if (fileName === "paymentMethods.json") {
      fileData.forEach((method) => {
        if (method) {
          console.log(`Processing payment method: ${method}`)
        } else {
          console.log(`Skipping invalid payment method`)
        }
      })
    }

    if (fileName === "carouselImage.json") {
      fileData.forEach((image) => {
        if (image.url && image.alt) {
          console.log(`Processing image with URL: ${image.url}`)
        } else {
          console.log(`Skipping image with missing data`)
        }
      })
    }

    if (fileName === "currency.json") {
      fileData.forEach((currency) => {
        if (currency) {
          console.log(`Processing currency: ${currency}`)
        } else {
          console.log(`Skipping invalid currency`)
        }
      })
    }
  }
}

// Main function to load and process data
function main() {
  const data = loadJSONFiles()
  processDynamicData(data)
}

// Run the script
main()
