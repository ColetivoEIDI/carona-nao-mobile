import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { DAOPassageiro } from '../../model/DAOPassageiro';

@Component({
  selector: 'page-devedores',
  templateUrl: 'devedores.html'
})
export class DevedoresPage {
  devedores;
  db:DAOPassageiro;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.db=new DAOPassageiro();
    this.initializeItems();
    this.devedores = [
        ];
  }
  
  remove(pessoa) {
    let confirm = this.alertCtrl.create({
      title: 'Realmente deseja excluir?',
      message: 'Você removerá '+pessoa.nome+' da lista de devedores.',
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
           this.db.remove("celular=?",[pessoa.celular]).then(()=>{
             this.initializeItems();
           });
          }
        }
      ]
    });
    confirm.present()
  }

  inputSaldo(pessoa) {
    let prompt = this.alertCtrl.create({
      title: 'Pagamento',
      message: "Digite o valor que receberá de "+pessoa.nome+", o saldo dela é R$ "+pessoa.divida.toFixed(2),
      inputs: [
        {
          type:'number',
          name: 'saldo',
          placeholder: '00.00'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Receber',
          handler: data => {
            this.recebe(pessoa,data.saldo);
          }
        }
      ]
    });
    prompt.present();
  }

  doEdit(pessoa){
     let prompt = this.alertCtrl.create({
      title: 'Edição',
      message: "Dados de "+pessoa.nome,
      inputs: [
        {
          name: 'nome',
          value: pessoa.nome
        },
        {
          name: 'celular',
          value: pessoa.celular
        },
        {
          type: 'number',
          name: 'saldo',
          value: pessoa.divida
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Editar',
          handler: data => {
            this.db.atualiza("nome='"+data.nome+"',celular='"+data.celular+"',divida="+data.saldo,"celular=?",[pessoa.celular]).then((data)=>{
              if(!data){
                this.alertDeErro();
              }
              this.initializeItems();
            }).catch(()=>{
              this.alertDeErro();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  alertDeErro(){
    let alert = this.alertCtrl.create({
      title: 'Aviso!',
      subTitle: "Verifique se o número do celular já não esta cadastrado com outro usuário",
      buttons: ['OK']
    });
    alert.present();
  }

  recebe(pessoa,r){
    if(!isNaN(r)){
      this.db.atualiza("divida=divida+"+parseFloat(r),"celular=?",[pessoa.celular]).then((data)=>{
        this.initializeItems();
      });
    }else{
      let alert = this.alertCtrl.create({
        title: 'Aviso!',
        subTitle: "Valor Invalido!",
        buttons: ['OK']
      });
       alert.present();
    }
  }


  initializeItems() {
    return new Promise((resolve)=>{
      this.db.busca("1=?",[1]).then((pesquisa)=>{

        this.devedores = [
        ];

        if(pesquisa.rows.length > 0) {
          for(var i = 0; i < pesquisa.rows.length; i++) {
            this.devedores.push({
              nome:pesquisa.rows.item(i).nome,
              celular:pesquisa.rows.item(i).celular,
              divida:pesquisa.rows.item(i).divida
            });
          }
          resolve(true);
        }

      });
    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems().then(()=>{

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.devedores = this.devedores.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    });
  }
}
