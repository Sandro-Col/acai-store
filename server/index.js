import dotenv from "dotenv";
dotenv.config(); // dotenv docummentation says to initialize ASAP
import connectToDatabase from "./db.js";
import express from "express"; // We are creating a express server
import cors from "cors";

// Routes
import productRoutes from "./routes/productRoutes.js";


connectToDatabase();
const app = express(); // initializing express server
app.use(express.json()); // to set the type of information that we are sending
app.use(cors()); // to let the server knows that we have cors and want to make use of it

const port = 5004; // to set the port that our server will run

app.use('/api/products', productRoutes);

// HOW TO TEST THE CONNECTION TO THE DB:  localhost:5001/api/products

app.get('/', (req, res) => {
    res.send('Api is running...');
});

app.listen(port, () => {
  console.log('Server runs on port ', port);
});

// AdminTechlines
// 2IxnmQuTEzQYjJWV