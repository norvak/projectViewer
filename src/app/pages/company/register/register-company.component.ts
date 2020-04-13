import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalsProvider } from '../../../share';
import { LoaderService } from '../../../share/services/loader/loader.service';
@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class RegisterCompanyComponent implements OnInit {

  public updateCompany = false;
  registerForm: FormGroup;
  submitted = false;
  public editCompany = false;
  public view = false;
  public limpiar = false;
  image: any;
  public changePhoto = false;
  public serviceBaseUrl: string;
  public deletePhoto = false;

  public company: any = {
    id: '',
    uuid: '',
    name: '',
    tax_information: '',
    description: '',
    photo: null,
    phone: '',
    email: '',
    manager: {
      id: '',
      name_manager: '',
      last_name_manager: ''
    }
  };

  constructor(
    private globals: GlobalsProvider,
    private service: CompanyService,
    public router: Router,
    public loaderService: LoaderService,
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {

      if (params['company']) {
        this.updateCompany = true;
        const company = JSON.parse(params['company']);
        this.bringCompany(company);

      }
    });

    if (!this.updateCompany) {
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        tax_information: [''],
        description: [''],
        image: [null],
        file: [null],
        image_type: [null],
        phone: ['', [Validators.required, Validators.minLength(11)]],
        email: ['', [Validators.required, Validators.email]],
        name_manager: ['', Validators.required],
        last_name_manager: ['', Validators.required]
      });
    } else {
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        tax_information: [''],
        description: [],
        image: [null],
        file: [null],
        image_type: [null],
        phone: ['', [Validators.required, Validators.minLength(11)]],
        email: ['', [Validators.required, Validators.email]],
        name_manager: ['', Validators.required],
        last_name_manager: ['', Validators.required]
      });
      this.registerForm.controls['name'].disable();
      this.registerForm.controls['tax_information'].disable();
      this.registerForm.controls['description'].disable();
      this.registerForm.controls['phone'].disable();
      this.registerForm.controls['email'].disable();
      this.registerForm.controls['name_manager'].disable();
      this.registerForm.controls['last_name_manager'].disable();
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

  onFileChange(event): void {
    this.view = true;
    this.deletePhoto = true;
    const reader: any = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result;
        this.company.photo = this.image;
        this.registerForm.get('image').setValue(this.image);
        this.registerForm.get('image_type').setValue(file.type.split('/')[1]);
      };
    }
  }

  photoDelete() {
    this.image = {};
    this.view = false;
    this.deletePhoto = false;
    this.registerForm.patchValue({
      image: '',
      image_type: '',
      file: ''

    });
  }

  cancelar() {
    this.router.navigate(['admin/company']);
  }

  bringCompany(data) {
    this.loaderService.show();
    this.service.show(data).subscribe((resp: any) => {
      this.company = resp.data;
      this.view = true;
      if (this.company.photo === null) {
        this.image = null;
      } else {
        this.image = this.company.photo;
      }
      this.loaderService.hide();
    });
  }

  save(datos) {
    if (datos.name === '' || datos.phone.length < 11 || datos.email.indexOf('@') === -1
      || datos.manager.name_manager === '' || datos.manager.last_name_manager === '' || datos.update === '') {
      return this.globals.alertError('Datos incorrectos o campo(s) requerido(s)', 'Error');
    } else {
      const name = datos.name.replace(/\s/g, '');
      const data = {
       name: datos.name.charAt(0).toUpperCase() + datos.name.slice(1),
       name_url: name.charAt(0).toUpperCase() + name.slice(1),
       uuid: null,
        tax_information: datos.tax_information,
        description: datos.description,
        image_type: this.registerForm.value.image_type,
        photo: datos.photo,
        phone: datos.phone,
        email: datos.email,
        manager: {
          name_manager: datos.manager.name_manager.charAt(0).toUpperCase() +  datos.manager.name_manager.slice(1),
          last_name_manager: datos.manager.last_name_manager.charAt(0).toUpperCase() +  datos.manager.last_name_manager.slice(1)
        }
      };
      this.loaderService.show();
      this.service.save(data).subscribe((resp: any) => {
        this.globals.alertSuccess('El cliente se registro correctamente', 'Operación exitosa');
        this.router.navigate(['admin/company']);
        this.loaderService.hide();
      }, (error: any) => {
        if (error.status === 422) {
          this.loaderService.hide();
          if (error.error.errors.email) {
            this.globals.alertWarning('Error el email ya esta registrado', 'Duplicado');
          }
        } else {
          this.loaderService.hide();
          this.globals.alertError('Se produjo un error con el servidor' + '' + error.status, 'Alerta');
        }
      });
    }
  }

  edit() {
    this.editCompany = true;
    this.limpiar = true;
    this.registerForm.controls['name'].enable();
    this.registerForm.controls['tax_information'].enable();
    this.registerForm.controls['description'].enable();
    this.registerForm.controls['phone'].enable();
    this.registerForm.controls['email'].enable();
    this.registerForm.controls['name_manager'].enable();
    this.registerForm.controls['last_name_manager'].enable();
  }

  update(datos) {
    if (datos.name === '' || datos.phone.length < 11 || datos.email.indexOf('@') === -1
      || datos.manager.name_manager === '' || datos.manager.last_name_manager === '' || datos.update === '') {
        this.globals.alertError('Datos incorrectos o campo(s) requerido(s)', 'Error');
    } else {
      const name = datos.name.replace(/\s/g, '');
      const data = {
        id: datos.id,
        name: datos.name.charAt(0).toUpperCase() + datos.name.slice(1),
        name_url: name.charAt(0).toUpperCase() + name.slice(1),
        uuid:  this.company.uuid,
        tax_information: datos.tax_information,
        description: datos.description,
        image_type: this.registerForm.value.image_type,
        photo: datos.photo,
        phone: datos.phone,
        email: datos.email,
        manager_id: datos.manager.id,
        manager: {
          id: datos.manager.id,
          name_manager: datos.manager.name_manager,
          last_name_manager: datos.manager.last_name_manager
        }
      };
      this.loaderService.show();
      this.service.update(data).subscribe((resp: any) => {
      this.globals.alertSuccess('El cliente se actualizó correctamente', 'Operación exitosa');
      this.router.navigate(['admin/company']);
      this.loaderService.hide();
      },
      (error: any) => {
        if (error.status === 422) {
          this.loaderService.hide();
          if (error.error.errors.email) {
            this.globals.alertWarning('Error el email ya esta registrado', 'Duplicado');
          }
        } else {
          this.loaderService.hide();
          this.globals.alertError('Se produjo un error con el servidor' + '' + error.status, 'Alerta');
        }
      });
    }
  }

  clear () {
    this.image = null;
    this.registerForm.value.image_type = null;
    this.limpiar = false;
    this.view = false;
    this.company.photo = null;
  }
}
