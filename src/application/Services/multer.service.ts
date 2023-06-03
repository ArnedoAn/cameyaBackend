import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/uploads");
  },

  filename: function (req, file, cb) {
    const dni = req.body.dni;
    const originalname = file.originalname;
    const extension = originalname.split(".").pop();
    const newName = `${dni}.${extension}`;
    cb(null, newName);
  },
});

const upload = multer({ storage: storage });

export default upload;
