import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SelectorPaneComponent } from './components/selector-pane/selector-pane.component';
import { WorkspacePaneComponent } from './components/workspace-pane/workspace-pane.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectorPaneComponent,
    WorkspacePaneComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
