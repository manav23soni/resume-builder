import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public resumeList: Array<any> = [];
    public i: Number = 0;
    constructor() {
        this.resumeList = [
            {
                id: 1,
                name: "Manav Soni",
                technology: "Mean Stack",
                role: "Junior Software Developer"
            },
            {
                id: 1,
                name: "Manav Soni",
                technology: "Mean Stack",
                role: "Junior Software Developer"
            }
        ]
    }

    ngOnInit() {}
}
