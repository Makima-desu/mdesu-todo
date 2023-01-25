import Dexie, {Table, Collection} from "dexie";


export interface Workspace
{
    key?: number
    title: string

}

class AppDb extends Dexie
{
    workspace!: Table<Workspace, number>

    constructor()
    {
        super('dexieDb')

        this.version(3).stores
        ({
            workspace: 'as'

        })
        
        
    }

}

export const db = new AppDb