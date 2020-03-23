import {Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchDetailsService} from '../search-details.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  searchForm: FormGroup;

  states = [
    {name: 'qld', friendly_name: 'Queensland'},
    {name: 'sa', friendly_name: 'South Australia'},
    {name: 'wa:', friendly_name: 'West Australia'},
    {name: 'aus', friendly_name: 'Federal'}
  ];

  userStatuses = [
    'Unemployed',
    'Business',
    'Retired',
  ];

  constructor(
    private searchDetailsService: SearchDetailsService
  ) {
    this.searchForm = this.makeForm();
  }

  ngOnInit(): void {
  }

  makeForm(): FormGroup {
    return new FormGroup({
      state: new FormControl(),
      userStatus: new FormControl()
    });
  }

  submit() {
    this.searchDetailsService.searchRequest(this.searchForm.value);
  }
}
