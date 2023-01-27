import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkspaceComponent } from './workspace Components/workspace/workspace.component';
import { LandingComponent } from './landing/landing.component';
import { SidebarComponent } from './workspace Components/sidebar/sidebar.component';
import { TodayComponent } from './workspace Components/today/today.component';
import { TaskEditorComponent } from './workspace Components/task-editor/task-editor.component';
import { WorkspaceSettingsComponent } from './workspace Components/workspace-settings/workspace-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    LandingComponent,
    SidebarComponent,
    TodayComponent,
    TaskEditorComponent,
    WorkspaceSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
