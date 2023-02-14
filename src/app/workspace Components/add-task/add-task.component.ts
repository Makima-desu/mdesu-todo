import { Component, OnInit, HostListener, ElementRef, ViewChild, ViewRef, ViewChildren, QueryList } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { ActivatedRoute } from '@angular/router';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent implements OnInit {

  constructor(private router: ActivatedRoute, private element: ElementRef, public components: EnablingComponentsService, private workspace: LoadWorkspaceService, private dbService: DatabaseService) { }

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

  routeParameters: any[] = []

  ngOnInit(): void 
  {
    this.selectedPriority = 'None' // reset priority on taskinit
    this.router.queryParams.subscribe(item =>
      {
        // @ts-ignore
        this.routeParameters = item

      })
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement)
  {
    // if the click happend outside of element and the add task button was not clicked, hide the menu
    //@ts-ignore
    if (!this.addTaskMenu.nativeElement.contains(targetElement) && this.components.addTaskClicked === false)
    {
      this.components.addTask = false

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

  // cant use placeholder on tags
  // it substitutes it for a placeholder
  placeholder(element: any)
  {
    if (element.innerText === 'Task name') element.innerText = ''
    if (element.innerText === 'Description') element.innerText = ''

  }

  // save task into database array
  saveTask(title: string, description: string, priority: string, due: string)
  {
    if (priority === '') {priority = 'None'}
    if (due === '') {due = 'Not due'}

    if (this.components.inbox === 'me')
    {
      this.workspace.db.me.sections[this.components.index].tasks.push
      ({
        title: title, // task name
        description: description, // task description
        priority: priority, // task priority
        created: new Date().toDateString(),
        // maybe date in miliseconds for comparison
        due: due,
  
      })

    }
    else 
    {
      this.workspace.db.sidebar.categories[this.routeParameters[1]].inbox[this.routeParameters[2]].sections[this.components.index].tasks.push
      ({
        title: title, // task name
        description: description, // task description
        priority: priority, // task priority
        created: new Date().toDateString(),
        // maybe date in miliseconds for comparison
        due: due,
  
      })
    }

    this.dbService.update(this.workspace.db) // update the database
    this.components.addTask = false

  }

}
