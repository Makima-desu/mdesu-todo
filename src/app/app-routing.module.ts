import { NgModule} from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { DatabaseService } from './db/database.service';
import { LandingComponent } from './landing/landing.component';
import { MeComponent } from './workspace Components/me/me.component';
import { WorkspaceComponent } from './workspace Components/workspace/workspace.component';


const routes: Routes = 
[
  {path: '', component: LandingComponent},
  {path: 'workspace', component: WorkspaceComponent, children:
  [
    {path: 'me', component: MeComponent} 
    // {path: ':workspace', component: Inbox}

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{


}
