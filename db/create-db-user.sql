-- User creation example, replace 'user' & 'password'
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `GlucoHero`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
