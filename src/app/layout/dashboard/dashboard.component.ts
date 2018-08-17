import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public resumeList: Array<any> = [];
    public i: Number = 0;
    constructor(private dashboardService: DashboardService) {}

    async ngOnInit() {
        let response: any = await this.dashboardService.getResume();
        console.log(JSON.parse(response._body).data);
        this.resumeList = JSON.parse(response._body).data;
    }
}
