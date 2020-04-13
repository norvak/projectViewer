import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ConfigurationService } from '../configuration.service';
import { Subscriber } from 'rxjs';
import { ConfirmDialogComponent } from '../../../share/confirm-dialog/confirm-dialog.component';
import { MoveElementComponent } from '../../../share/move-element/move-element.component';
import { NgxToggleModule } from 'ngx-toggle';
import { GlobalsProvider } from '../../../share';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { LoaderService } from '../../../share/services/loader/loader.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class RepositoryComponent implements OnInit {


  public myForm: FormGroup;

  public listFases: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private service: ConfigurationService,
    private coolDialogs: NgxCoolDialogsService,
    public loaderService: LoaderService,
    private globals: GlobalsProvider,
  ) {
  }


  ngOnInit() {
    this.loaderService.show();
    this.myForm = this.formBuilder.group({
      fases: this.formBuilder.array([])
    });
    this.allFases();
    this.loaderService.hide();

  }
  
  save(formData) {
     if (formData.invalid) {
      this.globals.alertWarning('Existe(n) una fase sin nombre', 'Operación fallida');
      return;
    } else {
      const data: any = formData.value;
      data.fases.forEach(fase => {
      fase.name = fase.name.toUpperCase();
      fase.header = _.uniqBy(fase.header, 'name');
      fase.header = _.assign( fase.header.map(i => {
              return {name: i.name.charAt(0).toUpperCase() + i.name.slice(1) }}))
      return fase;
      });
      formData.patchValue(data);
      this.cdr.detectChanges();
      this.loaderService.show();
      this.service.saveFases(data)
        .subscribe(
          (resp: any) => {
            this.loaderService.hide();
            this.globals.alertSuccess('Se registro correctamente', 'Operación exitosa');
            this.myForm.patchValue(resp);
          }, (error) => {
            this.loaderService.hide();
            console.log(error);
            this.globals.alertError('Por favor verifique los datos suministrados', 'Alerta');
          });
    }
    
  }

  addNewFase() {
    const control = this.myForm.controls.fases as FormArray;
    if (control.length !== 0) {
      control.push(this.formBuilder.group({
        id: null,
        name: ['', [ Validators.required]],
        header: this.formBuilder.array(_.assign(
          control.at(0).get('header').value.map(i => {
              return this.formBuilder.group({name: [i.name]})
              })
          ))
      }));
    } else {
     control.push(this.formBuilder.group({
        id: null,
        name: ['', [ Validators.required]],
        header: this.formBuilder.array([])
      }));

    }
  }

  deleteFase(index) {
    const control = this.myForm.controls.fases as FormArray;
    control.removeAt(index);
  }

  setFases() {
    const control = this.myForm.controls.fases as FormArray;
    this.listFases.forEach(x => {
      control.push(this.formBuilder.group({
        id: x.id,
        name: x.name,
        header: this.setHeaders(x)
      }));
    });
  }

  allFases() {
    this.service.allFases().subscribe((resp: any) => {
      this.listFases = [];
      this.listFases = resp.data;
      if (this.listFases.length > 0) {
        this.myForm.reset();
        const control = this.myForm.controls.fases as FormArray;
        this.listFases.forEach(x => {
          control.push(this.formBuilder.group({
            id: x.id,
            name: x.name,
            header: this.setHeaders(x)
          }));
        });
      }
    });
  }

  setHeaders(x) {
    const arr = new FormArray([]);
    x.header.forEach(y => {
      arr.push(this.formBuilder.group({
        name: y.name
      }));
    });
    return arr;
  }

  deleteHeader(control, index) {
    control.removeAt(index);
  }

  addNewHeader(control) {
    control.push(this.formBuilder.group(
      {
        name: ['']
      }));
  }
}
