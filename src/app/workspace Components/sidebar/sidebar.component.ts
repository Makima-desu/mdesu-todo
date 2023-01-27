import { Component, OnInit, HostListener } from '@angular/core';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  dateNow = new Date()
  sidebar: boolean = true

  constructor(public workspace: LoadWorkspaceService) { }

  ngOnInit(): void {
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

}
