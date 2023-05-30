import multer from "multer";
import { UserService } from "../repository/index.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.includes('image/png')) {
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
    filename: async (req, file, cb) => {
        const uid = req.params.uid;
        if (file.originalname.includes('.pdf')) {
            if (file.originalname.includes('identificacion')) {
                const docName = `${uid}-${file.originalname}`;
                const path = `files/documents/${docName}`
                await UserService.addDocs(uid, 'identificacion', path);
                cb(null, docName);
            }
            if (file.originalname.includes('comprobante de domicilio')) {
                const docName = `${uid}-${file.originalname}`;
                const path = `files/documents/${docName}`
                await UserService.addDocs(uid, 'comprobante de domicilio', path);
                cb(null, docName);
            }
            if (file.originalname.includes('comprobante de estado de cuenta')) {
                const docName = `${uid}-${file.originalname}`;
                const path = `files/documents/${docName}`
                await UserService.addDocs(uid, 'comprobante de estado de cuenta', path);
                cb(null, docName);
            }
        }
        cb(null, `${Date.now()}-${uid}-${file.originalname}`);
    }
});

function fileFilter(req, file, cb){
    // Comprueba si se desea procesar el archivo

    if (!file.originalname.includes('.pdf') && !file.originalname.includes('.png')) return cb(null, false);
    
    if(file.originalname.includes('.pdf')){
        if (!file.originalname.includes('identificacion') && !file.originalname.includes('comprobante de domicilio') && !file.originalname.includes('comprobante de estado de cuenta')){
            return cb(null, false);
        }
    }
    if (file.originalname.includes('.png')) {
        if (!file.originalname.includes('profile') && !file.originalname.includes('product')) {
            return cb(null, false);
        }
    }
    return cb(null, true);
}

const upl = multer({ storage: storage, fileFilter });

export const upload = upl.single('myFile');