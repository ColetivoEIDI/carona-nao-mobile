import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViagemAddPessoasPage } from '../viagem-add-pessoas/viagem-add-pessoas';
import { Viagem } from '../../controller/viagem';


@Component({
  selector: 'page-viagem-propriedades',
  templateUrl: 'viagem-propriedades.html'
})
export class ViagemPropriedadesPage {
  public exceptionViagemVariavel=false;
  public parametros={
    "quilometragem":null,
    "consumo":null,
    "precoGasolina":null
  };

  constructor(
    public navCtrl: NavController
  ){

  }

  exceptionViagem():boolean{
    if(
      this.parametros.quilometragem==null || this.parametros.quilometragem=="" || 
      this.parametros.consumo==null       || this.parametros.consumo==""       ||
      this.parametros.precoGasolina==null || this.parametros.precoGasolina==""
    ){
      this.exceptionViagemVariavel=true;
      return false;
    }
    this.exceptionViagemVariavel=false;
    return true;
  }

  criaViagem(){
    if(this.exceptionViagem()){
      this.openPage(
        new Viagem(
          this.parametros.quilometragem,
          this.parametros.consumo,
          this.parametros.precoGasolina
        )
      );
    }
  }

  openPage(viagem) {
   
    this.navCtrl.push(ViagemAddPessoasPage,{viagem:viagem});
  }

}
