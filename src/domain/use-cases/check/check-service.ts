import { error } from "console";
import { LogRepository } from "../../repository/log.repository";
import { LogSeverityLevel, LogEntity } from "../../entities/log.entity";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;

}

type SuccessCallback = () => void;
type ErrorCallback = (error: String) => void;



export class CheckService implements CheckServiceUseCase {  

   constructor(
    private readonly logRepository: LogRepository,
     private readonly successCallback: SuccessCallback,
     private readonly errorCallback: ErrorCallback        

   ) {}

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
              
            if (!req.ok) {
                throw new Error(`Servicios no esta en linea.!' ${url}`);
            }
            const log = new LogEntity({ 
                message: `Service ${ url } is ok`, 
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog( log );
            this.successCallback();
            //console.log(` ${url} is ok ...`);
            return true;
        } catch (error) {

            const errorMessage = `${url}is not ok,  ${error}`;
            const log = new LogEntity({
                message: errorMessage, 
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log);
            this.errorCallback(errorMessage);
            //console.log(`${error}`);
            return false;
        }
        
      

    }

}