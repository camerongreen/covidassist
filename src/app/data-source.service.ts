import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Resource} from './resource.model';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  resources: Resource[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  search(state: string, category: string): Resource[] {
    const returnVal: Resource[] = [];
    for (const resource of this.resources) {
      if (this.matchingRow(state, category, resource)) {
        returnVal.push(resource);
      }
    }
    return returnVal;
  }

  getCategories(): string[] {
    const uniqueCategories: string[] = [];
    for (const resource of this.resources) {
      for (const category of resource.categories) {
        uniqueCategories[category] = true;
      }
    }

    return Object.keys(uniqueCategories).sort();
  }

  matchingRow(state: string, category: string, resource: Resource): boolean {
    if (
      ((resource.region.toLocaleLowerCase() === state) || (resource.region.toLocaleLowerCase() === 'federal'))
      && (resource.categories.indexOf(category) !== -1)
    ) {
      return true;
    }
    return false;
  }

  getResources(): Observable<object> {
    return this.http.get<object>(environment.resourcesUrl);
  }

  parseResources(resourcesJson: object): void {
    for (const entry of resourcesJson.feed.entry) {
      this.resources.push(this.parseResource(entry));
    }
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
