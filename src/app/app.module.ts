import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SelectorPaneComponent } from './components/app-page/selector-pane/selector-pane.component';
import { WorkspacePaneComponent } from './components/app-page/workspace-pane/workspace-pane.component';
import { FormsModule } from '@angular/forms';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import { ButtonPanelComponent } from './components/app-page/workspace-pane/widgets/button-panel/button-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectorPaneComponent,
    WorkspacePaneComponent,
    ButtonPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
