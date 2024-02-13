interface HTMLElementP extends HTMLElement {
    clickHandlerThis_UI?: any;
    clickHandlerThis_Ajax?: any;
    requestStr?: any;
    tslXv? : any;
    tslYv? : any;
    bChanged? : any;
    inherentMovingDisance? : number;
    OriginalTransition? : any;
    getBoundingClientRect(): DOMRect;
};
type docElements = HTMLElementP[] | HTMLCollectionOf<HTMLElementP> | HTMLElement[] | HTMLCollectionOf<Element>; 
type docElementPs = HTMLElementP[] | HTMLCollectionOf<HTMLElementP> ;

namespace Time {
    export function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    export function awaitAll(funcList: (() => Promise<any>)[]): Promise<void> {
        return Promise.all(funcList.map(func => func()))
            .then(() => {}).catch(error => {
            console.error('《awaitAll捕获的异常《', error);
            throw error;
        });
    };
};

export type {HTMLElementP, docElements, docElementPs}
export {Time}