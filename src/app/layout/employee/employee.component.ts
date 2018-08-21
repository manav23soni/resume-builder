import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { EmployeeService } from '../employee/employee.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [routerTransition()]
})
export class EmployeeComponent implements OnInit {
  public count: number = 1;
  employeeDetailsForm: FormGroup
  techSkillList: any[] = [];
  employeeResumeId;
  resumedata: any = {};
  isUpdate: boolean = false;

  constructor(private router: Router,
    public activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private commonService: CommonService,
    private employeeService: EmployeeService,
    private dashboardService: DashboardService) {

    if (this.activeRoute.snapshot.params['id']) {
      this.activeRoute.params.subscribe(routeParams => {
        console.log(routeParams);
        this.employeeResumeId = routeParams.id;
      });
    }
    this.employeeDetailsForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      technology: ['', Validators.required],
      title: ['', Validators.required],
      summary: ['', Validators.required],
      techSkillList: this.fb.array([]),
      projectList: this.fb.array([])
    })
  }

  async ngOnInit() {
    if (this.activeRoute.snapshot.params['id']) {
      this.isUpdate = true;
      let response: any = await this.dashboardService.getResumeById(this.employeeResumeId);
      console.log(JSON.parse(response._body).data);
      this.resumedata = JSON.parse(response._body).data[0];
      this.employeeDetailsForm = this.fb.group({
        firstname: this.resumedata.firstname,
        lastname: this.resumedata.lastname,
        technology: this.resumedata.technology,
        title: this.resumedata.title,
        summary: this.resumedata.summary,
        techSkillList: this.fb.array([]),
        projectList: this.fb.array([])
      })
      const control: any = this.employeeDetailsForm.controls['techSkillList'];
      for (let data of this.resumedata.techSkillList) {
        control.push(this.fb.group(data));
      }
      const projectControl: any = this.employeeDetailsForm.controls['projectList'];
      for (let data of this.resumedata.projectList) {
        projectControl.push(this.fb.group(data));
      }
    } else {
      console.log(this.employeeDetailsForm)
      this.employeeDetailsForm = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        technology: ['', Validators.required],
        title: ['', Validators.required],
        summary: ['', Validators.required],
        techSkillList: this.fb.array([]),
        projectList: this.fb.array([])
      })
      console.log(this.employeeDetailsForm);
      this.addNewTechSkill();
      this.addNewProject();
    }
  }

  // submitData() - Submit data.
  async submitData() {
    try {
      if (this.employeeDetailsForm.invalid) {
        this.commonService.popToast("warning", "warning", "Please check your form.");
        return;
      } else {
        if (this.isUpdate) {
          this.resumedata.projectList = this.employeeDetailsForm.value.projectList;
          this.resumedata.techSkillList = this.employeeDetailsForm.value.techSkillList;
          this.resumedata.summary = this.employeeDetailsForm.value.summary;
          this.resumedata.title = this.employeeDetailsForm.value.title;
          this.resumedata.technology = this.employeeDetailsForm.value.technology;
          this.resumedata.firstname = this.employeeDetailsForm.value.firstname;
          this.resumedata.lastname = this.employeeDetailsForm.value.lastname;
          let response = await this.employeeService.updateResume(this.resumedata);
          this.commonService.popToast("success", "success", "Updated!");
          this.employeeDetailsForm.reset();
          this.count = 1;
        } else {
          let response = await this.employeeService.createResume(this.employeeDetailsForm.value);
          if (response) {
            this.commonService.popToast("success", "success", "Success!");
            this.employeeDetailsForm.reset();
            this.count = 1;
          }
        }
      }
    } catch (error) {
      this.commonService.popToast("success", "success", error);
    }
    console.log("DATA", this.employeeDetailsForm.value);
  }

  // incrementCount() - increment count.
  incrementCount() {
    if (this.count == 1) {
      if (!this.employeeDetailsForm.controls.firstname.valid ||
        !this.employeeDetailsForm.controls.lastname.valid ||
        !this.employeeDetailsForm.controls.technology.valid ||
        !this.employeeDetailsForm.controls.title.valid) {
        this.commonService.popToast("warning", "warning", "Please enter required field.");
        return;
      }
    } else if (this.count == 2) {
      if (!this.employeeDetailsForm.controls.summary.valid) {
        this.commonService.popToast("warning", "warning", "Please enter summary.");
        return;
      }
    } else if (this.count == 3) {
      const control = <FormArray>this.employeeDetailsForm.controls['techSkillList'];
      if (!control.valid) {
        this.commonService.popToast("warning", "warning", "Please enter skill and details.");
        return;
      }
    }
    this.count = this.count + 1;
  }

  // goBack() - Back to previous page.
  goBack() {
    this.count = this.count - 1;
    if (this.count == 0) {
      this.router.navigate(['/dashboard']);
    }
  }

  // addNewTechSkill() - Add New Tech Skill.
  addNewTechSkill() {
    const control = <FormArray>this.employeeDetailsForm.controls['techSkillList'];
    for (let i = 0; i < 1; i++) {
      control.push(this.fb.group({
        skill: '',
        Details: ''
      }));
    }
  }

  // addNewProject() - Add New Project Row.
  addNewProject() {
    const control = <FormArray>this.employeeDetailsForm.controls['projectList'];
    for (let i = 0; i < 1; i++) {
      control.push(this.fb.group({
        projectTitle: '',
        role: '',
        tools: '',
        description: ''
      }));
    }
  }

  // deleteRow() - Delete row.
  deleteRow(index: number, type) {
    if (type == "skill") {
      const control = <FormArray>this.employeeDetailsForm.controls['techSkillList'];
      control.removeAt(index);
    } else if (type == "project") {
      const control = <FormArray>this.employeeDetailsForm.controls['projectList'];
      control.removeAt(index);
    }
  }
}
