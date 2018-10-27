import {Passageiro} from './passageiro';


export class Financeiro{

    private _passageiros:Array<Passageiro>;

    constructor(
        public precoPorLitro:number,
        public KmPorLitro:number
    ){}

    calculaPrecoDeUmCaminho(inicial:number,final:number):number{
        //final=final*0.1;
        //inicial=inicial*0.1;
        return parseFloat(((this.precoPorLitro * (final-inicial)) / this.KmPorLitro).toFixed(2));
    }

    totalPercorrido(inicial:number, final:number):number{
        return final-inicial;
    }

    valorDeCadaPassageiro(total:number, precoViagem:number, minhaDistancia:number):number{
        return (precoViagem/total)*minhaDistancia;
    }

}
