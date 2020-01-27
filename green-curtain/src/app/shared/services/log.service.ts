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
    var prefix = '';
    switch(level){
      case LogLevel.verbose:
        prefix = 'VERBOSE: ';
        if (!environment.verbose) return;
        break;
      case LogLevel.debug:
        prefix = "DEBUG: ";
        if (environment.production) return;
        break;
      case LogLevel.error:
        prefix = 'ERROR: ';
        break;
      case LogLevel.info:
        prefix = 'INFO: '; 
        break;
      default: return;
    }
    if (!environment.production) {
      if (data) msg += "\nData: " + data
      if (error) msg += "\nError: " + error
      console.log(prefix + msg);
    }
    //else send it somewhere
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
