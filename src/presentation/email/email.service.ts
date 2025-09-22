import nodemail from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
//import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface sendEmailOptions {
    to: string| string[];
    subject: string;
    htmlBody: string; 
    attachment: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporte = nodemail.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor (
       // private readonly logRepository: LogRepository,
    ) {}

    async sendEmail(options: sendEmailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachment = [] } = options;

        try {

            const sentInformation = await this.transporte.sendMail({
                to: to,
                //from: envs.MAILER_EMAIL,
                subject: subject,
                html: htmlBody,
                attachments: attachment
            });

            console.log('Email sent', sentInformation);
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Email sent to ${ to } with subject ${ subject }`,
                origin: 'email.service.ts'
            });
          //  this.logRepository.saveLog(log);

            return true;
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `Email not sent`,
                origin: 'email.service.ts'
            });
          //  this.logRepository.saveLog(log);
            console.log(error)
            return false;
        }

    }

    /**
     * 
     * @param to metodo para enviar email com logs do sistema
     * con attachments
     */
    async sendEmailWithFileSystemLogs( to: string| string[] ){
        const subject = 'Logs do sistema';
        const htmlBody = `
                <h3>Logs de sistema - NOC</h3>
                <p>Lorem velit non veniam ullamco ex eu laborum deserunt est amet elit nostrud sit. Dolore ullamco duis in ut deserunt. Ad pariatur labore exercitation adipisicing excepteur elit anim eu consectetur excepteur est dolor qui. Voluptate consectetur proident ex fugiat reprehenderit exercitation laboris amet Lorem ullamco sit. Id aute ad do laborum officia labore proident laborum. Amet sit aliqua esse anim fugiat ut eu excepteur veniam incididunt occaecat sit irure aliquip. Laborum esse cupidatat adipisicing non et cupidatat ut esse voluptate aute aliqua pariatur.</p>
                <p>Ver logs adjuntos</p>
        `;
        const attachment: Attachment[] = [
                { filename: 'all-logs.log', path: './logs/all-logs.log' },
                { filename: 'all-high.log', path: './logs/all-high.log' },
                { filename: 'all-medio.log', path: './logs/all-medio.log' },

        ];

        return this.sendEmail({ to, subject, htmlBody, attachment });  

    }

}