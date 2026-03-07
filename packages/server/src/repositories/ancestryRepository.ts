import prisma from 'src/lib/prisma';
import { Observable, of } from 'rxjs';

export class AncestryRepository {
  setAncestryForId(characterId: string, ancestry: string) {
    prisma.character.update({
      where: { id: characterId },
      data: { ancestry },
    });
  }

  getAncestryForId(characterId: string): Promise<string> {
    return prisma.character
      .findUnique({
        where: { id: characterId },
        select: { ancestry: true },
      })
      .then((character) => character?.ancestry || '');
  }
}
