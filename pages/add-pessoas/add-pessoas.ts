import { Component } from '@angular/core';
import { NavController, ViewController,AlertController,NavParams } from 'ionic-angular';
import { Passageiro } from '../../controller/passageiro';
import { DAOPassageiro } from '../../model/DAOPassageiro';

/*
  Generated class for the AddPessoas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-pessoas',
  templateUrl: 'add-pessoas.html'
})
export class AddPessoasPage {

  pet;
  pessoaSelecionada: string;
  devedores;
  peopleAlertOpts: { title: string, subTitle: string };
  checkedQuilometragem;
  passageiroNovo;
  db:DAOPassageiro;
  passageirosEmbarcados;
  quilometragemInicial;
  quilometrosInput;
  teste;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public alertCtrl:AlertController,
    public param:NavParams
  ) {
      this.pet="add-banco";
      this.quilometrosInput='';
      this.passageirosEmbarcados=param.get("passageiros");
      this.quilometragemInicial=param.get("quilometragemInicial");
      this.db=new DAOPassageiro();
      this.checkedQuilometragem=false;
      this.initializeItems();

      this.peopleAlertOpts = {
         title: 'Selecione o passageiro',
         subTitle: 'Qual passageiro deseja adicionar?'
      };


      //console.log(this.pessoaSelecionada);
  }

  stpSelect() {
    console.log('STP selected');
  }

  buscaPassageiro(tel){
    for(var passageiro in this.devedores){
      if(this.devedores[passageiro].tel==tel){
        return passageiro;
      }
    }
  }



condicaoBotaoAddNovo(){
  return ((this.pessoaSelecionada!=null && this.quilometrosInput!='')  || (this.pessoaSelecionada!=null && this.checkedQuilometragem==true));
}

condicaoBotaoAddBanco(){
  return ((this.passageiroNovo.nome!=null && this.passageiroNovo.nome!="") && (this.passageiroNovo.tel!=null  && this.passageiroNovo.tel!="") && this.checkedQuilometragem==true ||
          (this.passageiroNovo.nome!=null && this.passageiroNovo.nome!="") && (this.passageiroNovo.tel!=null  && this.passageiroNovo.tel!="") && this.quilometrosInput!='');
}

condicaoBotaoAdicionar(){
  if (this.pet == "add-banco") {
    return this.condicaoBotaoAddNovo();
  } else {
    return this.condicaoBotaoAddBanco();
  }
}

  buscaPassageirosEmbarcados(tel):number{
    for(var passageiro in this.passageirosEmbarcados){
      if(this.passageirosEmbarcados[passageiro].celular==tel){
        return 0;
      }
    }
    return -1;
  }

  initializeItems() {
    return new Promise((resolve)=>{
      this.devedores=[];
       this.passageiroNovo={
          nome:null,
          tel:null
        }
      this.db.busca("1=?",[1]).then((pesquisa)=>{

        this.pessoaSelecionada=null;
        this.passageiroNovo={
          nome:null,
          tel:null
        }


        if(pesquisa.rows.length > 0) {
          for(var i = 0; i < pesquisa.rows.length; i++) {
            this.devedores.push({
              nome:pesquisa.rows.item(i).nome,
              tel:pesquisa.rows.item(i).celular
            });
          }
        }else{
          this.devedores = [];
        }
        resolve(true);
      });
    });

  }

  ionViewDidLoad() {
    console.log('Hello AddPessoasPage Page');
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
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


  addPassageiro(){
    if(this.pessoaSelecionada=="criar"){
      if(
        this.passageiroNovo.nome==null || this.passageiroNovo.nome=="" ||
        this.passageiroNovo.tel==null  || this.passageiroNovo.tel==""
      ){
       let alert = this.alertCtrl.create({
            title: 'Aviso!',
            subTitle: 'Dados Incompletos',
            buttons: ['OK']
          });
          alert.present();
        this.viewCtrl.dismiss(null);
      }else{
        this.db.busca("celular=?",[this.passageiroNovo.tel]).then((pesquisa)=>{
          if(pesquisa.rows.length > 0) {
            let alert = this.alertCtrl.create({
              title: 'Aviso!',
              subTitle: 'Já existe uma pessoa com esse número de celular',
              buttons: ['OK']
            });
            alert.present();
          }else{
            this.db.add(
              {
                nome:this.passageiroNovo.nome,
                celular:this.passageiroNovo.tel,
                divida:0.0
              }
            );

            var passageiroParaAdd=new Passageiro(this.passageiroNovo.nome,this.passageiroNovo.tel);
            passageiroParaAdd.quilometragemInicial=(this.checkedQuilometragem)?this.quilometragemInicial:this.quilometrosInput;
            this.viewCtrl.dismiss(passageiroParaAdd);
          }
        });
      }
    }else{
      if(this.buscaPassageirosEmbarcados(this.devedores[this.buscaPassageiro(this.pessoaSelecionada)].tel)==-1){
        // alert(this.checkedQuilometragem);
        //alert((this.checkedQuilometragem==true)?this.quilometragemInicial:this.quilometrosInput);
        var passageiroParaAdd=new Passageiro(
          this.devedores[this.buscaPassageiro(this.pessoaSelecionada)].nome,
          this.devedores[this.buscaPassageiro(this.pessoaSelecionada)].tel
        );
        passageiroParaAdd.quilometragemInicial=(this.checkedQuilometragem)?this.quilometragemInicial:this.quilometrosInput;
        this.viewCtrl.dismiss(passageiroParaAdd);

      }else{
        let alert = this.alertCtrl.create({
          title: 'Aviso!',
          subTitle: "Essa pessoa já está embarcada nessa viagem.",
          buttons: ['OK']
        });
        alert.present();
      }
    }

  }
}
