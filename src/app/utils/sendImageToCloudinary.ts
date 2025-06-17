import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';

export const imageToCloudinary = async () => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secrect,
  });

  await cloudinary.uploader
    .upload(
      'https://i.pinimg.com/1200x/65/54/a1/6554a14fc3e3d30cb9b49f032c79c484.jpg',
      {
        public_id: 'babypig',
      },
    )
    .then(function (result) {
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/Uploads/" );
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
