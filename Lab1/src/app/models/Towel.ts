export class Towel{
    constructor(public color : string,public length :number,public image : string,public wet : boolean){}

    use():string{
        if(this.wet == false){
return"La cible est maintenant sèche."
        }else{
            return "Ça ne fonctionne pas .."
        }
        
    }
}