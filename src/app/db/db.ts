import Dexie, {Table, Collection} from "dexie";


export interface Workspace
{
    id?: number // isnt really usefull but whatever
    workspaceEnabled?: boolean // for route redirection
    config?: // workspace settings
    {
        theme?: // key/value for components
        {
            // sidebar
            // content page
            // text
            //

        }

    }
    inbox?: // main page of workspace where it shows inputs
    [{


    }]
    today?: // today inputs
    [{
        title?: string // title of the note
        description?: string // description of the note
        created?: string // date of creation of the note
        due?: string // due date of the note
        label?: string // label of the note
        reminders?: string // reminders of the note i.e read it
        priority?: string // priority, low, middle, high
        repeat?: boolean
    }]
    completed?: // for storing completed tasks unless they are repetetive
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