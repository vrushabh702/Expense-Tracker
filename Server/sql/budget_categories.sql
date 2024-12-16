CREATE TABLE budget_categories (
    budgetId VARCHAR(255),
    categoryId INT,
    amount DECIMAL(10, 2),
    FOREIGN KEY (budgetId) REFERENCES budgets(budgetId),
    FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
);
