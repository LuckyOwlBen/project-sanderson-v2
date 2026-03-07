import express, { Request, Response } from 'express';
import { ApiResponse } from '../lib/types.js';
import { IdentityService } from '../services/identityService/identityService.js';

export class IdentityRoutes {
  private router = express.Router();

  private identityService: IdentityService;

  constructor() {
    this.initializeRoutes();
    this.identityService = new IdentityService();
  }

  private initializeRoutes() {
    this.router.get('/new', this.createNewIdentity.bind(this));
  }

  private async createNewIdentity(req: Request, res: Response) {
    try {
      const response = await this.identityService.createNewIdentity();
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
