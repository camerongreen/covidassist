import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SearchDetailsService} from '../search-details.service';
import {DataSourceService} from '../data-source.service';
import {Subscription} from 'rxjs';
import {Resource} from '../resource.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

const ELEMENT_DATA: Resource[] = [
  {
    region: 'qld',
    categories: ['business'],
    type: 'THing',
    title: 'I am title',
    description: 'I am description',
    url: 'http://www.gogole.com',
    startDate: '5/12/2020',
    endDate: '6/12/2020',
  },
  {
    region: 'qld',
    categories: ['business'],
    type: 'A THing',
    title: 'A I am title',
    description: 'I am description',
    url: 'http://www.gogole.com',
    startDate: '5/12/2020',
    endDate: '4/12/2020',
  }
];

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
export class ResultsComponent implements OnDestroy, OnInit {
  subscription: Subscription;
  resources = new MatTableDataSource<Resource>();
  columnsToDisplay = [
    'title',
    'type',
    'endDate',
    'more'
  ];
  expandedElement: Resource | null;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private searchDetailsService: SearchDetailsService,
    private dataSourceService: DataSourceService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.searchDetailsService.searchRequested$.subscribe(
      query => {
        this.updateQuery(query);
      }
    );
    this.resources.sort = this.sort;
  }

  updateQuery(query): void {
    this.resources.data = this.dataSourceService.search(query.state, query.category);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
