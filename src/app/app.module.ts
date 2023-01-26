import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkspaceComponent } from './workspace Components/workspace/workspace.component';
import { LandingComponent } from './landing/landing.component';
import { SidebarComponent } from './workspace Components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    LandingComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
