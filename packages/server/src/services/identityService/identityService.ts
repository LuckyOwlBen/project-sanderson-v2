import { IdentityRepository } from '../../repositories/identityRepository.js';
import { IdentityResponse } from '../../lib/identityResponse.js';

export class IdentityService {
  private identityRepository: IdentityRepository;

  constructor() {
    this.identityRepository = new IdentityRepository();
  }

  async createNewIdentity() {
    const id = await this.identityRepository.createNewCharacter();
    return new IdentityResponse(id);
  }
}
