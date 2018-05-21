import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';

import { WorkflowService } from './services/workflow.service';
import { MainService } from './services/main.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [
    WorkflowService,
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
