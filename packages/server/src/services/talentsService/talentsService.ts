export interface TalentsRequest {
  [key: string]: any;
}

export class TalentsResponse {
  data?: TalentsRequest;

  constructor(data?: TalentsRequest) {
    this.data = data;
  }
}

export class TalentsService {
  getTalentsForCharacter(characterData: TalentsRequest): TalentsResponse {
    return new TalentsResponse(characterData);
  }
}
