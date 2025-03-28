const express = require('express')

const port = 3000
const app = express()
app.use(express.json())

require("dotenv").config();

const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

app.use('/categories', require('./routes/categoryRoutes'))
app.use('/products', require('./routes/productsRoutes'))

app.listen(port, ()=>console.log(`Server Started on Port ${port}`))

module.exports = app;