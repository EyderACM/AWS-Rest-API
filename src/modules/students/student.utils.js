import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { Student } from "../models";
import config from "../../config";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey,
    sessionToken: config.aws.sessionToken,
  },
  region: config.aws.region,
});

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: config.aws.bucket,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: "public-read",
    key: async function (req, file, cb) {
      const { id: studentId } = req.params;
      const student = await Student.findByPk(studentId);

      if (!student) throw new Error("No student found");

      cb(null, `fotos/${studentId}_fotoPerfil_${file.originalname}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});
