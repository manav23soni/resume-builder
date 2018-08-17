import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  employeeResumeId;
  resumedata: any = {};
  constructor(private router: Router,
    public activeRoute: ActivatedRoute,
    private commonService: CommonService,
    private dashboardService: DashboardService
  ) { 
    if (this.activeRoute.snapshot.params['id']) {
      this.activeRoute.params.subscribe(routeParams => {
        console.log(routeParams);
        this.employeeResumeId = routeParams.id;
      });
    }
    
  }


  async ngOnInit() {
    let response: any = await this.dashboardService.getResumeById(this.employeeResumeId);
    console.log(JSON.parse(response._body).data);
    this.resumedata = JSON.parse(response._body).data[0];
  }

}
