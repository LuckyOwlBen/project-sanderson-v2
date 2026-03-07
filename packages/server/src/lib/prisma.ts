import 'dotenv/config';
import { PrismaClient } from '../generated/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('./prisma/dev.db');
const adapter = new PrismaBetterSqlite3(sqlite);
const prisma = new PrismaClient({ adapter });

export default prisma;
