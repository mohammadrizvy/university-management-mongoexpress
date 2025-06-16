import { v2 as cloudinary } from 'cloudinary';

export const imageToCloudinary = async () => {
  // Configuration
  cloudinary.config({
    cloud_name: 'dc4zihva5',
    api_key: '175829349937679',
    api_secret: 'jTDHOq5xUmK-Mag16vjYeAwck_c', // Click 'View API Keys' above to copy your API secret
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