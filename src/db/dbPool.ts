import { Pool } from 'pg';

const dbPool = new Pool({
    user: process.env.APP_DB_POSTGRES_USER,
    password: process.env.APP_DB_POSTGRES_PASSWORD,
    host: 'squad-postgres',
    port: Number(process.env.APP_DB_POSTGRES_CONTAINER_PORT),
    database: process.env.APP_DB_POSTGRES_DB,
});
  
export default dbPool;