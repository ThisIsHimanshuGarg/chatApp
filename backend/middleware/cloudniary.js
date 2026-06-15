import  cloudinary from "../config/cloudniiaryConnection.js";

const uploadToCloudinary = async (req, res, next) => {
    try {
        // if no files, move forward
        if (!req.files) {
            return next();
        }

        req.imageUrl = [];
        req.videoUrl = [];
        req.audioUrl = [];

        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: "auto",
                folder: "chattingApp"
            });

            if (file.mimetype.startsWith("image")) {
                req.imageUrl.push(result.secure_url);
            }

            else if (file.mimetype.startsWith("video")) {
                req.videoUrl.push(result.secure_url);
            }

            else if (file.mimetype.startsWith("audio")) {
                req.audioUrl.push(result.secure_url);
            }
        }

        return next();

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.status(500).json({
            message: "File upload failed",
            error: error.message
        });
    }
};

export default uploadToCloudinary;

