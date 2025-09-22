import { envs } from "./config/plugins/envs.plugins";
import { Server } from "./presentation/server";
import 'dotenv/config';

(() => {
    main();
})();


function main() {
   Server.start();
    console.log('App started ...', envs.MAILER_EMAIL);
    
}
