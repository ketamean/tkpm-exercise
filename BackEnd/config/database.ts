import { Client } from 'pg'
import * as dotenv from 'dotenv';
dotenv.config()

const API_KEY: string = process.env.DB_API_KEY || '';
const DATABASE_URL: string = process.env.DB_DATABASE_URL || '';

const client = new Client({
    connectionString: DATABASE_URL
});
(async () => {
    await client
        .connect()
        .then(() => console.log("Connected to the database"))
        .catch((err) => console.error("Connection error", err.stack));
})();

export default client;