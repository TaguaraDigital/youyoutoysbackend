const { cloudinary } = require('../utils/cloudinary');
const controllerImages = {};


controllerImages.load = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'tg_base1',
        });
        console.log(uploadResponse);
        res.json({
            data:  uploadResponse,
            msg: 'ok',
         });
        

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: 500,
            success: false,
            message: "Server Error"
        })
    }
}

module.exports = controllerImages;