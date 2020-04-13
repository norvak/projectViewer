import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnDestroy, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Subscriber } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsProvider } from '../../../share';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LoaderService } from '../../../share/services/loader/loader.service';


@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss'],
  providers: [GlobalsProvider, LoaderService]
})
export class DetailProjectComponent implements OnInit {
  @ViewChild('parentModal') parentModal: ModalDirective;
  modalRef: BsModalRef;
  myInterval = 0;
  public numPage: number;
  public pages = 1;
  public searchText = '';
  public elements: any = {};
  list = false;
  public images = [];
  activeSlideIndex = 0;
  public presentation: any = {};
  public project: any = {};
  public projectCharter: any = {};
  public slideshow: any = {};
  public view = false;
  public slides = false;
  url: any;
  uuid: any;
  public videoView = false;
   public uuidp: any;
  private sub: any;
  public photo: any;
  public video: any = {};
  public Demo: any = {};
  public FotoView = false;
  public VideoView = false;
  public charView = false;
  public slidView = false;
  public videoDemo = false;
  public functional: any;
  public functionalView = false;
  public technica: any;
  public technicaView = false;
  public manual: any;
  public manualView = false;

  constructor(
    public router: Router,
    private service: ProjectService,
    public loaderService: LoaderService,
    private globals: GlobalsProvider,
    public route: ActivatedRoute
  ) {

   }

  ngOnInit() {
     this.route.queryParams.subscribe(params => {
      if (params['uuidp']) {
        this.uuidp = params['uuidp'];
        this.projectShow();
      }
    });
   }

  // showParentModal(list): void {

  //   this.images = [];
  //   this.projectCharter = {};
  //   this.slideshow = {};
  //   this.presentation = '';
  //   this.activeSlideIndex = 0;
  //   this.project = list;

  //   if (this.project.multimedias.length > 0) {
  //     for (let i = 0; i < this.project.multimedias.length; i++) {
  //       if (this.project.multimedias[i].extension !== 'mp4') {
  //         this.images.push(this.project.multimedias[i]);
  //       }
  //     }
  //   }
  // }

  atras() {
    this.router.navigate(['admin/project']);
  }

  projectShow() {
    this.loaderService.show();
    this.service.projectDetail(this.uuidp).subscribe((resp: any) => {
      this.project = {};
      this.project = resp.data;
      this.presentation = '';
      this.activeSlideIndex = 0;
      this.functional = {};
      this.technica = {};
      this.manual = {};
      this.project.description =  this.project.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.project.overall_objective =  this.project.overall_objective.replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.project.goal_objective =  this.project.goal_objective.replace(/(?:\r\n|\r|\n)/g, '<br>');
      if (this.project.multimedias.length > 0) {
        for (let i = 0; i < this.project.multimedias.length; i++) {
          if (this.project.multimedias[i].extension !== 'mp4' && this.project.multimedias[i].status !== 0) {
            this.images.push(this.project.multimedias[i]);
            this.presentation = this.project.multimedias[1].url;
          }
          if (this.project.multimedias[i].type === 'video') {
            this.videoView = true;
          }
          if (this.project.multimedias[i].type === 'demo') {
            this.videoDemo = true;
          }
        }
        if (this.images.length > 0) {
          this.FotoView = true;
        }
      }

      if (this.project.documents.length > 0) {
        for (let i = 0; i < this.project.documents.length; i++) {
          if (this.project.documents[i].type === 'Slideshow') {
            this.slideshow = this.project.documents[i];
            this.slidView = true;
          }
          if (this.project.documents[i].type === 'ProjectCharter') {
            this.projectCharter = this.project.documents[i];
            this.charView = true;
          }
          if (this.project.documents[i].type === 'Functional') {
            this.functional = this.project.documents[i];
            this.functionalView = true;
          }

          if (this.project.documents[i].type === 'Technica') {
            this.technica = this.project.documents[i];
            this.technicaView = true;
          }

          if (this.project.documents[i].type === 'Manual') {
            this.manual = this.project.documents[i];
            this.manualView = true;
          }
        }
      }
      this.loaderService.hide();
      this.view = true;
    }, (error) => {
      this.loaderService.hide();
    });

  }
}
