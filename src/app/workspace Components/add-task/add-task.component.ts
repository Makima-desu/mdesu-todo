import { Component, OnInit, HostListener, ElementRef, ViewChild, ViewRef, ViewChildren, QueryList } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent implements OnInit {

  constructor(private element: ElementRef, public componentsService: EnablingComponentsService, private workspace: LoadWorkspaceService, private dbService: DatabaseService) { }

  selectedPriority: string = ''
  priorityMenu: boolean = false

  //@ts-ignore
  @ViewChild('pmenu') pmenu: QueryList<ElementRef>
  //@ts-ignore
  @ViewChild('pmenuButton') pmenuButton: QueryList<ElementRef>
  //@ts-ignore
  @ViewChild('addTaskMenu') addTaskMenu: QueryList<ElementRef>

  ngOnInit(): void 
  {
    this.selectedPriority = '' // reset priority on taskinit

  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement)
  {
    // if the click happend outside of element and the add task button was not clicked, hide the menu
    //@ts-ignore
    if (!this.addTaskMenu.nativeElement.contains(targetElement) && this.componentsService.addTaskClicked === false)
    {
      this.componentsService.addTask = false

    }
    // @ts-ignore
    // hide the priority menu if if was clicked outside of it
    if (this.element.nativeElement.contains(targetElement) && !this.pmenuButton.nativeElement.contains(targetElement))
    {
      this.priorityMenu = false

    }

  }

  // save task into database array
  saveTask(title: string, description: string, priority: string)
  {
    this.workspace.db.today.push
    ({
      title: title, // task name
      description: description, // task description
      priority: priority // task priority

    })
    // this.dbService.update(this.workspace.db) // update the database
    this.componentsService.addTask = false

  }

}
