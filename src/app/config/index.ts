import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
const envFile = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
export default envFile;
