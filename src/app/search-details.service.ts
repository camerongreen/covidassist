import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDetailsService {
  private searchRequestSource = new Subject<any>();

  searchRequested$ = this.searchRequestSource.asObservable();

  searchRequest(query: string[]) {
    this.searchRequestSource.next(query);
  }
}
