import { Component, OnInit, HostListener, ViewChild, QueryList, ViewChildren, Query, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/db/database.service';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent implements OnInit {

  inboxTitleIndex: number = -1
  categoryInfo: any
  // @ts-ignore
  @ViewChildren('inboxTitle') inboxTitle: QueryList<ElementRef>

  constructor(public components: EnablingComponentsService, public workspace: LoadWorkspaceService, private database: DatabaseService, private router: Router) 
  {
    this.components.sleep(1).then(() =>
    {
      this.categoryInfo = this.components.getCategoryInfo()

    })


  }

  ngOnInit(): void
  {

  }

  // @ts-ignore
  @ViewChild('editor') editor: QueryList<ElementRef>

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: any, targetElement: any)
  {
    //@ts-ignore
    if (!this.editor.nativeElement.contains(targetElement) && this.components.editCategoryClicked === false)
    {
      this.components.editCategory = false

    }

  }

  // save the specific title inbox
  saveInboxTitle(title: string, index: number)
  {
    this.workspace.db.sidebar.categories[this.categoryInfo.index].inbox[index].title = title

    // @ts-ignore
    // check to see if the user is currently in that url
    if (this.router.currentUrlTree.queryParams[0] !== title)
    {
      // if yes, navigate to the new url and reload page to get router params
      this.router.navigate(['/workspace/', title])
      location.reload();

    }

    // update db
    this.database.update(this.workspace.db)

  }

  saveCategory(title: string)
  {
    this.workspace.db.sidebar.categories[this.categoryInfo.index].title = title
    this.database.update(this.workspace.db)

  }

}
