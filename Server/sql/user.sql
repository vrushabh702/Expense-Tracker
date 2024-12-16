CREATE TABLE users (
    userId VARCHAR(255) PRIMARY KEY,
    userName VARCHAR(255),
    userEmail VARCHAR(255),
    userCountry VARCHAR(255),
    currencyId INT,
    language VARCHAR(10),
    FOREIGN KEY (currencyId) REFERENCES currencies(currencyId)
);
