-- Inserting expense data
INSERT INTO expenses (expenseId, userId, categoryId, amount, date, description, paymentMethodId, currencyId) VALUES
('expenseId1', 'userId1', (SELECT categoryId FROM categories WHERE categoryName = 'Food'), 35.0, '2024-12-01', 'Dinner at a restaurant', (SELECT paymentMethodId FROM payment_methods WHERE paymentMethodName = 'Credit Card'), (SELECT currencyId FROM currencies WHERE currencyCode = 'USD')),
('expenseId2', 'userId2', (SELECT categoryId FROM categories WHERE categoryName = 'Transport'), 20.0, '2024-12-02', 'Taxi fare', (SELECT paymentMethodId FROM payment_methods WHERE paymentMethodName = 'Cash'), (SELECT currencyId FROM currencies WHERE currencyCode = 'EUR'));
