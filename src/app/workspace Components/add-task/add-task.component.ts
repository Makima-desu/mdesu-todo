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

  selectedPriority: string = '' // variable for which priority is currently selected, low medium high
  priorityMenu: boolean = false // priority menu bool
  datePickerMenu: boolean = false // scheduler menu bool
  schedulerDateInput: string = '' // get the input to save when task is added

  //@ts-ignore
  @ViewChild('pmenu') pmenu: QueryList<ElementRef> // priority menu element reference
  //@ts-ignore
  @ViewChild('pmenuButton') pmenuButton: QueryList<ElementRef> // priority menu button element reference
  //@ts-ignore
  @ViewChild('addTaskMenu') addTaskMenu: QueryList<ElementRef> //
  //@ts-ignore
  @ViewChild('scheduler') scheduler: QueryList<ElementRef>
  //@ts-ignore
  @ViewChild('datePickerButton') datePickerButton: QueryList<ElementRef>

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
    //@ts-ignore
    // close the date picker if it was clicked outside of it
    if (this.element.nativeElement.contains(targetElement) && !this.datePickerButton.nativeElement.contains(targetElement) && !this.scheduler.nativeElement.contains(targetElement))
    {
      this.datePickerMenu = false

    }
  }

  // save task into database array
  saveTask(title: string, description: string, priority: string, due: string)
  {
    if (priority === '') {priority = 'None'}
    if (due === '') {due = 'Not due'}
    this.workspace.db.me.sections[0].tasks.push
    ({
      title: 'Very long title name right here i hope there is enough characters to display', // task name
      description: 'Very long title name right here i hope there is enough characters to display and dsecipriton so here ti goes aisdnas lkdjas;d jkas;d jas;d', // task description
      priority: priority, // task priority
      created: new Date().toDateString(),
      due: due,
      
    })
    this.dbService.update(this.workspace.db) // update the database
    this.componentsService.addTask = false

  }

}
