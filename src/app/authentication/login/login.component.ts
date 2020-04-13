import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router} from '@angular/router';
import { LoaderService } from '../../share/services/loader/loader.service';
import { GlobalsProvider } from '../../share';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  providers: [ LoaderService, GlobalsProvider]
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;
    msg: string;
    public year = moment().format('YYYY');
    public Modal;
    user: any = {
        id: '',
        name: '',
        status: ''
    };

    constructor(
        private globals: GlobalsProvider,
        public loaderService: LoaderService,
        private fb: FormBuilder,
        private service: AuthenticationService,
        private readonly router: Router) {

    }

    ngOnInit() {
        this.formLogin = this.fb.group({
            username: [ null, Validators.compose([Validators.required])],
            password: [ null, Validators.compose([Validators.required])],
        });
    }

    onSubmit() {
        if ( this.formLogin.valid) {
            this.loaderService.show();
            const values = this.formLogin.value;

            this.service.login(values).subscribe((data: any) => {
                this.user = data.data;
                if (this.user.status !== 0) {
                    this.router.navigateByUrl('admin/dashboard').then(() => {});
                } else {
                    this.globals.alertError('Su acceso ha sido denegado', 'Error');
                }
                this.loaderService.hide();
            }, (error: any) => {
                this.globals.alertError('Email o Usuario/Contraseña invalida', 'Error');
                this.loaderService.hide();
            });
        } else {
            return;
        }
    }

    errorEmail() {
    return this.getErrors('username');
    }

    errorPassword() {
        return this.getErrors('password');
    }

    getErrors( name: string) {
    const field = this.formLogin.get(name);
    return field.invalid && ( field.dirty || field.touched);
    }
}
