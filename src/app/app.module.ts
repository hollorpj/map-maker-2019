import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SelectorPaneComponent } from './components/app-page/selector-pane/selector-pane.component';
import { WorkspacePaneComponent } from './components/app-page/workspace-pane/workspace-pane.component';
import { FormsModule } from '@angular/forms';
import { ControlPanelComponent } from './components/app-page/workspace-pane/widgets/control-panel/control-panel.component';
import { WrenchButtonComponent } from './components/shared/buttons/wrench-button/wrench-button.component';
import { DiskButtonComponent } from './components/shared/buttons/disk-button/disk-button.component';
import { AbstractButtonComponent } from './components/shared/buttons/abstract-button/abstract-button.component';
import { DrawingBoardComponent } from './components/app-page/workspace-pane/widgets/drawing-board/drawing-board.component';
import { SettingsModalComponent } from './components/app-page/modals/settings-modal/settings-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectorPaneComponent,
    WorkspacePaneComponent,
    ControlPanelComponent,
    WrenchButtonComponent,
    DiskButtonComponent,
    AbstractButtonComponent,
    DrawingBoardComponent,
    SettingsModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
