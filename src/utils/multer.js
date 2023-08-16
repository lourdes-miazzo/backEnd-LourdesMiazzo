import multer from "multer"
import { resolve } from "path"

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = ''
        
        if (file.fieldname === 'profiles') {
            folder = 'profiles';
          } else if (file.fieldname === 'products') {
            folder = 'products';
          } else {
            folder = 'documents';
          }
        cb(null, resolve(`./src/public/${folder}`));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

export const uploader= multer({storage})

