import nodemailer from 'nodemailer';

class MailService {
    private transporter: ReturnType<typeof nodemailer.createTransport>;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT), // Перетворюємо порт на число
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendActivationMail(to: string, link: string): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation ' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>For activation your account, follow the link</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        });
    }
}

export default new MailService();
