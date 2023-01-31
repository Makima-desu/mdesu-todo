import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from './db';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService 
{
  constructor() { }

  workspace = liveQuery(() => db.workspace.toArray());

  async add()
  {
    await db.workspace.add
    ({
      workspaceEnabled: false,
      config: // initialize workspace config
      {

      },
      sidebar: [{title: 'remove'}], // create sidebar in database
      completed: 
      {
        tasks:
        [{
          title: 'remove'

        }]
        

      },
      me:
      {
        sections:
        [{
          title: 'Routines',
          routines: true,
          tasks:
          [{
            title: 'Create Your Routine!',
            description: '',
            created: new Date().toDateString()

          }],
          created: new Date().toDateString()          

        }]

      }
    })

  }

  async update(project: any)
  {
    db.workspace.update(1, project)

  }


}
