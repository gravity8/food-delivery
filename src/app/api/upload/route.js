import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3"
import uniqid from 'uniqid'

export const POST = async (req) =>{

    const data = await req.formData();

    if(data.get('file')){
        const file = data.get('file');

        const s3Client = new S3Client({
            region: 'eu-north-1',
            credentials: {
              accessKeyId: process.env.MY_AWS_ACCESS_KEY,
              secretAccessKey: process.env.M_AWS_SECRET_KEY,
            },
          });

        const fileExtension = file.name.split(".").slice(-1)[0];
        const newFileName = uniqid()+"."+fileExtension;

        const chunks = []
        for await (const chunk of file.stream()){
            chunks.push(chunk)
        }

        const buffer = Buffer.concat(chunks);
        const bucket = "food-ordering-gravity";
        await s3Client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: 'public-read',
        ContentType: file.type,
        Body: buffer,
        }));

        const link = 'https://'+bucket+'.s3.amazonaws.com/'+newFileName;
    return Response.json(link);

    }
    return Response.json(true)
}