
const path = require("path");
const multer = require('multer');
const fs = require('fs');

const {body,param} = require("express-validator")

const storage = multer.diskStorage({
    destination:'./uploads/All_Images/',

    filename:(req , file , cb)=>{
       return cb(null ,  new Date().toLocaleDateString().replace(/\//g,"-")+"--"+file.originalname)
    }
})

const multerFilter = (req, file, cb) =>{
	if(file.mimetype.startsWith('image')){
		cb(null,true)
	} else{
        cb("Not an image! please upload only image.",false);
	}
}

module.exports.upload = multer({
    storage: storage,
    fileFilter:multerFilter,
    limits:1024*1024*5
});

module.exports.storeImageInSpecificFolder =(request,inputCategory)=>{
    const originalFilename = request.file.originalname;
    const categoryFolders = {
        'Junior Suits': 'Junior_Suits_images',
        'Family Room': 'Family_Room_images',
        'Double Room': 'Double_Room_images',
        'Deluxe Room': "Deluxe_Room_images",
        'Superior Room': "Superior_Room_images"
    };
    
    for (const folderPath of Object.values(categoryFolders)) {
        const fullPath = path.join('./uploads', folderPath);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath);
        }
    }

    const categoryFilePaths = {};
    for (const [category, folderPath] of Object.entries(categoryFolders)) {
        if (category === inputCategory) {
            categoryFilePaths[category] = path.join("./uploads", folderPath, originalFilename);
        }
    }

    fs.copyFileSync(request.file.path, categoryFilePaths[inputCategory]);
}

module.exports.imageBodyValidation=[
    body('id').isInt().optional().withMessage("Room ID is not valid"),
    body('category').isString().optional().withMessage("Category is not valid")
]

module.exports.imageParamsValidation = [
    param('id').isInt().withMessage("Invalid id...Please enter integer number")
]


