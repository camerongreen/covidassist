import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Resource} from './resource.model';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  resources: Resource[];

  constructor(
    private http: HttpClient
  ) {
    this.loadResources();
  }

  search(state: string, userStatus: string): Resource[] {
    const returnVal = [];
    for (const resource of this.resources) {
      if (this.matchingRow(state, userStatus, resource)) {
        returnVal.push(resource);
      }
    }
    return returnVal;
  }

  matchingRow(state: string, userStatus: string, resource: Resource): boolean {
    if ((resource.region.toLocaleLowerCase() === state) || (resource.region.toLocaleLowerCase() === 'federal')) {
      return true;
    } else if (resource.categories.indexOf(userStatus) !== -1) {
      return true;
    }
    return false;
  }

  loadResources(): void {
    this.getResources().subscribe(resourcesJson => this.resources = this.parseResources(resourcesJson));
  }

  getResources(): Observable<object> {
    return this.http.get<object>(environment.resourcesUrl);
  }

  parseResources(resourcesJson: object): Resource[] {
    const returnVal: Resource[] = [];
    for (const entry of resourcesJson.feed.entry) {
      returnVal.push(this.parseResource(entry));
    }
    return returnVal;
  }

  parseResource(entry: object): Resource {
    const resource: Resource = {
      categories: this.parseCategories(entry.gsx$categories.$t),
      region: entry.gsx$region.$t,
      type: entry.gsx$type.$t,
      title: entry.gsx$title.$t,
      description: entry.gsx$description.$t,
      url: entry.gsx$url.$t
    };

    return resource;
  }

  parseCategories(categories: string): string[] {
    return categories.split(/\s*(?:\n|,|\.|\sand\s)\s*/).filter(val => val.length).map(val => val.toLowerCase());
  }
}
