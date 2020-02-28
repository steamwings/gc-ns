import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { first } from 'rxjs/operators';
import { LogService } from './log.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': environment.apiKey
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private log: LogService) { }

  // TODO Type
  login(body) {
    return this.http.post<HttpResponse<any>>(environment.apiUrl, body, httpOptions)
      .pipe(first());
  }

  // TODO Type
  register(body) {
    return this.http.post<HttpResponse<any>>(environment.apiUrl, body, httpOptions)
      .pipe(first());
  }
}
