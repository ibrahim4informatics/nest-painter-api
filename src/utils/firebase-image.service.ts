import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin'
@Injectable()
export class FirebaseImageService {
    private readonly storage: admin.storage.Storage;
    constructor() {
        const serviceAccount = require('../../conf/painter-24812-firebase-adminsdk-6d5so-438eb54c9f.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.BUCKET
        })

        this.storage = admin.storage();
    }

    async uploadFile(file: Express.Multer.File, fileName: string) {
        const bucket = this.storage.bucket();
        const upload = bucket.file(fileName);
        await upload.save(file.buffer, { metadata: { 'contentType': file.mimetype } })
        return `gs://${bucket.name}/${fileName}`;
    }
}