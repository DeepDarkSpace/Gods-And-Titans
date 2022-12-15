import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { GodsComponent } from './gods/gods.component';
import { TitansComponent } from './titans/titans.component';
import { GodDetailComponent } from './god-detail/god-detail.component';
import { GodService } from './god.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { GodSearchComponent } from './god-search/god-search.component';
import { HttpClientModule } from '@angular/common/http';
import { TitanService } from './titan.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    GodsComponent,
    TitansComponent,
    GodDetailComponent,
    DashboardComponent,
    MessagesComponent,
    GodSearchComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [GodService, MessageService, TitanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
