import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkspaceComponent } from './workspace Components/workspace/workspace.component';
import { LandingComponent } from './landing/landing.component';
import { SidebarComponent } from './workspace Components/sidebar/sidebar.component';
import { TaskEditorComponent } from './workspace Components/task-editor/task-editor.component';
import { WorkspaceSettingsComponent } from './workspace Components/workspace-settings/workspace-settings.component';
import { AddTaskComponent } from './workspace Components/add-task/add-task.component';
import { MeComponent } from './workspace Components/me/me.component';
import { AddInboxSidebarComponent } from './workspace Components/add-inbox-sidebar/add-inbox-sidebar.component';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    LandingComponent,
    SidebarComponent,
    TaskEditorComponent,
    WorkspaceSettingsComponent,
    AddTaskComponent,
    MeComponent,
    AddInboxSidebarComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
