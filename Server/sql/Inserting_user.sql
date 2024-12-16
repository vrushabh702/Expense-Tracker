-- Inserting user data
INSERT INTO users (userId, userName, userEmail, userCountry, currencyId, language) VALUES
('userId1', 'John Doe', 'john.doe@example.com', 'USA', (SELECT currencyId FROM currencies WHERE currencyCode = 'USD'), 'en'),
('userId2', 'Jane Smith', 'jane.smith@example.com', 'France', (SELECT currencyId FROM currencies WHERE currencyCode = 'EUR'), 'fr');
