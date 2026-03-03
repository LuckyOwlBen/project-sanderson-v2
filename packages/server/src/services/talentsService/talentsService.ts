import { TalentsRequest } from '@project-sanderson/shared/dtos/requests/talentsRequest';
import { TalentsResponse } from '@project-sanderson/shared/dtos/responses/talentsResponse';

export class TalentsService {
  getTalentsForCharacter(characterData: TalentsRequest): TalentsResponse {
    return new TalentsResponse();
  }
}
