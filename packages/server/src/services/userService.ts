import { PrismaClient } from '@prisma/client';
import { User } from '@sanderson/shared';

const prisma = new PrismaClient();

export async function getAllUsers(): Promise<User[]> {
  // Cast Prisma result to our shared User type
  return (await prisma.user.findMany()) as User[];
}

export async function getUserById(id: number): Promise<User | null> {
  return (await prisma.user.findUnique({
    where: { id },
  })) as User | null;
}

export async function createUser(email: string, name?: string): Promise<User> {
  return (await prisma.user.create({
    data: { email, name },
  })) as User;
}
