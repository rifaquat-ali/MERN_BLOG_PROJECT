
import { GridFsStorage } from "multer-gridfs-storage"
import dotEnv from "dotenv"
import multer from "multer"

dotEnv.config()
const user =process.env.DB_USERNAME
const pwd= process.env.DB_PASSWORD

const storage = new GridFsStorage({
    url: `mongodb+srv://${user}:${pwd}@dhaujia-cluster.kbhbhvo.mongodb.net/?retryWrites=true&w=majority&appName=Dhaujia-Cluster`,
    options: {},
    file: (request,file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"]
        
        if (match.indexOf(file.mimeType) === -1) {//if not found 
         return `${Date.now()}-blogworld-${file.originalname}`
        }
        return {
          bucketName: "photos",
          filename: `${Date.now()}-blogworld-${file.originalname}`,
        };
        }
});

export default multer({storage})