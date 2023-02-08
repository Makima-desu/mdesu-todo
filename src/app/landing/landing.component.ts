import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../db/database.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit(): void 
  {
    // check to see if the user has already created a workspace
    // if true, always navigate to the workspace
    // otherwise allow to enter the home page
    this.database.workspace.subscribe(item =>
      {
        if (item[0].workspaceEnabled && this.router.url === '/')
        {
          this.router.navigate(['/workspace/me'])

        }

      })
  
  }

  // for first time user to create a workspace
  // also to turn the workspace var true for redirect purposes
  async createWorkspace()
  {
    this.database.add()
    this.database.workspace.subscribe(item =>
      {
        item[0].workspaceEnabled = true
        this.database.update(item[0])

      })

  }

}
