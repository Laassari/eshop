-- CreateEnum
CREATE TYPE "role_type" AS ENUM ('user', 'admin', 'superadmin');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "price_cents" INTEGER NOT NULL,
    "image_url" VARCHAR(100) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_DATE,
    "updated_at" DATE NOT NULL DEFAULT CURRENT_DATE
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_DATE,
    "role" "role_type" NOT NULL DEFAULT 'user',
    "updated_at" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_pkey" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

