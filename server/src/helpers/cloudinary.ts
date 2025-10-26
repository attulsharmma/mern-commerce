import {v2 as cloudinary} from "cloudinary";
import multer from "multer";
const storage = multer.memoryStorage();
const imageUploadUtil = async(file:any)=>{
    cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
    const result = await cloudinary.uploader.upload(file,{
        resource_type:"auto"
    })
    return {url: result.url}
}
const upload = multer({storage});
export {
    upload,
    imageUploadUtil
}
