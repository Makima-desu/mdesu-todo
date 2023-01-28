import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { EnablingComponentsService } from 'src/app/services/components/enabling-components.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent implements OnInit {

  constructor(private element: ElementRef, public componentsService: EnablingComponentsService) { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement)
  {
    // if the click happend outside of element and the add task button was not clicked, hide the menu
    if (!this.element.nativeElement.contains(targetElement) && this.componentsService.addTaskClicked === false)
    {
      this.componentsService.addTask = false

    }

  }

}
