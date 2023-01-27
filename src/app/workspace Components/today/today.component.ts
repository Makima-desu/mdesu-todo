/* TODO 


*/


import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';
import {timer} from 'rxjs'
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
})
export class TodayComponent implements OnInit {


  constructor(private db: DatabaseService, public workspace: LoadWorkspaceService, private componentsService: EnablingComponentsService) 
  {
    

  }
  date: any = new Date() // todays date

  ngOnInit(): void 
  {
    // utilize this function to check if certain tasks are overdue
    // currently it updates the clock
    timer(0, 1000).subscribe(() =>
    {
      this.date = new Date()

    })

    
  }

}
