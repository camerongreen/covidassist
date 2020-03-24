import {Component, OnDestroy} from '@angular/core';
import {SearchDetailsService} from '../search-details.service';
import {DataSourceService} from '../data-source.service';
import {Subscription} from 'rxjs';
import {Resource} from '../resource.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ResultsComponent implements OnDestroy {
  subscription: Subscription;
  resources: Resource[];
  columnsToDisplay = {
    title: 'Title',
    type: 'Type',
    endDate: 'End date',
    more: ''
  };
  columnIds = Object.keys(this.columnsToDisplay);
  expandedElement: Resource | null;

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
    this.resources = this.dataSourceService.search(query.state, query.category);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
