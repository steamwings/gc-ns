import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ApiService } from './api.service';

const DefaultUserUrl = "assets/img/default-user.jpg";
const DefaultOrgUrl = "assets/img/default-org.jpg"
// This is used to find the container name in a container SAS token
const SasContainerRegex = /\/(\w+-?\w+)\?\w+=/

/**
 * Manage large-scale data
 * TODO: Use a local database
 */
@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  private profilePicUrl$ : BehaviorSubject<string> = new BehaviorSubject<string>(DefaultUserUrl)

  constructor(
    private api: ApiService,
    ) { }

  ngOnInit() {

  }

  public refreshProfilePicUrl() {
    this.api.getProfilePicUrl().subscribe(resp => this.profilePicUrl$.next(resp.body));
  }

  public getProfilePic(id: string): Observable<string> {
    return this.profilePicUrl$.pipe(
      startWith(
        this.profilePicUrl$.value.startsWith("assets") ? DefaultUserUrl 
        : this.fileUrl(this.profilePicUrl$.value, id)),
      map(url => this.fileUrl(url, id)))
  }  

  /**
   * Use a container SAS to get the file URL
   * @param url 
   * @param filename
   */
  private fileUrl(url: string, filename: string) {
    const containerName = url.match(SasContainerRegex)[0]; // TODO Check return value
    return url.replace(containerName, containerName + "/" + filename);
  }

}