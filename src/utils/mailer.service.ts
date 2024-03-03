
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
    private readonly transporter: nodemailer.Transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })
    }

    sendMail(mailOptions: nodemailer.SendMailOptions): { err: any | null, status: number } {

        try {

            this.transporter.sendMail(mailOptions)
            return { err: null, status: 0 }

        }

        catch (err) {
            return { err, status: -1 }
        }

    }
}