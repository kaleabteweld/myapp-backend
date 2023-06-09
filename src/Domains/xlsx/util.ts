import multer from "multer";

const storage = multer.diskStorage({
    destination: '/uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Create the Multer instance
export const upload = multer({ storage: storage });