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
      sidebar: // create sidebar in database
      {
        categories:
        [{
          title: 'remove',
          inbox:
          [{
            title: 'remove',
            sections:
            [{
              title: 'remove'

            }]

          }]
          
        }]
        
      }, 
      completed: 
      {
        tasks:
        [{
          title: 'remove'

        }]
        

      },
      deleted:
      {
        tasks:[{}]

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
            description: 'Setting routines can help remembering tasks which are not as important as the other.',
            created: new Date().toDateString(),
            priority: 'Low',
            due: 'Not Due'

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
