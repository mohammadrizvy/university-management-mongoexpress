import { v2 as cloudinary } from 'cloudinary';
export const imageToCloudinary = () => {
  // Configuration
  cloudinary.config({
    cloud_name: 'dc4zihva5',
    api_key: '175829349937679',
    api_secret: 'jTDHOq5xUmK-Mag16vjYeAwck_c', // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      {
        public_id: 'shoes',
      },
    )
    .catch((error) => {
      console.log(error);
    });
};
