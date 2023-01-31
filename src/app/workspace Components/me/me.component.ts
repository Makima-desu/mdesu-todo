// @ts-nocheck
import { Component, OnInit, HostListener, ViewChild, QueryList, ElementRef } from '@angular/core';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';
import {timer} from 'rxjs'

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
})
export class MeComponent implements OnInit {

  constructor(public workspace: LoadWorkspaceService, public components: EnablingComponentsService) { }

  date: any = new Date() // todays date
  // @ts-ignore
  @ViewChild('tasks') tasks: QueryList<ElementRef> // tasks section for scrollbar tracking

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
