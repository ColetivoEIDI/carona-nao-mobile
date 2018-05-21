import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen,SQLite} from 'ionic-native';

import { DevedoresPage } from '../pages/devedores/devedores';
import { AddPessoasPage } from '../pages/add-pessoas/add-pessoas';
import { ViagemAddPessoasPage } from '../pages/viagem-add-pessoas/viagem-add-pessoas';
import { ViagemFimPage } from '../pages/viagem-fim/viagem-fim';
import { ViagemPropriedadesPage } from '../pages/viagem-propriedades/viagem-propriedades';

@Component({
  templateUrl: `./app.html`
})
export class MyApp {
  devedores = DevedoresPage;
  addPessoas = AddPessoasPage;
  viagemAddPessoas = ViagemAddPessoasPage;
  viagemFim = ViagemFimPage;
  viagemPropriedades = ViagemPropriedadesPage;

  rootPage = this.viagemPropriedades;
  public db:SQLite;

  constructor(platform: Platform) {
    platform.ready().then(() => {

      this.db= new SQLite();
      this.db.openDatabase({
              name: "data.db",
              location: "default"
          }).then(() => {
              this.db.executeSql("CREATE TABLE IF NOT EXISTS passageiro (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT,celular TEXT NOT NULL UNIQUE,divida REAL(100,2))", {}).then((data) => {
                  //alert("TABLE CREATED");
                  console.log("TABLE CREATED: ", data);

            }, (error) => {
                  alert("erro");
                  console.error("Unable to execute sql", error);

            })
          }, (error) => {
              console.error("Unable to open database", error);
              alert("erro");
     });

          console.log("teste");

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(opcao) {
    this.rootPage = opcao;
  }
}
