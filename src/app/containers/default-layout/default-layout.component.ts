import { Component, OnInit, Input } from '@angular/core';
import { navItems, navItems2 } from './../../_nav';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';
import { NgxToggleModule } from 'ngx-toggle';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  public navItems: any;
  public navItems2: any;
  public sidebarMinimized = true;
  user_ini: any = {
  };
  private changes: MutationObserver;
  public element: HTMLElement = document.body;


  constructor(
    private readonly service: AuthenticationService,
    private router: Router,
   private coolDialogs: NgxCoolDialogsService) {
this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

  }

  ngOnInit() {
    this.navItems = navItems;
    this.user_ini = JSON.parse(localStorage.getItem('user'));
    // if (this.user_ini.type_user_id !== 1) {
    //   for (let i = 0; i < this.navItems.length; i++) {
    //     if (this.navItems[i].name === ' Administradores') {
    //       this.navItems = navItems2;
    //       break;
    //     }
    //   }
    // }
  }

  onLogout() {
    // tslint:disable-next-line:max-line-length
    this.coolDialogs.confirm( '¿Esta seguro que desea salir del sistema?')
   .subscribe(res => {
     if (res) {
      this.service.logout();
      this.router.navigateByUrl('admin/authentication/login').then(() => {
        localStorage.clear();
      });
     } else {
      return;
     }
 });
  }
}

