import express, { Request, Response } from 'express';
import { ApiResponse } from '@sanderson/shared';
import { TalentsService } from '../services/talentsService/talentsService';

export class TalentsRoute {
  private router = express.Router();

  private talentsService: TalentsService;

  constructor() {
    this.initializeRoutes();
    this.talentsService = new TalentsService();
  }

  private initializeRoutes() {
    this.router.post('/', this.getTalentsForCharacter.bind(this));
    this.router.post('/', this.saveTalents.bind(this));
  }

  private async getTalentsForCharacter(req: Request, res: Response) {
    try {
      const response = this.talentsService.getTalentsForCharacter(req.body);
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Invalid request',
      };
      res.status(400).json(response);
    }
  }

  private async saveTalents(req: Request, res: Response) {
    try {
      // Add your logic here
      const response: ApiResponse<any> = { success: true, data: null };
      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Invalid request',
      };
      res.status(400).json(response);
    }
  }

  getRouter() {
    return this.router;
  }
}
