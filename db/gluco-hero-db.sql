-- Drop the database if it exists and then create it
CREATE DATABASE glucohero;
USE glucohero;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    birthday DATE NOT NULL DEFAULT,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    user_level VARCHAR(10) DEFAULT 'regular'
);

CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATETIME NOT NULL,
    bs DECIMAL,
    insulin INT,
    giver VARCHAR(10),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


CREATE TABLE MedDose (
    medication_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    bs_l1 DECIMAL,
    d_l1 INT,
    bs_l2 DECIMAL,
    d_l2 INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Insert sample data

INSERT INTO Users (username, password, email, birthday, created_at, user_level)
VALUES
('johndoe', 'hashed_password', 'johndoe@example.com', '1989-05-08', '2024-01-01 09:00:00', 'regular'),
('janedoe', 'hashed_password', 'janedoe@example.com', '1989-05-08', '2024-01-02 10:00:00', 'admin'),
('alice_jones', 'hashed_password', 'alice@example.com', '1989-05-08', '2024-01-04 08:30:00', 'regular'),
('bob_brown', 'hashed_password', 'bob@example.com', '1989-05-08', '2024-01-05 07:45:00', 'regular');

INSERT INTO DiaryEntries (user_id, entry_date, bs, insulin, giver, notes, created_at)
VALUES
(1, '2024-01-10', 7.5, 8, 'NovoRapid', '2024-01-10 20:00:00'),
(2, '2024-01-11',  6.0, 7, 'NovoRapid', '2024-01-11 21:00:00'),
(3, '2024-01-12', 8.0, 6, 'Lantus', '2024-01-12 22:00:00'),
(4, '2024-01-13', 5.0, 9, 'Lantus', '2024-01-13 18:00:00'),
(4, '2024-01-14', 5.0, 8, 'Novorapid', '2024-01-14 19:00:00');

INSERT INTO MedDose (user_id, name, bs_l1, d_l1, bs_l2, d_l2, notes, created_at)
VALUES
(1,'NovoRapid', 9, 4, 6, 2, 'add 1IU every second bs value after 9', '2024-01-10 20:00:00'),
(2,'NovoRapid', 9, 4, 6, 2, 'add 1IU every second bs value after 9', '2024-01-11 20:00:00'),
(1,'NovoRapid', 9, 4, 6, 2, 'add 1IU every second bs value after 9', '2024-01-12 20:00:00'),
(3,'NovoRapid', 9, 4, 6, 2, 'add 1IU every second bs value after 9', '2024-01-13 20:00:00'),
