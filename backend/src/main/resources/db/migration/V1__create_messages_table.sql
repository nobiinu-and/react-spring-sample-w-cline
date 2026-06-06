CREATE TABLE IF NOT EXISTS messages (
    id         BIGSERIAL    PRIMARY KEY,
    content    VARCHAR(255) NOT NULL,
    created_at TIMESTAMP
);

ALTER TABLE messages
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP;
