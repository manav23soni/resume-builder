import { Injectable } from '@angular/core';
import { ApisService } from '../../service/apiService.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class PreviewService {
    constructor(private apisService: ApisService) { }
   
}