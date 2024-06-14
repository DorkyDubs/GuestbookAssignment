import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
// se app to read json

app.use(express.json());
// configure dotenv
dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

const PORT = 8080;
const firstEndpoint = "noodles";

app.listen(PORT, () => {
  console.log(`server up at Port ${PORT}`);
});

//make end point for root route to READ data

app.get("/", (req, res) => {
  res.json({ message: "Root road" });
});

// create endpoint to read data from  table
// need to inlude async and awaitt as supabase is  an API and don't know how long it will take to respond

app.get("/pets", async (req, res) => {
  // write a sql query that selects data fromthe database
  const result = await db.query(`SELECT * FROM PETS`);
  console.log(result);
  // parse resultinto json and wrangle data from result obj
  res.json(result.rows);
  // rows just give you defined rows
});

// create an endpoint to read specific data from db

app.get("/somePets", async function (request, response) {
  // write a sql query that SELECTS specific data from datat base
  const result = await db.query(`SELECT * FROM PETS WHERE grade=100
      `);
  response.json(result.rows);
});
