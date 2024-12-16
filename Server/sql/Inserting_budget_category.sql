-- Inserting budget category data for userId1
INSERT INTO budget_categories (budgetId, categoryId, amount) VALUES
('budgetId1', (SELECT categoryId FROM categories WHERE categoryName = 'Food'), 300),
('budgetId1', (SELECT categoryId FROM categories WHERE categoryName = 'Transport'), 150),
('budgetId1', (SELECT categoryId FROM categories WHERE categoryName = 'Entertainment'), 100),
('budgetId1', (SELECT categoryId FROM categories WHERE categoryName = 'Shopping'), 200),
('budgetId1', (SELECT categoryId FROM categories WHERE categoryName = 'Bills'), 250),
('budgetId1', (SELECT categoryId FROM categories WHERE categoryName = 'Healthcare'), 200),
('budgetId1', (SELECT categoryId FROM categories WHERE categoryName = 'Education'), 300),
('budgetId1', (SELECT categoryId FROM categories WHERE categoryName = 'Miscellaneous'), 100),
('budgetId1', (SELECT categoryId FROM categories WHERE categoryName = 'Travel'), 400),
('budgetId1', (SELECT categoryId FROM categories WHERE categoryName = 'Savings'), 500);

-- Inserting budget category data for userId2
INSERT INTO budget_categories (budgetId, categoryId, amount) VALUES
('budgetId2', (SELECT categoryId FROM categories WHERE categoryName = 'Food'), 250),
('budgetId2', (SELECT categoryId FROM categories WHERE categoryName = 'Transport'), 120),
('budgetId2', (SELECT categoryId FROM categories WHERE categoryName = 'Entertainment'), 80),
('budgetId2', (SELECT categoryId FROM categories WHERE categoryName = 'Shopping'), 180),
('budgetId2', (SELECT categoryId FROM categories WHERE categoryName = 'Bills'), 200),
('budgetId2', (SELECT categoryId FROM categories WHERE categoryName = 'Healthcare'), 150),
('budgetId2', (SELECT categoryId FROM categories WHERE categoryName = 'Education'), 250),
('budgetId2', (SELECT categoryId FROM categories WHERE categoryName = 'Miscellaneous'), 90),
('budgetId2', (SELECT categoryId FROM categories WHERE categoryName = 'Travel'), 300),
('budgetId2', (SELECT categoryId FROM categories WHERE categoryName = 'Savings'), 400);
