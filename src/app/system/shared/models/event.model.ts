export class MMEvent {
    constructor(
        public type: string,
        public amount: number,
        public category: number,
        public date: string,
        public descriptin: string,
        public id?: string,
        public catName?: string
    ) {
    }
}
