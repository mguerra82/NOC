import { log } from "console";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';





export class FileSystemDataSource  implements LogDataSource   {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/all-logs.log';
    private readonly mediumLogsPath = 'logs/all-medio.log';
    private readonly highLogsPath = 'logs/all-high.log';

    constructor() {
        this.createLogsFiles();
    }
    

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path => {
            if (fs.existsSync(path)) return
            fs.writeFileSync(path, '');
        })

    }



    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog) }\n`;

        /**
         * appendFileSync: Agrega datos al final de un archivo. Si el archivo no existe, se crea.
         */
        fs.appendFileSync(this.allLogsPath, logAsJson);

        if (newLog.level === LogSeverityLevel.low) return;

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        }else{
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
        
    }


    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );

        return logs;
    }

   async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);          
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);          
            default:
               throw new Error(`${ severityLevel } not implemented`);
        }
                
    }
    // Implementación concreta para guardar logs en el sistema de archivos
}