import { Component, OnInit, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnInit {


  workspaceSettings: boolean = false
  taskEditor: boolean = false

  constructor(public workspace: LoadWorkspaceService, private componentsService: EnablingComponentsService) 
  {

  }

  ngOnInit(): void 
  {

  }
  

}
