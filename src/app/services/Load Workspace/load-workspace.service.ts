import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';

@Injectable({
  providedIn: 'root'
})
export class LoadWorkspaceService {

  config: any
  today: any

  constructor(private db: DatabaseService) 
  { 
    // get all the necessary information to show
    this.db.workspace.subscribe(workspace =>
      {
        this.config = workspace[0] // change to .config
        this.today = workspace[0].today // today inbox


      })

  }

}
