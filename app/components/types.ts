export class Category {
    title: string;
    items: string[];
    finished: boolean[];
    key: string;

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    constructor(t: string, items: string[], finished: boolean[], key: string) {
        this.title = t;
        this.items = items;
        this.finished = finished;
        this.key = key;
    }
}

export type ListType = 'master' | 'daily';