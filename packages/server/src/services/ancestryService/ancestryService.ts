import { AncestryRepository } from '../../repositories/ancestryRepository';
import { Observable } from 'rxjs';

export class AncestryService {
  private ancestryRepository: AncestryRepository;

  constructor() {
    this.ancestryRepository = new AncestryRepository();
  }

  setAncestryForId(characterId: string, ancestry: string) {
    this.ancestryRepository.setAncestryForId(characterId, ancestry);
  }

  getAncestryForId(characterId: string): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.ancestryRepository
        .getAncestryForId(characterId)
        .then((ancestry) => {
          subscriber.next(ancestry);
          subscriber.complete();
        })
        .catch((error) => subscriber.error(error));
    });
  }
}
