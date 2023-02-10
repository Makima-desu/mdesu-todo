import { Component, OnInit, HostListener, ElementRef, QueryList, ViewChild, Query} from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
})
export class TaskEditorComponent implements OnInit {

  constructor(public components: EnablingComponentsService, private element: ElementRef, public workspace: LoadWorkspaceService, private database: DatabaseService) { }

  //@ts-ignore
  @ViewChild('editor') editor: QueryList<ElementRef>
  task: any // for recieving the task info
  newTask: any // updating task info

  priorityMenu: boolean = false // choosing the priority of the task
  datePickerMenu: boolean = false // choosing the due date
  ngOnInit(): void 
  {
    this.components.sleep(1).then(() => this.task = this.components.getTaskInfo())

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

  saveTask(title: string, description: string, created: string, priority: string, due: string,)
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
    this.components.taskEditor = false
    this.workspace.db.me.sections[this.task.index].tasks[this.task.taskIndex] = this.newTask
    this.database.update(this.workspace.db)

  }

  closePrirityMenu()
  {
    this.components.sleep(10).then(() => this.priorityMenu = false)

  }

  // completing the task
  completeTask()
  {
    // removing the task from section to the completed inbox

  }

  // deleting the task
  deleteTask()
  {
    this.workspace.db.me.sections[this.task.index].tasks.splice(this.task.taskIndex, 1)
    this.database.update(this.workspace.db)
    // this.component save to deleted db array
    this.components.taskEditor = false

  }

}
