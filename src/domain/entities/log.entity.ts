import { create } from "domain";

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}   

export interface LogEntityOption{
    level: LogSeverityLevel;
    message: string;
    createAt?: Date;
    origin: string;
}


export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;
    public origin: string;

    constructor( options: LogEntityOption) {
        const { level, message, origin, createAt = new Date() } = options;
        this.level = level;
        this.message = message;
        this.createAt = createAt;
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {
        const { message, level, createAt, origin } = JSON.parse(json);

        const log = new LogEntity({ message, level, createAt, origin});
        

        return log;
       // return new LogEntity(level as LogSeverityLevel, message);
    }

}