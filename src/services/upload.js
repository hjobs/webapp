import S3 from 'aws-sdk/clients/s3';

export const hjobsAssetsUrlPrefix = "https://assets.hjobs.hk/"

/** @param {File} file */
export const checkError = (file) => {
  if (!file) return "Please choose a file"
  if (file.type.indexOf("image") !== 0) return "Please upload an image";
  if (file.size > 2*1024*1024) return "File is too big. Please upload something within 2MB"
  const fileNameSuffix = file.name.trim().replace("/", "")
  if (!fileNameSuffix) return "Please ensure alphanumerical file names"
  if (fileNameSuffix.split(".").length < 2) return "Please ensure you upload a correct file type, e.g. jpg, JPEG, png, ico, svg"
  return false;
}

export const s3DefaultObject = {
  apiVersion: '2006-03-01',
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET
  }
};

const s3 = new S3(s3DefaultObject);

/** @param {File} file */
const getFileExtension = (file) => {
  if (file.type.indexOf("image/") === 0) return file.type.split("/")[1];
  const fileNameArr = file.name.split(".");
  return fileNameArr[fileNameArr.length - 1];
}

/** if there is no file, will return empty value of promise. */
export const uploadPhoto = ({uriComponents, file}) => {
  return new Promise((resolve, reject) => {
    if (!file) resolve();
    const keyExtension = "." + getFileExtension(file);
    const key = uriComponents.join("/") + keyExtension;
    const encodedKey = uriComponents.map(comp => encodeURIComponent(comp)).join("/") + keyExtension;
    console.log(["keys...", key, encodedKey])
    s3.putObject({
      Bucket: "assets.hjobs.hk",
      Key: key,
      ACL: "public-read-write",
      Body: file,
      ContentType: file.type,
      ContentEncoding: "Base64"
    }, (err, data) => {
      if (err) reject(err.toString());
      resolve(hjobsAssetsUrlPrefix + encodedKey);
    })
  })
}

export const deletePhoto = (url) => {
  if (url.indexOf(hjobsAssetsUrlPrefix) !== 0) return;
  s3.deleteObject({
    Bucket: "assets.hjobs.hk",
    Key: url.replace(hjobsAssetsUrlPrefix, "")
  }, function(err, data) {
    console.log({err, data});
  });
}
