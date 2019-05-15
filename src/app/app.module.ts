import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SelectorPaneComponent } from './components/app-page/selector-pane/selector-pane.component';
import { WorkspacePaneComponent } from './components/app-page/workspace-pane/workspace-pane.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SelectorPaneComponent,
    WorkspacePaneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
