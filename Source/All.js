

const { readAll , build , run } = Deno;


const commands = {
    windows : [ 'wmic.exe' , 'PROCESS' , 'GET' , 'Name,ProcessId,ParentProcessId,Status' ] ,
    linux : [ 'ps' , '-A' , '-o' , 'comm,ppid,pid,stat' ]
}

const command = commands[build.os];

if(!command)
    throw `This module only supports Windows & Linux.`;


/**
 *  Queries for all processes.
 *  @Returns List of all processes
 */

export default async function all(){
    
    const process = pipe(command);

    const output = new TextDecoder()
        .decode(await readAll(process.stdout));

    const { success , code } = await process.status();

    process.stdout?.close();
    process.close();
    
    if(success && code === 0)
        return parse(output);
        
    throw new Error('Failed to get process.');
}


/*
 *  Parse query ouput to processes
 */

function parse(string){
    
    const lines = string
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line);
    
    lines.shift();
    
    return lines
        .map(toColumns)
        .map(toProcess);
}

function toProcess([ command , ppid , pid , stat ]){
    return { command , stat ,
        ppid : parseInt(ppid) ,
        pid : parseInt(pid)
    };
}

function toColumns(line){
    return line.split(/\s+/);
}

function pipe(command){
    return run({
        stdout : 'piped' ,
        cmd : command 
    });
}
