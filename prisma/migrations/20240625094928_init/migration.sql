/*
  Warnings:

  - You are about to drop the column `messagesIds` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `userIds` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the `ConversationUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeenMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConversationUser" DROP CONSTRAINT "ConversationUser_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "ConversationUser" DROP CONSTRAINT "ConversationUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "SeenMessage" DROP CONSTRAINT "SeenMessage_messageId_fkey";

-- DropForeignKey
ALTER TABLE "SeenMessage" DROP CONSTRAINT "SeenMessage_userId_fkey";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "messagesIds",
DROP COLUMN "userIds";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ConversationUser";

-- DropTable
DROP TABLE "SeenMessage";

-- CreateTable
CREATE TABLE "ConversationUsers" (
    "conversationId" TEXT NOT NULL,
    "userIds" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ConversationUsers_conversationId_userIds_key" ON "ConversationUsers"("conversationId", "userIds");

-- AddForeignKey
ALTER TABLE "ConversationUsers" ADD CONSTRAINT "ConversationUsers_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationUsers" ADD CONSTRAINT "ConversationUsers_userIds_fkey" FOREIGN KEY ("userIds") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
