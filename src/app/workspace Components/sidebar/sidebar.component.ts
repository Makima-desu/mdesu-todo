import { Component, OnInit, HostListener } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  dateNow = new Date()
  sidebar: boolean = true

  sleep(ms: any)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  constructor(public workspace: LoadWorkspaceService, private dbService: DatabaseService) 
  {
    this.sleep(100).then(() => 
    {
      // check to see if the first index of the array title includes 'remove', then and remove it
      if (this.workspace.db.sidebar[0].title === 'remove' && this.workspace.db.completed.tasks[0].title === 'remove')
      {
        this.workspace.db.sidebar.splice(0)
        this.workspace.db.completed.tasks.splice(0)
        this.dbService.update(this.workspace.db)

      }

    })
  }

  ngOnInit(): void 
  {

   

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) 
  {
    // depending on the screen size, show or hide the sidebar
    if (window.innerWidth < 640)
    {
      this.sidebar = false

    }
    else this.sidebar = true


  }

  addSidebarInbox()
  {
    this.workspace.db.sidebar.push
    ({
      title: 'Viria'

    })
    // this.dbService.update(this.workspace.db) enable this later

  }

}
