import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { AppHttpService } from "../../service/app-http/app-http.service";
import { Observable } from 'rxjs/Observable';
import { ApisService } from '../../service/apiService.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class EmployeeService {
    constructor(private apisService: ApisService) { }

    createResume(data) {
        return new Promise((resolve, reject) => {
            this.apisService.createResume(data)
                .subscribe((res: any) => {
                    return resolve(res);
                }, err => {
                    return reject(err);
                });
        })
    }

    updateResume(data) {
        return new Promise((resolve, reject) => {
            this.apisService.updateResume(data)
                .subscribe((res: any) => {
                    return resolve(res);
                }, err => {
                    return reject(err);
                });
        })
    }
}