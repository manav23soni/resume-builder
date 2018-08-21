import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { DashboardService } from '../dashboard/dashboard.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import $ from "jquery";
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  employeeResumeId;
  resumedata: any = {};
  selected: boolean = true;
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
    this.resumedata = JSON.parse(response._body).data[0];
    this.resumedata.projectList.forEach(element => {
      element.selected = true;
    });
    console.log(this.resumedata);
  }

  public captureScreen() {
    var elem = document.getElementById("delete");
    if (elem) {
      elem.remove();
    }
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      let pdf = new jspdf('p', 'mm', [297, 210]); // A4 size page of PDF
      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addPage ( 400, 600 );
      // pdf.viewerPreferences({ 'FitWindow': true }, true);
      pdf.addImage(contentDataURL, 'JPEG', 10, 10, 185, 185);
      pdf.save('Resume.pdf'); // Generated PDF   
    });
    
  }

  // deleteRow() - Delete row.
  deleteRow(index) {
    this.resumedata.projectList[index].selected = false;
  }
}
