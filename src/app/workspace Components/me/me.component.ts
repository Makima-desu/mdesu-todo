// @ts-nocheck
import { Component, OnInit, HostListener, ViewChild, QueryList, ElementRef } from '@angular/core';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';
import {timer} from 'rxjs'
import { DatabaseService } from 'src/app/db/database.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
})
export class MeComponent implements OnInit {

  constructor(public workspace: LoadWorkspaceService, public components: EnablingComponentsService, private database: DatabaseService) { }

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

  // function to add a section to Me inbox
  addSection()
  {
    this.workspace.db.me.sections.push
    ({
      title: 'Section',
      tasks: [{}]

    })
    // splice the task at index 0 so there isnt an empty task
    this.workspace.db.me.sections[this.workspace.db.me.sections.length - 1].tasks.splice(0)
    this.database.update(this.workspace.db)
  }

  // move the section to the left in the array
  shiftLeft(index: number)
  { 
    this.workspace.db.me.sections.splice(index - 1, 0, this.workspace.db.me.sections[index])
    this.workspace.db.me.sections.splice(index + 1, 1)
    this.database.update(this.workspace.db)

  }

  // move the section to the right in the array
  shiftRight(index: number)
  {
    this.workspace.db.me.sections.splice(index + 2, 0, this.workspace.db.me.sections[index])
    this.workspace.db.me.sections.splice(index, 1)
    this.database.update(this.workspace.db)

  }

}
