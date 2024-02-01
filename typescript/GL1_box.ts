type docElements = HTMLElement[] | HTMLCollectionOf<Element>
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
namespace GL1Box {
    const gOrderList: string[] = ['m1st','m2nd','m3rd','m4th','m5th','m6th','m7th','m8th'];
    interface iLinerMove {
        LinerMoveTo(distance: number, direction: string | number): Promise<void>;
        LinerMoveBk(): Promise<void>;
    };
    export class TippiBox implements iLinerMove{
        eles: Map<string, HTMLElement[]>; 
        sleepS: number;
        sleepMs_i: number;
        sleepCount: number;
        clear(): void {
            this.eles = new Map<string, HTMLElement[]>(gOrderList.map(key => [key, []]));
            this.sleepS = 0;
            this.sleepCount = 0;
            return;
        };
        initEles(argEles: docElements): void {
            this.clear();
            this.sleepS = parseFloat(window.getComputedStyle(argEles[0]).transitionDuration);
            Array.from(argEles).forEach(ele => {
                let eleClassList = ele.classList;
                for (let i of gOrderList) {
                    if (eleClassList.contains(i)) {
                        this.eles.get(i)?.push(ele as HTMLElement);
                        if (this.eles.get(i)?.length === 1) {
                            this.sleepCount++;
                        };
                        break;
                    };
                };
            });
            this.sleepMs_i = this.sleepS / this.sleepCount * 1000;
        };
        async LinerMoveTo(distance: number): Promise<void> {
            throw new Error("Method not implemented.");
        };
        async LinerMoveBk(): Promise<void> {
            throw new Error("Method not implemented.");
        };
    };
};
