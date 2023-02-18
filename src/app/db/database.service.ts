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
            title: 'Important Note!!!!! Read if nothing works!!!',
            description: 'If upon first loading into workspace, nothing works. Just refresh the page, and it will never happen again.',
            created: new Date().toDateString(),
            priority: 'High',
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
