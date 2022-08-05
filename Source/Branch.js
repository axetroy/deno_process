


export default function branch ( items , processId = 0 ){
    
    
    const isProcess = ({ ppid }) =>
        ppid === processId;
    
    
    const findNested = (item) => 
        [ item , branch(items,item.pid) ];
    
    
    const combine = ([ item , children ]) => {
        
        if(children.length)
            item.children = children;
        
        return item;
    }
    
    
    return items
        .filter(isProcess)
        .map(findNested)
        .map(combine);
}