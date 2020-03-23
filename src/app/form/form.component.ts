import {Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchDetailsService} from '../search-details.service';
import {DataSourceService} from '../data-source.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  searchForm: FormGroup;

  states = [
    {name: 'act', friendly_name: 'Australian Capital Territory'},
    {name: 'nsw', friendly_name: 'New South Wales'},
    {name: 'nt', friendly_name: 'Northern Territory'},
    {name: 'qld', friendly_name: 'Queensland'},
    {name: 'sa', friendly_name: 'South Australia'},
    {name: 'tas', friendly_name: 'Tasmania'},
    {name: 'vic', friendly_name: 'Victoria'},
    {name: 'wa:', friendly_name: 'West Australia'}
  ];

  categories: string[] = [];

  constructor(
    private searchDetailsService: SearchDetailsService,
    private dataSourceService: DataSourceService
  ) {
    this.searchForm = this.makeForm();
  }

  ngOnInit(): void {
    this.categories = this.dataSourceService.getCategories();
  }

  makeForm(): FormGroup {
    return new FormGroup({
      state: new FormControl(),
      category: new FormControl()
    });
  }

  submit() {
    this.searchDetailsService.searchRequest(this.searchForm.value);
  }

  updateCategories(value) {
    this.categories = this.dataSourceService.getCategoriesByState(value);
  }
}
