import { Component, OnInit} from '@angular/core';

import { LoaderService } from '../../share/services/index';

@Component({
    selector: 'page-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.scss'],
})
export class LoaderComponent implements OnInit {

    public show: any;

    constructor(private loaderService: LoaderService) {}

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.show = val;
        });

    }
}
