import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './db/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent 
{
  constructor(public dbService: DatabaseService) {}
  title = 'mdesu-todo';

  abc()
  {
    console.log('clicked')
    this.dbService.add()

  }

  ngOnInit()
  {
    

  }

}
