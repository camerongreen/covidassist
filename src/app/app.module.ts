import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material/material.module';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {FormComponent} from './form/form.component';
import {ResultsComponent} from './results/results.component';
import {ResourceComponent} from './resource/resource.component';
import {initAppFactory} from './InitAppFactory';
import {DataSourceService} from './data-source.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    ResultsComponent,
    ResourceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initAppFactory,
    multi: true,
    deps: [DataSourceService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
