import { Component, OnInit, HostListener, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  dateNow = new Date()
  sidebar: boolean = true

  categoryIndex: number[] = [0] // an array to hold value for showing or hiding the inboxes of different categories
  categoryOptionsIndex: number = -1

  // @ts-ignore
  @ViewChild('categoryOptions') categoryOptions: QueryList<ElementRef>
  // @ts-ignore
  @ViewChild('categoryOptionsButton') categoryOptionsButton: ElementRef

  sleep(ms: any)
  {
    return new Promise(resolve => setTimeout(resolve, ms));

  }

  constructor(public workspace: LoadWorkspaceService, private dbService: DatabaseService, private element: ElementRef) 
  {
    this.sleep(100).then(() => 
    {
      // check to see if the first index of the array title includes 'remove', then and remove it
      if (this.workspace.db.sidebar.categories[0].title === 'remove' && this.workspace.db.completed.tasks[0].title === 'remove')
      {
        this.workspace.db.sidebar.categories.splice(0)
        this.workspace.db.completed.tasks.splice(0)
        this.dbService.update(this.workspace.db)

      }

    })
  }

  ngOnInit(): void 
  {
    if (window.innerWidth < 640)
    {
      this.sidebar = false

    }
    else this.sidebar = true


  }

  changeIndex(index: number)
  {
    this.categoryOptionsIndex = index

  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement)
  {
    // hide the menu if clicked outside
    //@ts-ignore

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) 
  {
    // depending on the screen size, show or hide the sidebar
    if (window.innerWidth < 640)
    {
      this.sidebar = false

    }
    else this.sidebar = true


  }

  // 
  addCategory()
  {
    this.workspace.db.sidebar.categories.push
    ({
      title: 'Empty Category',
      inbox:
      [{
        title: 'Test',
        sections:
        [{
          title: 'remove',
          tasks:
          [{
            title: 'remove'

          }]

        }]

      }]


    })
    // this.workspace.db.sidebar.categories.inbox[0].sections.splice(0)
    // this.workspace.db.sidebar.categories[this.workspace.db.sidebar.categories.length - 1].inbox.splice(0, 1)
    this.dbService.update(this.workspace.db)

  }

  // delete category
  deleteCategory(index: number)
  {
    this.workspace.db.sidebar.categories.splice(index, 1)
    this.dbService.update(this.workspace.db)

  }

}

/* Where I left off 
  - Configure adding the proper information for category and inboxes for the database
  - proper design on sidebar with all the information
    // includes
      - category options
        - delete, rename, add inbox, move up/down
      - 
*/
