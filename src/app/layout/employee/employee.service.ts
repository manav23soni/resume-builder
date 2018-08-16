import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppHttpService } from "../../service/app-http/app-http.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class EmployeeService {
    constructor(private httpService: AppHttpService) { }

    handleError(error: Response | any) {
        const body = JSON.parse(JSON.stringify(error)) || '';
        return Observable.throw(body);
    }

    createResume(data) {
        return new Promise((resolve, reject) => {
            this.httpService.post('project/getProjectFromId/', data).subscribe((res: any) => {
                return resolve(res);
            }, err => {
                return reject
            })
        })
    }
}