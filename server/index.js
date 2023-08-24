import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js"; 



//Configurations gotten from the packages' github repos.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true })); //
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));  
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //cloud storage irl

//File storage configuration from the github repo of multer for file upload!
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

// Routes that includes files
app.post("/api/auth/register", upload.single("picture"), register); //it's here because we need it to be next to the upload function for the image uploading functionality to work



// Routes that don't need file upload (normal structure)
app.use("/api/auth", authRoutes)



//Mongoose module setup
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));// call back function to display the port 
  })
  .catch((error) => console.log(`${error} did not connect`));