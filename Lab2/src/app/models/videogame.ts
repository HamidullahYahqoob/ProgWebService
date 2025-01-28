export class VideoGame{
    constructor(
        public name : string,
        public nbPlayers : number,
        public released : boolean,
        public genre : string[],
        public mode : string
    ){}
}