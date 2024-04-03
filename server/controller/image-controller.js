import { SERVER_DOMAIN_URL } from "../constants.js"
import grid from "gridfs-stream"
import mongoose  from "mongoose"
let gfs,myGridfsBucket;
const conn = mongoose.connection
conn.once("open", () => {
    myGridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName:"fs"
    })
    
    gfs = grid(conn.db, mongoose.mongo)
    gfs.collection("fs")
})


export function imageUpload(request,response){
    if (!request.file) {
        return response.status(404).json({msg:"File not found"})
    }
    const imageurl = `${SERVER_DOMAIN_URL}/file/${request.file.filename}`
    return response.status(200).json(imageurl)
}

export async function getImage(request, response) {
    console.log(request,"<><>req</></>")
    try {
        const file = await gfs.files.findOne({ filename: request.params.filename })
        console.log("findone>>",file)
        const readStream = myGridfsBucket.openDownloadStream(file._id)
        readStream.pipe(response)
    } catch (e) {
        return response.status(500).json({msg:e.message})
    }
    
}