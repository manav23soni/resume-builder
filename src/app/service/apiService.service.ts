import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AppHttpService } from './app-http/app-http.service';
@Injectable()
export class ApisService {
  constructor(private http: Http, private httpService: AppHttpService) {
  }

  handleError(error: Response | any) {
    const body = JSON.parse(JSON.stringify(error)) || '';
    return Observable.throw(body);
  }

  // createResume
  createResume(data) {
    return this.httpService.put('employee/createResume/', data);
  }

  // updateResume
  updateResume(data){
    return this.httpService.post('employee/updateResume', data)
  }

  // getResume
  getResume() {
    return this.httpService.get('employee/getResume/');
  }

  // getResume
  getResumeById(id) {
    return this.httpService.get('employee/getResume/', { id: id });
  }
}