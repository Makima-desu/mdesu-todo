import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
})
export class DeletedComponent implements OnInit {

  constructor(public components: EnablingComponentsService, public workspace: LoadWorkspaceService, private database: DatabaseService) { }

  date: any = new Date()

  ngOnInit(): void {
  }

}
