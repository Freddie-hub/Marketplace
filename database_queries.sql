-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebase_uid VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('farmer', 'buyer', 'admin') DEFAULT 'farmer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rice table
CREATE TABLE rice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(64) UNIQUE NOT NULL,
    farmer_id INT,
    miller_id INT,
    transaction_datetime DATETIME NOT NULL,
    quantity_bags INT,
    total_weight_kg DECIMAL(10,2),
    warehouse_details TEXT,
    warehouse_receipt TEXT,
    type ENUM('Pishori', 'BW196', 'NERICA', 'Other'),
    processing_method ENUM('white', 'brown', 'parboiled'),
    lot_number VARCHAR(100),
    grain_type VARCHAR(100),
    grade VARCHAR(50),
    moisture_content DECIMAL(5,2),
    certification SET('KEBS', 'Organic', 'Fortified'),
    packaging_details TEXT,
    unit_price DECIMAL(10,2),
    location VARCHAR(255),
    FOREIGN KEY (farmer_id) REFERENCES users(id),
    FOREIGN KEY (miller_id) REFERENCES users(id)
);

-- Avocado table
CREATE TABLE avocado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(64) UNIQUE NOT NULL,
    farmer_id INT,
    transaction_datetime DATETIME NOT NULL,
    quantity_cartons INT,
    total_weight_kg DECIMAL(10,2),
    warehouse_details TEXT,
    warehouse_receipt TEXT,
    variety ENUM('Hass', 'Fuerte', 'Other'),
    processing_method SET('sorted', 'cleaned', 'waxed'),
    lot_number VARCHAR(100),
    size_count VARCHAR(50),
    grade ENUM('1', '2'),
    maturity_indicators TEXT,
    certification SET('Organic', 'GlobalG.A.P.', 'Fairtrade'),
    packaging_details TEXT,
    unit_weight_kg DECIMAL(5,2),
    unit_price DECIMAL(10,2),
    location VARCHAR(255),
    FOREIGN KEY (farmer_id) REFERENCES users(id)
);

-- Potatoes table
CREATE TABLE potatoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(64) UNIQUE NOT NULL,
    farmer_id INT,
    transaction_datetime DATETIME NOT NULL,
    quantity_bags INT,
    total_weight_kg DECIMAL(10,2),
    storage_details TEXT,
    storage_receipt TEXT,
    variety ENUM('Shangi', 'Dutch Robjin', 'Other'),
    processing_method ENUM('sorted'),
    lot_number VARCHAR(100),
    packaging_type VARCHAR(100),
    grade_quality VARCHAR(100),
    harvest_date DATE,
    certification SET('KEPHIS'),
    storage_condition TEXT,
    unit_price DECIMAL(10,2),
    location VARCHAR(255),
    FOREIGN KEY (farmer_id) REFERENCES users(id)
);

-- Coffee table
CREATE TABLE coffee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(64) UNIQUE NOT NULL,
    farmer_id INT,
    miller_id INT,
    transaction_datetime DATETIME NOT NULL,
    quantity_bags INT,
    total_weight_kg DECIMAL(10,2),
    warehouse_details TEXT,
    warehouse_warrant TEXT,
    type ENUM('Arabica', 'Robusta'),
    processing_method VARCHAR(100),
    lot_number VARCHAR(100),
    outturn_number VARCHAR(100),
    grade VARCHAR(100),
    cup_profile TEXT,
    cupping_score_class VARCHAR(100),
    cupper_details TEXT,
    certification TEXT,
    location VARCHAR(255),
    FOREIGN KEY (farmer_id) REFERENCES users(id),
    FOREIGN KEY (miller_id) REFERENCES users(id)
);