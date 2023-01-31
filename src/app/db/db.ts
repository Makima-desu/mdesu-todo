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
    sidebar?: // sidebar inbox array
    [{
        title?: string // title of the project
        sections?: // all the sections
        [{
            title?: string // title of section
            tasks?: // tasks of that section
            [{
                title?: string // title of task
                description?: string // description of task
                created?: string // when task was created
                priority?: string // what priority is that task

            }]
        }]

    }]
    me?: // personal inbox of the user, cant be deleted
    {
        sections?: // store the sections of the inbox
        [{
            title?: string // title of the section
            routines?: boolean // if enabled, the tasks will repeat every time the user sets them too
            tasks?: // tasks array belonging to the section
            [{
                title?: string // title of the task
                description?: string // description of the task
                created?: string // when was the task created

            }]
            created?: string // when was the section created
        }]

    }
    completed?: // for storing completed tasks unless they are repetetive
    {
        tasks?: // store all comlpeted tasks
        [{
            title?: string // title of task
            description?: string // description of task
            created?: string // when task was created
            priority?: string // what priority is that task

        }]

    }

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