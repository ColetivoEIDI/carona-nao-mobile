import {Passageiro} from './passageiro';


export class Viagem{

    private _passageiros:Array<Passageiro>;

    constructor(private _quilometragem:number, private _consumo:number,private _precoGasolina:number){

    }

    public getPassageiro(){
        return this._passageiros;
    }
    public setPassageiro(passageiro){
        this._passageiros.push(passageiro);
    }


    
    public getQuilometragem(){
        return this._quilometragem;
    }
    public setQuilometragem(quilometragem){
        this._quilometragem=quilometragem;
    }


    
    public getConsumo(){
        return this._consumo;
    }
    public setConsumo(consumo){
        this._consumo=consumo;
    }


    
    public getPrecoGasolina(){
        return this._precoGasolina;
    }
    public setPrecoGasolina(precoGasolina){
        this._precoGasolina=precoGasolina;
    }

    

}