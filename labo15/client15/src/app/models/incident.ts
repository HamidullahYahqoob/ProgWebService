export class Incident{
    constructor(
        public id : number,
        public nbCasualties : number,
        public date : Date,
        public description : string
    ){}
}