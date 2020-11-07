import { Component, OnInit } from '@angular/core';
import { IOrganization } from '../shared/models/org/org.model';
import { BehaviorSubject } from 'rxjs';
import { SampleOrgs } from '../shared/models/org/sample-orgs';
import { Router } from '@angular/router';

/**
 * Component for saved/followed organizations
 * Mobile and web
 */
@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.css']
})
export class OrgsComponent implements OnInit {

  title = 'Your Organizations';
  orgs$: BehaviorSubject<IOrganization[]> = new BehaviorSubject(SampleOrgs);
  constructor(private router: Router) { }

  ngOnInit() {
  }

  select(o: IOrganization) {
    this.router.navigate(['/review']); // TODO pass param
  }

}
