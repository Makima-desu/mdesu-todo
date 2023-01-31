import { Component, OnInit, HostListener, ElementRef, QueryList, ViewChild, Query} from '@angular/core';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
})
export class TaskEditorComponent implements OnInit {

  constructor(public components: EnablingComponentsService, private element: ElementRef) { }

  //@ts-ignore
  @ViewChild('editor') editor: QueryList<ElementRef>
  task: any

  ngOnInit(): void 
  {
    this.components.sleep(100).then(() => this.task = this.components.getTaskInfo())

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

}
