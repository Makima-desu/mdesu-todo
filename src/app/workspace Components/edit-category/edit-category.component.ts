import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/db/database.service';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';
import { LoadWorkspaceService } from 'src/app/services/Load Workspace/load-workspace.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent implements OnInit {

  categoryInfo: any

  constructor(public components: EnablingComponentsService, public workspace: LoadWorkspaceService, private database: DatabaseService) 
  {
    this.components.sleep(1).then(() =>
    {
      this.categoryInfo = this.components.getCategoryInfo()

    })


  }

  ngOnInit(): void {
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

  saveTitle(title: string)
  {
    this.workspace.db.sidebar.categories[this.categoryInfo.index].title = title
    this.database.update(this.workspace.db)

  }

}
