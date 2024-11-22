ALTER TABLE registrations
ADD COLUMN role ENUM('Delegate', 'Pastor', 'Deacon', 'BDC Committee') NOT NULL DEFAULT 'Delegate';