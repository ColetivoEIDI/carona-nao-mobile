import { SQLite } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { NavController,NavParams,ViewController,App} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Financeiro } from '../../controller/financeiro';
import { DAOPassageiro } from '../../model/DAOPassageiro';
import { DevedoresPage } from '../devedores/devedores';
/*
  Generated class for the ViagemFim page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-viagem-fim',
  templateUrl: 'viagem-fim.html'
})
export class ViagemFimPage {

  viagem;
  passageiros;
  financeiro:Financeiro;
  db:DAOPassageiro;

  constructor(
    public appCtrl:App,
    public navCtrl: ViewController, 
    public alertCtrl: AlertController,
    public param:NavParams,
    public navCtrl1:NavController,
    db:SQLite
  ) {
    this.db=new DAOPassageiro(db);
    this.viagem=param.get("viagem");
    this.financeiro=new Financeiro(this.viagem.getPrecoGasolina(),this.viagem.getConsumo());
    this.passageiros=param.get("passageiros");
  }

  ionViewDidLoad() {
    console.log('Hello ViagemFimPage Page');
  }

  //Ler quilometragem
  doQuilometragem() {
    let prompt = this.alertCtrl.create({
      title: 'Quilometragem',
      message: "Qual a quilometragem atual do veículo?",
      inputs: [
        {
          type:'number',
          name: 'title',
          placeholder: '00000'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Finalizar',
          handler: data => {
            this.controleDeCalculoFinal(parseFloat(data.title));
          }
        }
      ]
    });
    prompt.present();
  }

  controleDeCalculoFinal(final){
    // console.log(this.viagem.getQuilometragem());
    if(parseFloat(final)>parseFloat(this.viagem.getQuilometragem())){
    //   //add o valor da viagem na tragetoria de cada um dos passageiros
      
      var precoDaViagem = this.financeiro.calculaPrecoDeUmCaminho(
        parseFloat(localStorage.getItem("inicio")),
        final
      );
      var total = this.financeiro.totalPercorrido(
        parseFloat(localStorage.getItem("inicio")),
        final
      );
        
      for(let key in this.passageiros){
        total+= this.financeiro.totalPercorrido(
          this.passageiros[key].quilometragemInicial,
          final
        );
      }

      for(let key in this.passageiros){
        let minhaDistancia = this.financeiro.totalPercorrido(
          this.passageiros[key].quilometragemInicial,
          final
        );
        let divida = this.financeiro.valorDeCadaPassageiro(total,precoDaViagem,minhaDistancia);
        this.db.atualiza("divida=divida-"+divida.toFixed(2),"celular=?",[this.passageiros[key].celular]).then((data)=>{
          this.navCtrl1.setRoot(DevedoresPage);
        });
      }
      

    //   //ordenar os passageiros por menor valor da viagem, ordenação bolha
    //   var quardaTmp;
    //   while(true){
    //     var muda=false;
    //     for(var i=1;i<this.passageiros.length;i++){
    //       if(this.passageiros[i-1].valorBrutoDoCaminho>this.passageiros[i].valorBrutoDoCaminho){
    //         muda=true;
    //         quardaTmp=this.passageiros[i-1];
    //         this.passageiros[i-1]=this.passageiros[i];
    //         this.passageiros[i]=quardaTmp;
    //       }
    //     }
    //     if(muda==false){
    //       break;
    //     }
    //   }

    //   //calcula a divida e salva no banco de dados
    //   var ultimoTamanho=0;
    //   var taDevendo=[];
    //   for(let key in this.passageiros){
    //     var essePassageiroDeve:number=0;
    //     essePassageiroDeve=((this.passageiros[key].valorBrutoDoCaminho-ultimoTamanho)/(this.passageiros.length+1));
    //     ultimoTamanho=((this.passageiros[key].valorBrutoDoCaminho-ultimoTamanho)==0)?ultimoTamanho:(this.passageiros[key].valorBrutoDoCaminho-ultimoTamanho);
    //     var proximoVaiDever=essePassageiroDeve;

    //     for(let keyDeve in taDevendo){
    //       essePassageiroDeve+=taDevendo[keyDeve];
    //     }
    //     //alert(essePassageiroDeve);
    //     taDevendo.push(proximoVaiDever);
    //     this.db.atualiza("divida=divida-"+essePassageiroDeve.toFixed(2),"celular=?",[this.passageiros[key].celular]).then((data)=>{
    //       //alert(data);
    //     });
    //   }
      
    //   //this.navCtrl1.push(DevedoresPage);
    //   this.navCtrl1.setRoot(DevedoresPage);
    
    }else{
      let alert = this.alertCtrl.create({
        title: 'Aviso!',
        subTitle: 'A quilometragem atual deve ser maior que a quilometragem inicial',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  
}


