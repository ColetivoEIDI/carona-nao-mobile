import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { DevedoresPage } from '../pages/devedores/devedores';
import { AddPessoasPage } from '../pages/add-pessoas/add-pessoas';
import { ViagemAddPessoasPage } from '../pages/viagem-add-pessoas/viagem-add-pessoas';
import { ViagemFimPage } from '../pages/viagem-fim/viagem-fim';
import { ViagemPropriedadesPage } from '../pages/viagem-propriedades/viagem-propriedades';

@NgModule({
  declarations: [
    MyApp,
    DevedoresPage,
    AddPessoasPage,
    ViagemAddPessoasPage,
    ViagemFimPage,
    ViagemPropriedadesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DevedoresPage,
    AddPessoasPage,
    ViagemAddPessoasPage,
    ViagemFimPage,
    ViagemPropriedadesPage
  ],
  providers: []
})
export class AppModule {}
