import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';

@Injectable({
  providedIn: 'root'
})
export class LoadWorkspaceService {

  db: any

  constructor(private dbService: DatabaseService) 
  { 
    // get all the necessary information to show
    this.dbService.workspace.subscribe(workspace =>
      {
        this.db = workspace[0] // assign to db var, it will become workspace.db.whatever I need

      })

  }

}
