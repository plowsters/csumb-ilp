
-- Create users table for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create sessions table for Lucia auth
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TIMESTAMP NOT NULL
);

-- Create assignments table for storing course assignments and resources
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT,
    file_type VARCHAR(100),
    type VARCHAR(20) DEFAULT 'assignment', -- 'assignment' or 'resource'
    created_at TIMESTAMP DEFAULT NOW(),
    position INTEGER,
    screenshot_url TEXT
);

-- Insert admin user (replace 'bug' with your desired username)
INSERT INTO users (username) VALUES ('bug');

-- Create indexes for better performance
CREATE INDEX idx_assignments_course_code ON assignments(course_code);
CREATE INDEX idx_assignments_type ON assignments(type);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Add screenshot_url column if it doesn't exist (for existing databases)
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS screenshot_url TEXT;
