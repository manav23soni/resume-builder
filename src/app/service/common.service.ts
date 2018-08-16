import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import {ToasterService, ToasterConfig} from 'angular2-toaster';
import { environment } from "../../environments/environment";

@Injectable()
export class CommonService {
  private _subject = new Subject<any>();
  private toasterService: ToasterService;
  public config: ToasterConfig = new ToasterConfig({showCloseButton: true, tapToDismiss: false, timeout: 0});

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;    
  }

  popToast(type,title,message) {
      this.toasterService.pop(type, title, message);
  }

  // getCommonAwsurl(){
  //   return environment.IMAGE_URL;
  // }
  
}
