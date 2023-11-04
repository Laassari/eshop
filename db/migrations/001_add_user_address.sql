CREATE TABLE "user_address" (
	"id" serial PRIMARY KEY,
	"user_id" INTEGER UNIQUE NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	"city" VARCHAR(90) NOT NULL,
	"zip_code" VARCHAR(10),
	"address" VARCHAR(255) NOT NULL
)