import { NgModule} from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { DatabaseService } from './db/database.service';
import { LandingComponent } from './landing/landing.component';
import { CompletedComponent } from './workspace Components/completed/completed.component';
import { DeletedComponent } from './workspace Components/deleted/deleted.component';
import { InboxComponent } from './workspace Components/inbox/inbox.component';
import { MeComponent } from './workspace Components/me/me.component';
import { WorkspaceComponent } from './workspace Components/workspace/workspace.component';


const routes: Routes = 
[
  {path: '', component: LandingComponent},
  {path: 'workspace', component: WorkspaceComponent, children:
  [
    {path: 'me', component: MeComponent}, 
    {path: 'completed', component: CompletedComponent},
    {path: 'deleted', component: DeletedComponent},
    {path: ':inbox', component: InboxComponent}

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{


}
