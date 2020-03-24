import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {FAQComponent} from './faq/faq.component';
import {SearchComponent} from './search/search.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'faq', component: FAQComponent},
  {path: 'search', redirectTo: '', pathMatch: 'full'},
  {path: '', component: SearchComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
