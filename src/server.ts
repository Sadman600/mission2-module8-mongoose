import app from './app';
import mongoose from 'mongoose';
// import config from "./app/config";
import envFile from './app/config';

const port = envFile.port;
const databaseUrl = envFile.database_url;

async function main() {
  try {
    await mongoose.connect(databaseUrl as string);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
