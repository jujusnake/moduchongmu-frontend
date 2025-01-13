import axios from 'axios';
import imageCompression, { Options } from 'browser-image-compression';

const uploadImageToS3 = async (url: string, image: File | string | null) => {
  try {
    let targetImage: File | null = null;
    if (image instanceof File && image.size > 524288) {
      targetImage = await compressImage(image);
    }
    await axios.put(url, targetImage || image);
  } catch (e) {
    return null;
  }
};

const compressImage = async (file: File, options?: Options) => {
  try {
    const resizedBlob = await imageCompression(file, {
      maxSizeMB: 0.5,
      ...options,
    });
    return resizedBlob;
  } catch (e) {
    console.log(`Image compressing failed`);
    return null;
  }
};

export { uploadImageToS3, compressImage };
