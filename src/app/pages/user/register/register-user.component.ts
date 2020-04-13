import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GlobalsProvider } from '../../../share';
import { LoaderService } from '../../../share/services/loader/loader.service';
import { NumberValidator } from '../../../validate/number-validator';

function passwordConfirming(astControl: AbstractControl): any {
  if (!astControl.parent || !astControl) {
    return;
  }
  const pwd = astControl.parent.get('password');
  const cpwd = astControl.parent.get('confpassword');

  if (!pwd || !cpwd) {
    return;
  }
  if (pwd.value !== cpwd.value) {
    return { invalid: true };
  }
}
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class RegisterUserComponent implements OnInit {

  public updateUser = false;
  registerForm: FormGroup;
  submitted = false;
  editUser = false;
  changePass = false;
  listEmail = [];
  verfEmail = false;
  verfUser = false;
  public valit = false;

  get cpwd() {
    return this.registerForm.get('confpassword');
  }

  public user: any = {
    id: '',
    name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    photo: '',
    type_user_id: '',
    confpassword: ''
  };

  constructor(
    private globals: GlobalsProvider,
    private service: UserService,
    public router: Router,
    public loaderService: LoaderService,
    public activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {

      if (params['user']) {
        this.updateUser = true;
        this.valit = true;

        const user = JSON.parse(params['user']);
           this.loaderService.show();
        this.bringUser(user);

      }
    });

    if (!this.updateUser) {
      this.changePass = true;
      this.registerForm = this.formBuilder.group({
        name: ['', [ Validators.required]],
        last_name: ['', [ Validators.required]],
        username: ['', [ Validators.required]],
        email: ['', [ Validators.required, Validators.email]],
        phone: ['', Validators.compose([ Validators.required, NumberValidator.isValid, Validators.minLength(11)])],
        password: ['', [ Validators.required]],
        confpassword: ['', [ Validators.required, passwordConfirming]]
      });


    } else {
      this.registerForm = this.formBuilder.group({
        name: ['', [ Validators.required]],
        last_name: ['', [ Validators.required]],
        username: ['', [ Validators.required]],
        email: ['', [ Validators.required, Validators.email]],
        phone: ['',  Validators.compose([ Validators.required, NumberValidator.isValid, Validators.minLength(11)])],
        password: [''],
        confpassword: ['', [passwordConfirming]]
      });
      this.registerForm.controls['name'].disable();
      this.registerForm.controls['last_name'].disable();
      this.registerForm.controls['username'].disable();
      this.registerForm.controls['email'].disable();
      this.registerForm.controls['phone'].disable();
      this.registerForm.controls['password'].disable();
      this.registerForm.controls['confpassword'].disable();
    }
  }

  get validate() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }

  edit() {
    this.editUser = true;
    this.registerForm.controls['name'].enable();
    this.registerForm.controls['last_name'].enable();
    this.registerForm.controls['username'].enable();
    this.registerForm.controls['email'].enable();
    this.registerForm.controls['phone'].enable();
  }

  cancelar() {
    this.router.navigate(['admin/user']);
  }

  bringUser(data) {
    this.service.show(data).subscribe((resp: any) => {
      this.user = resp.data;
      this.loaderService.hide();
    });
  }

  save(datos) {
    if (datos.confpassword !== datos.password) {
      this.globals.alertInfo('Confirmación de password incorrecta', 'Operación fallida');
      return;
    }

    if (datos.name === '' || datos.last_name === '' || datos.username === '' || datos.email === '' ||
      datos.phone === '' || datos.password !== datos.confpassword || datos.password === '' ||
      datos.confpassword === '' || datos.phone.length < 11 || datos.email.indexOf('@') === -1 || this.verfEmail === true
      || this.verfUser === true) {
      this.globals.alertError('Datos incorrectos o campo(s) requerido(s)', 'Error');
      return;
    } else {
      const data = {
        name: datos.name.charAt(0).toUpperCase() + datos.name.slice(1),
        last_name: datos.last_name.charAt(0).toUpperCase() + datos.last_name.slice(1),
        email: datos.email,
        username: datos.username,
        password: datos.password,
        phone: datos.phone,
        type_user_id: '2',
        status: '1'
      };
      this.loaderService.show();
      this.service.save(data).subscribe((resp: any) => {
        if (resp) {
          this.globals.alertSuccess('El usuario se registro correctamente', 'Operación exitosa');
          this.router.navigate(['admin/user']);
          this.loaderService.hide();
        }
      },
      (error: any) => {
        if (error.status === 422) {
          this.loaderService.hide();
          if (error.error.errors.email) {
            this.globals.alertWarning('Error el email ya esta registrado', 'Duplicado');
          }
          if (error.error.errors.username ) {
            this.globals.alertWarning('Error el username ya esta registrado', 'Duplicado');
          }
        } else {
          this.loaderService.hide();
          this.globals.alertError('Se produjo un error con el servidor' + '' + error.status, 'Alerta');
        }
      });
    }
  }

  update(datos) {

    if ( datos.confpassword !== datos.password || datos.name === '' ||
     datos.last_name === '' || datos.username === '' || datos.email === '' ||
    datos.phone === '' || datos.phone.length < 11 || datos.email.indexOf('@') === -1) {
      return  this.globals.alertError('Datos incorrectos o campo(s) requerido(s)', 'Error');
    } else {
      const data = {
        id: datos.id,
        name: datos.name.charAt(0).toUpperCase() + datos.name.slice(1),
        last_name: datos.last_name.charAt(0).toUpperCase() + datos.last_name.slice(1),
        email: datos.email,
        username: datos.username,
        password: datos.password,
        phone: datos.phone,
        type_user_id: this.user.type_user_id,
        status: this.user.status
      };
      this.loaderService.show();
      this.service.update(data).subscribe((resp: any) => {
        if (resp) {
          this.globals.alertSuccess('El usuario se actualizó correctamente', 'Operación exitosa');
          this.router.navigate(['admin/user']);
          this.loaderService.hide();
        }
      },
        (error: any) => {
          if (error.status === 422) {
            this.loaderService.hide();
            if (error.error.errors.email) {
              this.globals.alertWarning('Error el email ya esta registrado', 'Duplicado');
            }
            if (error.error.errors.username ) {
              this.globals.alertWarning('Error el username ya esta registrado', 'Duplicado');
            }
          } else {
            this.loaderService.hide();
            this.globals.alertError('Se produjo un error con el servidor' + '' + error.status, 'Alerta');
          }
        });
    }
  }

  changePassEdit() {
    this.changePass = true;
    this.registerForm.controls['password'].enable();
    this.registerForm.controls['confpassword'].enable();
  }
}
