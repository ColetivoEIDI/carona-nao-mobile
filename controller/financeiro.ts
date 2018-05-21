import {Passageiro} from './passageiro';


export class Financeiro{

    private _passageiros:Array<Passageiro>;

    constructor(
        public precoPorLitro:number,
        public KmPorLitro:number
    ){

    }

    calculaPrecoDeUmCaminho(inicial:number,final:number){
        //final=final*0.1;
        //inicial=inicial*0.1;
        return ((this.precoPorLitro * (final-inicial)) / this.KmPorLitro).toFixed(2);
    }


}
