import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { EmployeeService } from '../employee/employee.service';
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

  constructor(private router: Router,
    public activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private commonService: CommonService,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeDetailsForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      technology: ['', Validators.required],
      title: ['', Validators.required],
      summary: ['', Validators.required],
      techSkillList: this.fb.array([]),
      projectList: this.fb.array([])
    })
    this.addNewTechSkill();
    this.addNewProject();
  }

  // submitData() - Submit data.
  async submitData() {
    try {
      let response = await this.employeeService.createResume(this.employeeDetailsForm.value);
      if (response) {
        this.commonService.popToast("success", "success", "SUCCESS!");
      }
    } catch{

    }
    console.log("DATA", this.employeeDetailsForm.value);
  }

  // incrementCount() - increment count.
  incrementCount() {
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
