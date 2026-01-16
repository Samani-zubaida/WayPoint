import express from 'express';      
import dotenv from 'dotenv';
dotenv.config(); 
import userRouters from './routes/userRoutes.js';
import { connectDB } from "./lib/db.js";
import PostRouters from './routes/postRoutes.js';
import exploreRouter from "./routes/exploreRouter.js";
import OpenAI from "openai";
import chatRoutes from "./routes/chatRoutes.js"
import geocodeRouter from "./routes/MapRoutes/geocodeRoutes.js";
import locationRouter from "./routes/MapRoutes/locationRoutes.js";
import uploadRouter from "./routes/MapRoutes/uploadRoutes.js";
import placeRouter from "./routes/MapRoutes/placesRoute.js";
import routeRouter from "./routes/MapRoutes/routeRoutes.js";
import streetViewRouter from "./routes/MapRoutes/streetRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";



import cors from 'cors';
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from backend");
});

app.use(cors());
app.use(express.json()); //

app.use((req, res, next) => {
  console.log("Raw body:", req.body);
  next();
});

app.use('/api/users', userRouters);
app.use("/api/posts" , PostRouters);
app.use("/api/explore" , exploreRouter);
app.use("/api/chat", chatRoutes);
app.use("/api/map/geocode",geocodeRouter);
app.use("/api/map/location",locationRouter);
app.use("/api/map/upload",uploadRouter);
app.use("/api/map/places", placeRouter);
app.use("/api/map/route", routeRouter);
app.use("/api/map/streetview", streetViewRouter);
app.use("/api/conversations", conversationRoutes);


app.listen(5000, () => {
    console.log('Server running on port 5000');
    connectDB();
});

