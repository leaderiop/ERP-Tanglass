import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const TOAST_OPTIONS = {
  positionClass: 'toast-bottom-center',
  closeButton: true,
  disableTimeOut: true,
};

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showToast(operation: string, title: string, msg: string) {
    switch (operation) {
      case 'success':
      case 'error':
      case 'warning':
      case 'info':
        this.toastr[operation](msg, title, {
          timeOut: 3000,
          disableTimeOut:false
        });
        break;
      default:
        this.toastr.info(msg, title, {
          timeOut: 3000,
          disableTimeOut:false

        });
        break;
    }
  }
}
