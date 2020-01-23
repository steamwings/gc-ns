import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

enum LogLevel{
  verbose,
  debug,
  info,
  error
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  private log(level: LogLevel, msg?: string, data?, error?){
    //TODO Save errors in production
    switch(level){
      case LogLevel.debug:
        if (environment.production) break;
      case LogLevel.verbose:
        if (!environment.verbose) break;
      case LogLevel.error:
      case LogLevel.info:
        if(!environment.production){
          console.log(msg);
          if(data) console.log("Data: " + data)
          if(error) console.log("Error: " + error)
        }
        //else send it somewhere
      default: break;
    }
  }

  public verbose(msg: string, data?){
    this.log(LogLevel.verbose, msg, data);
  }

  public debug(msg: string, data?){
    this.log(LogLevel.debug, msg, data);
  }

  public info(msg: string, data?){
    this.log(LogLevel.info, msg, data)
  }

  public error(msg: string, error?, data?){
    this.log(LogLevel.error, msg, data, error);
  }

  
}
