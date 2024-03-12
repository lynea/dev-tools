-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "organizationId" TEXT;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
