import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController} from 'ionic-angular';

import { AddPessoasPage } from '../add-pessoas/add-pessoas';
import { ViagemFimPage } from '../viagem-fim/viagem-fim';
import { Passageiro } from '../../controller/passageiro';

/*
  Generated class for the ViagemAddPessoas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-viagem-add-pessoas',
  templateUrl: 'viagem-add-pessoas.html'
})
export class ViagemAddPessoasPage {
  passageiros:Array<Passageiro>;
  viagem;
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public modalCtrl: ModalController,
    public param:NavParams
  ) {

    this.initializeItems();
    this.viagem=param.get("viagem");

  }

  insertPessoa() {
    let modal = this.modalCtrl.create(AddPessoasPage,{"passageiros":this.passageiros,"quilometragemInicial":this.viagem.getQuilometragem()});
    modal.present();
    modal.onDidDismiss((passageiro:Passageiro)=>{
      if(passageiro!=null){
        this.passageiros.push(passageiro);
      }
    });
  }

  ionViewDidLoad() {
    console.log('Hello ViagemAddPessoasPage Page');
  }


  openPage(){
    this.navCtrl.push(ViagemFimPage,{"viagem":this.viagem,"passageiros":this.passageiros});
  }


  initializeItems() {
    this.passageiros = [
    ];
  }

  buscaPassageiro(tel){
    for(var passageiro in this.passageiros){
      if(this.passageiros[passageiro].celular==tel){
        return passageiro;
      }
    }
  }


  doPredefinida() {
    let confirm = this.alertCtrl.create({
      title: 'Deseja salvar a viagem?',
      message: 'A viagem será salva como viagem predefinida.',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  doConfirm(passageiro) {
    let confirm = this.alertCtrl.create({
      title: 'Realmente deseja excluir?',
      message: 'Você removerá '+passageiro.nome+' da viagem.',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.passageiros.splice(parseInt(this.buscaPassageiro(passageiro.celular)),1);
            console.log(this.passageiros);
            console.log("teste");
          }
        }
      ]
    });
    confirm.present();
  }
}
