import { error } from "console";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;

}

type SuccessCallback = () => void;
type ErrorCallback = (error: String) => void;



export class CheckService implements CheckServiceUseCase {  

   constructor(
     private readonly successCallback: SuccessCallback,
     private readonly errorCallback: ErrorCallback        

   ) {}

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
              
            if (!req.ok) {
                throw new Error(`Service is down' ${url}`);
            }
            this.successCallback();
            //console.log(` ${url} is ok ...`);
            return true;
        } catch (error) {
            this.errorCallback(`${error}`);
            console.log(`${error}`);
            return false;
        }
        
      

    }

}