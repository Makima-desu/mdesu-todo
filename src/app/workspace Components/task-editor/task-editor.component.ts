import { Component, OnInit, HostListener, ElementRef, QueryList, ViewChild, Query} from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { ActivatedRoute } from '@angular/router';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
})
export class TaskEditorComponent implements OnInit {

  constructor(private router: ActivatedRoute, public components: EnablingComponentsService, private element: ElementRef, public workspace: LoadWorkspaceService, private database: DatabaseService) { }

  //@ts-ignore
  @ViewChild('editor') editor: QueryList<ElementRef>
  task: any // for recieving the task info
  newTask: any // updating task info

  priorityMenu: boolean = false // choosing the priority of the task
  datePickerMenu: boolean = false // choosing the due date

  routeParameters: any[] = []

  ngOnInit(): void 
  {
    this.components.sleep(1).then(() => {this.task = this.components.getTaskInfo();})

    this.router.queryParams.subscribe(item =>
      {
        // @ts-ignore
        this.routeParameters = item

      })

  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: any, targetElement: any)
  {
    //@ts-ignore
    if (!this.editor.nativeElement.contains(targetElement) && this.components.taskClicked === false)
    {
      this.components.taskEditor = false

    }

  }

  placeholder(element: any)
  {
    if (element.innerText === 'Task name') element.innerText = ''
    if (element.innerText === 'Description') element.innerText = ''

  }

  saveTask(title: string, description: string, created: string, priority: string, due: string)
  {
    if (due === '') {due = 'Not due'}
    this.newTask = 
    {
      title: title,
      description: description,
      created: created,
      priority: priority,
      due: due,

    }
    if (this.task.inbox === 'me')
    {
      this.workspace.db.me.sections[this.task.index].tasks[this.task.taskIndex] = this.newTask

    }
    else 
    {
      this.workspace.db.sidebar.categories[this.routeParameters[1]].inbox[this.routeParameters[2]].sections[this.task.index].tasks[this.task.taskIndex] = this.newTask

    }
    this.components.taskEditor = false
    this.database.update(this.workspace.db)

  }

  closePrirityMenu()
  {
    this.components.sleep(10).then(() => this.priorityMenu = false)

  }

  // completing the task
  completeTask()
  {
    let splicedTask
    // if the inbox is me, then save it to as inbox "me" otherwise to any other inbox
    if (this.task.inbox === 'me')
    {
      // remove the task from array
      splicedTask = this.workspace.db.me.sections[this.task.index].tasks.splice(this.task.taskIndex, 1)
      this.workspace.db.completed.tasks.push(splicedTask[0]) // pass the task into completed array
      splicedTask[0].inbox = 'me'
      splicedTask[0].completed = new Date().toDateString()
      splicedTask[0].sectionIndex = this.task.index

    }
    else
    {
      // remove the task from array
      splicedTask = this.workspace.db.sidebar.categories[this.routeParameters[1]].inbox[this.routeParameters[2]].sections[this.task.index].tasks.splice(this.task.taskIndex, 1)
      this.workspace.db.completed.tasks.push(splicedTask[0]) // pass the task into completed array
      splicedTask[0].inbox = this.routeParameters[0]
      splicedTask[0].categoryIndex = this.routeParameters[1]
      splicedTask[0].inboxIndex = this.routeParameters[2]
      splicedTask[0].completed = new Date().toDateString()
      splicedTask[0].sectionIndex = this.task.index

    }

    this.components.taskEditor = false
    this.database.update(this.workspace.db) // update db

  }

  // deleting the task
  deleteTask()
  {
    let splicedTask

    if (this.task.inbox === 'me')
    {
      // remove the task from array
      splicedTask = this.workspace.db.me.sections[this.task.index].tasks.splice(this.task.taskIndex, 1)
      this.workspace.db.deleted.tasks.push(splicedTask[0]) // pass the task into completed array
      splicedTask[0].inbox = 'me'
      splicedTask[0].completed = new Date().toDateString()
      splicedTask[0].sectionIndex = this.task.index
      
    }
    else
    {
      // remove the task from array
      splicedTask = this.workspace.db.sidebar.categories[this.routeParameters[1]].inbox[this.routeParameters[2]].sections[this.task.index].tasks.splice(this.task.taskIndex, 1)
      this.workspace.db.deleted.tasks.push(splicedTask[0]) // pass the task into completed array
      splicedTask[0].inbox = this.routeParameters[0]
      splicedTask[0].completed = new Date().toDateString()
      splicedTask[0].sectionIndex = this.task.index

    }
    
    this.components.taskEditor = false
    this.database.update(this.workspace.db) // update db
  }

  // if the task was already completed, uncomplete it and add it back from where it came from
  uncompleteTask()
  {
    let splicedTask

    if (this.task.section === 'Completed') {splicedTask = this.workspace.db.completed.tasks.splice(this.task.taskIndex, 1)}
    else if (this.task.section === 'Deleted') {splicedTask = this.workspace.db.deleted.tasks.splice(this.task.taskIndex, 1)}



    // check if the inbox is "me" and add it back to there
    if (this.task.inbox === 'me')
    {
      this.workspace.db.me.sections[splicedTask[0].sectionIndex].tasks.push(splicedTask[0])
      
    }
    else
    {
      this.workspace.db.sidebar.categories[splicedTask[0].categoryIndex].inbox[splicedTask[0].inboxIndex].sections[splicedTask[0].sectionIndex].tasks.push(splicedTask[0])
      // this.workspace.db.sidebar.categories[this.routeParameters[1]].inbox[this.routeParameters[2]].sections[splicedTask[0].sectionIndex].tasks.push(splicedTask[0])

    }

    this.components.taskEditor = false
    this.database.update(this.workspace.db)

  }

}
