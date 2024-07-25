import { extname } from 'path';

export const fileFilter = (req, file, callback) => {
  if (
    !file.originalname.match(
      /\.(webp|WEBP|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|xlsx|pdf)$/,
    )
  ) {
    return callback(new Error('File format invalid.'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = Math.floor(Date.now() / 1000);
  const fileExtName = extname(file.originalname);

  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
