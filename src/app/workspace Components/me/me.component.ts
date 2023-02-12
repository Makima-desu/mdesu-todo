import { Component, OnInit, HostListener, ViewChild, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';
import {timer} from 'rxjs'
import { DatabaseService } from 'src/app/db/database.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
})
export class MeComponent implements OnInit {

  constructor(private router: Router, public workspace: LoadWorkspaceService, public components: EnablingComponentsService, private database: DatabaseService, private element: ElementRef) { }

  date: any = new Date() // todays date

  //@ts-ignore
  @ViewChild('tasks') tasks: QueryList<ElementRef> // tasks section for scrollbar tracking
  //@ts-ignore
  @ViewChild('sectionTitle') sectionTitle: QueryList<ElementRef>
  //@ts-ignore
  @ViewChild('page') page: QueryList<ElementRef>
  //@ts-ignore
  @ViewChild('sectionMenu') sectionMenu: QueryList<ElementRef>

  // variables for indexing the options only to the specificly clicked section
  sectionMenuOptions: number = -1 // 
  sectionTitleIndex: number = -1 // if user wants to edit the title, edit this variable
  editSectionTitle: boolean = false // show/hide section options menu

  ngOnInit(): void 
  {
    // location.reload()
    // utilize this function to check if certain tasks are overdue
    // currently it updates the clock
    timer(0, 1000).subscribe(() =>
    {
      this.date = new Date()

    })
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement)
  {
    // hide the menu if clicked outside
    if (this.element.nativeElement.contains(targetElement))
    {
      this.sectionMenuOptions = -1

    }

  }

  // delete the section
  deleteSection(index: number)
  {
    if (this.workspace.db.me.sections.routines)
    {
      return;

    }
    this.workspace.db.me.sections.splice(index, 1)
    this.database.update(this.workspace.db)

  }

  // save the section title
  saveSectionTitle(index: number)
  {
    //@ts-ignore
    this.workspace.db.me.sections[index].title = this.sectionTitle.nativeElement.value
    this.database.update(this.workspace.db)

  }

  // for showing the title only to the properly selected index section
  EditSectionTitle(index: number)
  {
    this.sectionMenuOptions = index

  }

  // function to add a section to Me inbox
  addSection()
  {
    this.workspace.db.me.sections.unshift
    ({
      title: 'New Section',
      tasks: [{}]

    })
    // splice the task at index 0 so there isnt an empty task
    this.workspace.db.me.sections[0].tasks.splice(0)
    this.database.update(this.workspace.db)

  }

  // move the section left in the array
  shiftLeft(index: number)
  { 
    // properly remove and add the section to the moved spot
    this.workspace.db.me.sections.splice(index - 1, 0, this.workspace.db.me.sections[index])
    this.workspace.db.me.sections.splice(index + 1, 1)

    // if any options are open/enabled, move them to the correctly moved index
    if (this.sectionMenuOptions !== -1) {this.sectionMenuOptions = index - 1}
    if (this.sectionTitleIndex !== -1) {this.sectionTitleIndex = index - 1}
    
    // update db
    this.database.update(this.workspace.db)

  }

  // move the section right in the array
  shiftRight(index: number)
  {
    // properly remove and add the section to the moved spot
    this.workspace.db.me.sections.splice(index + 2, 0, this.workspace.db.me.sections[index])
    this.workspace.db.me.sections.splice(index, 1)

    // if any options are open/enabled, move them to the correctly moved index
    if (this.sectionMenuOptions !== -1) {this.sectionMenuOptions = index + 1}
    if (this.sectionTitleIndex !== -1) {this.sectionTitleIndex = index + 1}
    
    // update db
    this.database.update(this.workspace.db)

  }

  // sort by priority either by ascending or descending, depends on the value given
  sortByPriority(filter: any)
  {
    // sorting code
    // asc = a - z or low to high
    // desc = z - a high to low

  }

}
