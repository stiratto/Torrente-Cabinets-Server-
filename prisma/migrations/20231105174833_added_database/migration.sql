-- CreateTable
CREATE TABLE "Dealer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company_email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirm_password" TEXT NOT NULL,
    "companyvendor_name" TEXT NOT NULL,
    "ein" TEXT NOT NULL,
    "company_address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "personal_email" TEXT NOT NULL,
    "company_description" TEXT NOT NULL,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_company_email_key" ON "Dealer"("company_email");
