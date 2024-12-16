CREATE TABLE expenses (
    expenseId VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    categoryId INT,
    amount DECIMAL(10, 2),
    date DATE,
    description TEXT,
    paymentMethodId INT,
    currencyId INT,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (categoryId) REFERENCES categories(categoryId),
    FOREIGN KEY (paymentMethodId) REFERENCES payment_methods(paymentMethodId),
    FOREIGN KEY (currencyId) REFERENCES currencies(currencyId)
);
