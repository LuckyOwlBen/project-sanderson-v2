import { Ancestry } from '../../character/ancestry/ancestry';

export class AncestryResponse {
  ancestry: Ancestry;

  constructor(ancestry: Ancestry) {
    this.ancestry = ancestry;
  }
}
