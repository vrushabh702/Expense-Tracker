CREATE TABLE budgets (
    budgetId VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    month DATE,
    FOREIGN KEY (userId) REFERENCES users(userId)
);
