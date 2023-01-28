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
      config:
      {

      },
      today:
      [{
        title: 'To-Do',
        description: '',
        created: new Date().toLocaleDateString(),
        repeat: true,

      }],

    })

  }

  async update(id: number, project: any)
  {
    db.workspace.update(id, project)
    console.log(id, project)

  }


}
