
const { build , run } = Deno;


const commands = { windows , linux , darwin };

const make = commands[build.os];

if(!make)
    throw `This module only supports Windows & Linux.`;


/**
 *  Kills any process fitting the given parameter.
 */
 
export default async function kill(identifier,options){
    
    const usesName = 
        (typeof identifier) === 'string';
    
    const command = make({
        ...options , 
        identifier ,
        usesName
    });
    
    const process = pipe(command);

    const { success , code } = await process.status();

    process.stderr?.close();
    process.close();

    if(success && code === 0)
        return;
        
    let message = new TextDecoder()
        .decode(await readAll(process.stderr));
        
    message ??= `Exited with code: ${ code }`

    throw new Error(message);
}


function pipe(command){
    return run({
        stderr : 'piped' ,
        cmd : command
    });
}


function windows({ identifier , usesName , force , tree }){
    
    const command = [ 'taskkill' ];
    
    if(force)
        command.push('/f');
        
    if(tree)
        command.push('/t');
        
    command.push((usesName) ? '/im' : '/pid');
    command.push(identifier);
    
    return command;
}

function linux({ identifier , usesName , ignoreCase , force }){
    
    const command = [ (usesName) ? 'killall' : 'kill' ];
        
    if(force)
        command.push('-9');
        
    if(usesName && ignoreCase)
        command.push('-I');
        
    command.push(identifier);    
    
    return command;
}

function darwin({ identifer , usesName , ignoreCase , force }){
    
    const command = [ (usesName) ? 'pkill' : 'kill' ];

    if(force)
        command.push('-9');

    if(usesName && ignoreCase)
        command.push('-i');

    command.push(identifer);

    return command;
}
