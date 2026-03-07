import express, { Request, Response } from 'express';
import { ApiResponse } from '@project-sanderson/shared';
import { AncestryService } from 'src/services/ancestryService/ancestryService';

export class AncestryRoutes {
  private router = express.Router();

  private ancestryService: AncestryService;

  constructor() {
    this.initializeRoutes();
    this.ancestryService = new AncestryService();
  }

  private initializeRoutes() {
    this.router.post('/set', this.setAncestryForId.bind(this));
    this.router.get('/get', this.getAncestryForId.bind(this));
  }

  private async setAncestryForId(req: Request, res: Response) {
    try {
      const { characterId, ancestry } = req.body;
      this.ancestryService.setAncestryForId(characterId, ancestry);
      const response: ApiResponse<null> = { success: true, data: null };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Invalid request',
      };
      res.status(400).json(response);
    }
  }

  private async getAncestryForId(req: Request, res: Response) {
    try {
      const { characterId } = req.query;
      const ancestry = await this.ancestryService
        .getAncestryForId(characterId as string)
        .toPromise();
      const response: ApiResponse<string> = { success: true, data: ancestry };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Invalid request',
      };
      res.status(400).json(response);
    }
  }
}
