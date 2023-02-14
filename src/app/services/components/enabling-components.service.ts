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
  index?: number
  taskIndex?: number
  inbox?: string
}

interface Category
{
  title?: string
  inboxes?: [{}]
  index?: number

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

  sectionEditor: boolean = false
  sectionClicked: boolean = false
  sectionIndex: any

  taskInfo: TaskInfo = {} // for passing task information
  taskEditor: boolean = false // task editor component, hidden by default
  taskClicked: boolean = false

  index: number = -1
  inbox: string = ''

  addInbox: boolean = false // adding an inbox to sidebar
  
  addTask: boolean = false // adding task menu
  addTaskClicked: boolean = false // for checking if the add task button was clicked

  editCategory: boolean = false
  editCategoryClicked: boolean = false
  categoryInfo: Category = {}

  addCategoryEditor(element: any)
  {
    if (element)
    {
      this.editCategoryClicked = true
      this.editCategory = true
      this.sleep(100).then(() => this.editCategoryClicked = false)

    }

  }

  addSectionEditor(element: any, index: number)
  {
    if (element)
    {
      this.sectionIndex = index
      this.sectionClicked = true
      this.sectionEditor = true
      this.sleep(100).then(() => this.sectionClicked = false)

    }

  }

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
  addTaskFunc(element: any, index: number, inbox: string)
  {
    // if yes
    if (element)
    {
      this.addTaskClicked = true // change the click to true
      this.addTask = true // show the menu
      this.index = index
      this.inbox = inbox
      this.sleep(100).then(() => this.addTaskClicked = false)
      // sleep here is neccessary because the only way to check if the click
      // happend outside is to check the entire document
      // if sleep is removed, the false is immediately applied thus not allowing 
      // to show the menu again because the condition is always false

    }

  }

  loadCategoryInfo(title: string, inboxes: any, index: number)
  {
    this.categoryInfo =
    {
      title: title,
      inboxes: inboxes,
      index: index

    }

  }

  getCategoryInfo()
  {
    return this.categoryInfo

  }

  loadTaskInfo(title: string, description: string, priority: string, created: string, due: string, section: string, sectionIndex: number, taskIndex: number, inbox: string): void
  {
    this.taskEditor = true
    this.taskInfo = 
    {
      title: title, // title
      description: description, // desc
      priority: priority, // task priority
      created: created, // task creation date
      section: section, //
      due: due, // when its due
      index: sectionIndex, // the section index
      taskIndex: taskIndex, // task index
      inbox: inbox // which inbox it belongs

    }

  }

  // if component is enabled, load all info into varibales to display and edit the task info
  getTaskInfo(): object
  {
    return this.taskInfo

  }

}
