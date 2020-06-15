CREATE TABLE dragon(
    id             SERIAL PRIMARY KEY,
    nickname       VARCHAR(64),
    birthday       TIMESTAMP NOT NULL,
    "generationId" INTEGER,
    FOREIGN KEY ("generationId") REFERENCES generation(id)

);