CREATE DATABASE believers_conference;

USE believers_conference;

CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    church_name VARCHAR(100),
    phone VARCHAR(15) NOT NULL,
    boarding_status ENUM('Boarder', 'Daytime') NOT NULL,
    unique_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

alter table registrations
add column role ENUM('Delegate', 'Pastor', 'Host', 'Guest Speaker') NOT NULL;
