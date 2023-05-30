import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        if(file.mimetype.includes('image/png')){
            if (file.originalname.includes('profile')) {
                cb(null, 'files/profiles');
            }
            if (file.originalname.includes('product')) {
                cb(null, 'files/products');
            } 
        } else {
            if (file.originalname.includes('.pdf')) {
                cb(null, 'files/documents');
            }
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}- ${'user._id'} - ${file.originalname}`);
    }
});

const upl = multer({ storage: storage });

export const upload = upl.single('myFile');