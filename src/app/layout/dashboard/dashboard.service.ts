import { Injectable } from '@angular/core';
import { ApisService } from '../../service/apiService.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class DashboardService {
    constructor(private apisService: ApisService) { }

    getResume() {
        return new Promise((resolve, reject) => {
            this.apisService.getResume()
                .subscribe((res: any) => {
                    return resolve(res);
                }, err => {
                    return reject(err);
                });
        })
    }

    getResumeById(id) {
        return new Promise((resolve, reject) => {
            this.apisService.getResumeById(id)
                .subscribe((res: any) => {
                    return resolve(res);
                }, err => {
                    return reject(err);
                });
        })
    }
}