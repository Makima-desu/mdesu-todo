import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

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
  taskEditor: boolean = false // task editor component, hidden by default
  addTask: boolean = false // adding task menu
  addTaskClicked: boolean = false // for checking if the add task button was clicked

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

  // if component is enabled, load all info into varibales to display and edit the task info
  getTaskInfo(title: string, description: string, created: string, due: string, priority: string, repeat: boolean, status: boolean)
  {


  }

}
