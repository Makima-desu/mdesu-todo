import { Component, OnInit, HostListener, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
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
  categoryOptionsClicked: boolean = false

  // @ts-ignore
  @ViewChild('categoryOptions') categoryOptions: ElementRef
  // @ts-ignore
  @ViewChildren('categoryOptionsButton') categoryOptionsButton: QueryList<ElementRef>

  sleep(ms: any)
  {
    return new Promise(resolve => setTimeout(resolve, ms));

  }

  constructor(public workspace: LoadWorkspaceService, private dbService: DatabaseService, private element: ElementRef, public components: EnablingComponentsService) 
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
    // loop through each option button
    this.categoryOptionsButton.forEach(button =>
      {
        // if the option button is clicked
        // change the var to true
        // and wait literally any time to change to false
        if (button.nativeElement.contains(targetElement))
        {
          this.categoryOptionsClicked = true
          this.sleep(1).then(() => this.categoryOptionsClicked = false)
          // need the sleep purely because i have no idea how detect the click outside the element
          // while at the same time check to see if the button was pressed

        }

      })

    // if the click happens outisde or inside and the option button is "false" then hide the menu
    if ((!this.categoryOptions.nativeElement.contains(targetElement) || this.categoryOptions.nativeElement.contains(targetElement)) && this.categoryOptionsClicked === false)
    {
      this.categoryOptionsIndex = -1

    }

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
