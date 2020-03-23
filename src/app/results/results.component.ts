import {Component, OnDestroy} from '@angular/core';
import {SearchDetailsService} from '../search-details.service';
import {DataSourceService} from '../data-source.service';
import {Subscription} from 'rxjs';
import {Resource} from '../resource.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnDestroy {
  subscription: Subscription;
  resources: Resource[];

  constructor(
    private searchDetailsService: SearchDetailsService,
    private dataSourceService: DataSourceService
  ) {
    this.subscription = searchDetailsService.searchRequested$.subscribe(
      query => {
        this.updateQuery(query);
      }
    );
  }

  updateQuery(query): void {
    this.resources = this.dataSourceService.search(query.state, query.userStatus);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
