//import { CheckService } from "../domain/use-cases/check/check-service";
//import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugins";
import { EmailService } from "./email/email.service";
import { SendLogEmail } from "../domain/use-cases/email/send-email-logs";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
);

const emailService = new EmailService();

export class Server {

    public static start() {

        console.log('Serve start', envs);
/**
 * Con caso de uso 
 
        new SendLogEmail(emailService, fileSystemLogRepository).execute([
             'mynorsaul@gmail.com',
            'mynorg@puertoquetzal.gob.gt'
        ]);
*/
/**
 *  envio de correo con logs del sistema adjuntos

        const emailService = new EmailService();
        emailService.sendEmailWithFileSystemLogs([
            'mynorsaul@gmail.com',
            'mynorg@puertoquetzal.gob.gt'
        ]);
 */
        // //console.log('Server started ...');

        //  CronService.createJob(
        //      '*/5 * * * * *',
        //      () => {
        //          const url = 'https://www.google.com ';
        //          //const url = 'http://localhost:3000'
        //          new CheckService(
        //              fileSystemLogRepository,
        //              () => console.log(`${ url } is ok`),
        //              (error: String) =>  console.log('Error el servicio ha fallado ' + error)
        //          ).execute(url);
        //         // new CheckService().execute('http://localhost:3000');

        //      }
        //  );

/*      envio de correo con mensaje de prueba 

        const emailService = new EmailService();
        emailService.sendEmail({
            to: 'mynorsaul@gmail.com',
            subject: 'Test email from NodeJS',
            htmlBody: `<h1> Correo de prueba desde Node JS </h1>
            <p> This is a test email sent using nodemailer and gmail service. </p>
            `

        }); */

    }



}



