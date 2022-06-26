import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/epub+zip' || file.mimetype === 'application/pdf') {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only .jpg, .jpeg, .epub and pdf formats are allowed!'))
        }
    }
})
const cpUpload = upload.fields([{ name: 'pdfRU', maxCount: 1 }, { name: 'pdfEN', maxCount: 1 }, { name: 'pdfAM', maxCount: 1 },
{ name: 'epubRU', maxCount: 1 }, { name: 'epubEN', maxCount: 1 }, { name: 'epubAM', maxCount: 1 }, { name: 'image', maxCount: 1 }])

export default cpUpload