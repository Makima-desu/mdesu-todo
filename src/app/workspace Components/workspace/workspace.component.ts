import { Component, OnInit, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnInit {


  constructor(public workspace: LoadWorkspaceService, public components: EnablingComponentsService, private router: Router) 
  {
    

  }

  ngOnInit(): void 
  {
    if (this.router.url === '/workspace')
    {
      this.router.navigate(['/workspace/me'])

    }

  }
  

}
