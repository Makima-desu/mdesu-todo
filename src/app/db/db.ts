import Dexie, {Table, Collection} from "dexie";


export interface Workspace
{
    id?: number // isnt really usefull but whatever
    workspaceEnabled?: boolean // for route redirection
    config?: // workspace settings
    {


    }
    inbox?: // main page of workspace where it shows inputs
    [{


    }]
    today?: // today inputs
    [{


    }]

}

class AppDb extends Dexie
{
    workspace!: Table<Workspace, number>

    constructor()
    {
        super('dexieDb')

        this.version(3).stores
        ({
            workspace: '++id'

        })
        
    }

}

export const db = new AppDb