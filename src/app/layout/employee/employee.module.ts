import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeedRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { AppHttpService } from "../../service/app-http/app-http.service";
import { EmployeeService } from '../employee/employee.service';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        EmployeedRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        EmployeeComponent
    ],
    providers: [EmployeeService, AppHttpService]
})
export class EmployeedModule {}
