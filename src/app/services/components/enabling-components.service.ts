import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

interface TaskInfo
{
  title?: string
  description?: string
  priority?: string
  created?: string
  section?: string
  due?: string
}

@Injectable({
  providedIn: 'root'
})
export class EnablingComponentsService {

  constructor() { }

  sleep(ms: any)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  workspaceSettings: boolean = false // workspace settings component, hidden by default
  
  taskInfo: TaskInfo = {} // for passing task information
  taskEditor: boolean = true // task editor component, hidden by default
  taskClicked: boolean = false

  addInbox: boolean = false // adding an inbox to sidebar
  
  addTask: boolean = false // adding task menu
  addTaskClicked: boolean = false // for checking if the add task button was clicked

  addTaskEditor(element: any)
  {
    if (element)
    {
      this.taskClicked = true
      this.taskEditor = true
      this.sleep(100).then(() => this.taskClicked = false)

    }

  }

  // function to check if add task button was clicked
  addTaskFunc(element: any)
  {
    // if yes
    if (element)
    {
      this.addTaskClicked = true // change the click to true
      this.addTask = true // show the menu
      this.sleep(100).then(() => this.addTaskClicked = false)
      // sleep here is neccessary because the only way to check if the click
      // happend outside is to check the entire document
      // if sleep is removed, the false is immediately applied thus not allowing 
      // to show the menu again because the condition is always false

    }

  }

  loadTaskInfo(title: string, description: string, priority: string, created: string, due:string, section: string): void
  {
    this.taskEditor = true
    this.taskInfo = 
    {
      title: title,
      description: description,
      priority: priority,
      created: created,
      section: section,
      due: due,
    }

  }

  // if component is enabled, load all info into varibales to display and edit the task info
  getTaskInfo(): object
  {
    return this.taskInfo

  }

}
