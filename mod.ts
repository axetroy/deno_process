
import Branch from './Source/Branch.js'
import Kill from './Source/Kill.js'
import All from './Source/All.js'


export interface Process {
    children ?: Process[];
    command : string;       // Command to run this process
    stat : string;          // Process status
    ppid : number;          // The parent process ID of the process
    pid : number;           // Process ID
}

export interface KillOptions {
    ignoreCase ?: boolean;
    force ?: boolean;
    tree ?: boolean;
}


/**
 *  Get the single process information.
 *  Requires `--allow-run` flag
 *  @param processId
 */

export async function get ( processId : number ) : Promise < Process | void > {
    return (await getAll())
        .find(({ pid }) => pid === processId);
}


/**
 *  Get process list
 *  Requires `--allow-run` flag
 */

export async function getAll() : Promise < Process [] > {
    return await All() as Process[] ;
}


/**
 *  Get process tree
 *  Requires `--allow-run` flag
 */
 
export async function getTree () : Promise < Process [] > {
    return Branch(await getAll());
}


/**
 *  Kill Process
 *  Requires `--allow-run` flag
 *  @param identifier pid or process name
 *  @param options
 */
 
export async function kill(
    identifier : number | string ,
    options : KillOptions = {}
) : Promise < void > {    
    await Kill(identifier,options);
}
