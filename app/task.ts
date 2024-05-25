export default class Task {
    title: string;
    description: string;
    steps: string[];

    isEmpty(): boolean {
        return this.title === "" && this.description === "" && this.steps.length === 0;
    }

    constructor(t: string, d: string, steps: string[]) {
        this.title = t;
        this.description = d;
        this.steps = steps;
    }
}