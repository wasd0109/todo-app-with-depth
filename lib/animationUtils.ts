type transitionDef = {
    callback: () => void;
    delay: number;
}

export const scheduleTransition = (transitionDefs:transitionDef|transitionDef[]) => {
    if(Array.isArray(transitionDefs)){
        for (const def of transitionDefs) {
        setTimeout(() => {
            def.callback();
        }, def.delay);
    }
    } else {
        setTimeout(() => {
            transitionDefs.callback();
        }, transitionDefs.delay);   
    }  
}
