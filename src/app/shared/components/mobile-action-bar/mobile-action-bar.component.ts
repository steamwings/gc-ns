import { Component, Input } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: 'app-action-bar',
    templateUrl: './mobile-action-bar.component.html',
    styleUrls: ['./mobile-action-bar.component.css']
  })
  export class MobileActionBarComponent {

    @Input() title: string;
    
    constructor(public routerExt: RouterExtensions) { }
  
  }