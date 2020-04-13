import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalsProvider {

    public isDebugMode = true;
    public validarEmail = '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})';
    public validarTelefono = '^(0|[1-9][0-9]{0,12}*)$';
    public numPage = 9;

    constructor(private toastr: ToastrService) {

    }

    public alertInfo(message, title ) {
        this.toastr.info(message, title, {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            progressBar: true
          });
    }

    public alertSuccess(message, title ) {
        this.toastr.success(message, title, {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            progressBar: true
          });
    }

    public alertError(message, title ) {
        this.toastr.error(message, title, {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            progressBar: true
          });
    }

    // change color
    public alertWarning(message, title ) {
        this.toastr.warning(message, title, {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            progressBar: true
          });
    }

    // public alertOptions() {
    //     this.toastr.options = {};
    // }
}
