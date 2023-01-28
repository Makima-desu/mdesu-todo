import { Component, OnInit, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnInit {


  constructor(public workspace: LoadWorkspaceService, public componentsService: EnablingComponentsService) 
  {
    

  }

  ngOnInit(): void 
  {

  }
  

}
