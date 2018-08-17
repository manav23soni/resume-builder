import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './preview.component';
import { DashboardService } from '../dashboard/dashboard.service';
import { EmployeeService } from '../employee/employee.service';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        PreviewRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        PreviewComponent
    ],
    providers: [EmployeeService, DashboardService]
})
export class PreviewModule { }
