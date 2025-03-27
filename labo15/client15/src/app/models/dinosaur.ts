import { Incident } from "./incident";
import { Zookeeper } from "./zookeeper";

export class Dinosaur{
    constructor(
        public id : number,
        public name : string,
        public specie : string,
        public incidents : Incident[],
        public zookeeper : Zookeeper
    ){}
}