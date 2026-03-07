import { Character } from '../generated/client.js';
import prisma from '../lib/prisma.js';

export class IdentityRepository {
  async createNewCharacter(): Promise<string> {
    const character = await prisma.character.create({
      data: {} as any,
    });

    return character.id;
  }
}
