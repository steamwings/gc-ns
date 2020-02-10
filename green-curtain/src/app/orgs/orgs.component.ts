import { Component, OnInit } from '@angular/core';
import { IOrganization } from '../shared/models/org.model';
import { Observable } from 'rxjs';
import { SampleOrgs } from '../shared/models/sample-orgs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.css']
})
export class OrgsComponent implements OnInit {

  orgs$: Observable<IOrganization[]> = new Observable((subscriber) => { subscriber.next(SampleOrgs); });
  constructor(private router: Router) { }

  ngOnInit() {
  }

  select(o: IOrganization) {
    this.router.navigate(['/review']); // TODO pass param
  }

}
