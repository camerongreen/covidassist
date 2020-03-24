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
    return returnVal.sort((a: Resource, b: Resource) => a.title.localeCompare(b.title));
  }

  getCategories(): string[] {
    const uniqueCategories = new Map();
    for (const resource of this.resources) {
      for (const category of resource.categories) {
        uniqueCategories.set(category, true);
      }
    }

    return Array.from(uniqueCategories.keys()).sort();
  }

  getCategoriesByState(region: string): string[] {
    const uniqueCategories = new Map();
    for (const resource of this.resources) {
      for (const category of resource.categories) {
        const regionLower = resource.region.toLocaleLowerCase();
        if (!(regionLower in uniqueCategories)) {
          uniqueCategories.set(regionLower, new Map());
        }
        (uniqueCategories.get(regionLower)).set(category, true);
      }
    }

    const returnVal = new Set<string>();

    if (uniqueCategories.has('aus')) {
      const ausKeys: string[] = Array.from(uniqueCategories.get('aus').keys());
      ausKeys.forEach(item => returnVal.add(item));
    }

    if (uniqueCategories.has(region)) {
      const regionKeys: string[] = Array.from(uniqueCategories.get(region).keys());
      regionKeys.forEach(item => returnVal.add(item));
    }

    return [...returnVal].sort();
  }

  matchingRow(state: string, category: string, resource: Resource): boolean {
    const endDate = this.convertDate(resource.endDate);
    if (endDate < new Date()) {
      return false;
    }
    if (
      ([state, 'aus'].indexOf(resource.region.toLocaleLowerCase()) !== -1)
      && ((resource.categories.indexOf(category) !== -1) || (resource.categories.length === 0))
    ) {
      return true;
    }
    return false;
  }

  getResources(): Observable<object> {
    return this.http.get<object>(environment.resourcesUrl);
  }

  parseResources(resourcesJson: any): void {
    for (const entry of resourcesJson.feed.entry) {
      this.resources.push(this.parseResource(entry));
    }
  }

  parseResource(entry: any): Resource {
    const resource: Resource = {
      categories: this.parseCategories(entry.gsx$categories.$t),
      region: entry.gsx$region.$t.trim(),
      type: entry.gsx$type.$t.trim(),
      title: entry.gsx$title.$t.trim(),
      description: entry.gsx$description.$t.trim(),
      startDate: entry.gsx$startdate.$t.trim(),
      endDate: entry.gsx$enddate.$t.trim(),
      url: entry.gsx$url.$t.trim()
    };

    return resource;
  }

  parseCategories(categories: string): string[] {
    return categories.split(/\s*(?:\n|,|\.|\sand\s)\s*/).filter(val => val.length).map(val => val.toLowerCase());
  }

  convertDate(dateString: string) {
    const dateParts: string[] = dateString.split('/');

    // Month is 0-based, that's why we need dataParts[1] - 1.
    return new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));
  }
}
