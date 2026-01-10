-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('WET_FOOD', 'DRY_FOOD', 'SUPPLEMENT', 'TREATS');

-- CreateTable
CREATE TABLE "Breed" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "coatType" TEXT NOT NULL,
    "characteristics" TEXT[],
    "description" TEXT NOT NULL,
    "officialName" TEXT NOT NULL,
    "otherName" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreedStats" (
    "id" TEXT NOT NULL,
    "breedId" TEXT NOT NULL,
    "maleHeight" TEXT NOT NULL,
    "femaleHeight" TEXT NOT NULL,
    "maleWeight" TEXT NOT NULL,
    "femaleWeight" TEXT NOT NULL,
    "growth" TEXT NOT NULL,
    "adult" TEXT NOT NULL,
    "mature" TEXT NOT NULL,
    "senior" TEXT NOT NULL,

    CONSTRAINT "BreedStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreedRatings" (
    "id" TEXT NOT NULL,
    "breedId" TEXT NOT NULL,
    "coatLength" INTEGER NOT NULL,
    "shedding" INTEGER NOT NULL,
    "grooming" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "vocal" INTEGER NOT NULL,
    "family" INTEGER NOT NULL,
    "otherPets" INTEGER NOT NULL,
    "aloneTime" INTEGER NOT NULL,
    "environment" INTEGER NOT NULL,

    CONSTRAINT "BreedRatings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditorialSection" (
    "id" TEXT NOT NULL,
    "breedId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "EditorialSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fact" (
    "id" TEXT NOT NULL,
    "breedId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Fact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "breedId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "category" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "brandId" TEXT NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "nutrition" TEXT NOT NULL,
    "sizes" TEXT[],
    "link" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Breed_slug_key" ON "Breed"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BreedStats_breedId_key" ON "BreedStats"("breedId");

-- CreateIndex
CREATE UNIQUE INDEX "BreedRatings_breedId_key" ON "BreedRatings"("breedId");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_slug_key" ON "Brand"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_slug_idx" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- AddForeignKey
ALTER TABLE "BreedStats" ADD CONSTRAINT "BreedStats_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreedRatings" ADD CONSTRAINT "BreedRatings_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditorialSection" ADD CONSTRAINT "EditorialSection_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fact" ADD CONSTRAINT "Fact_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faq" ADD CONSTRAINT "Faq_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
