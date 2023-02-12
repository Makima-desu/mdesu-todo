import { Component, OnInit, ElementRef } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
})
export class CompletedComponent implements OnInit {

  completedtasks: any
  noPriorityTasks: any[] = []
  LowPriorityTasks: any[] = []
  MediumPriorityTasks: any[] = []
  HighPriorityTasks: any[] = []

  constructor(public workspace: LoadWorkspaceService, public components: EnablingComponentsService, private database: DatabaseService, private element: ElementRef) 
  {

  }

  date: any = new Date()

  ngOnInit(): void 
  {
  
  }

}
