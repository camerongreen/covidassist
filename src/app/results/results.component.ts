import {Component, OnDestroy} from '@angular/core';
import {SearchDetailsService} from '../search-details.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnDestroy {
  subscription: Subscription;
  query = {};

  constructor(
    private searchDetailsService: SearchDetailsService
  ) {
    this.subscription = searchDetailsService.searchRequested$.subscribe(
      query => {
        this.query = query;
      }
    );
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
