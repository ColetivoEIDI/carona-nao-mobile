import {Passageiro} from "../controller/passageiro";
import {Component} from '@angular/core';
import {StatusBar, SQLite} from 'ionic-native';
import {Platform,AlertController} from 'ionic-angular';

export class DAOPassageiro{

	public db:SQLite;
    public listaDePassageiros;


	constructor() {
        this.listaDePassageiros={rows:{length:0}};
        this.db = new SQLite();
    }

    add(dados){
        return new Promise((resolve)=>{
            this.db.openDatabase({name: "data.db", location: "default"}).then(() => {
                
                this.db.executeSql("insert into passageiro(nome,celular,divida) values (?,?,?)",[dados.nome,dados.celular,dados.divida]).then((data) => {
                    //alert("salvo");
                    resolve(true);
                    //console.log("salvo");
                }, (error) => {
                    console.log("ERROR: " + JSON.stringify(error));
                });


            }, (error) => {
                console.log("ERROR: ", error);
            });
        });

    }

    remove(condicao,arrayCondicao){
        return new Promise((resolve)=>{
            this.db.openDatabase({name: "data.db", location: "default"}).then(() => {
                
                this.db.executeSql("delete from passageiro where "+condicao,arrayCondicao).then((data) => {
                    //alert("salvo");
                    resolve(true);
                    //console.log("salvo");
                }, (error) => {
                    console.log("ERROR: " + JSON.stringify(error));
                });


            }, (error) => {
                console.log("ERROR: ", error);
            });
        });

    }


    atualiza(edicao,stringCondicao,arrayCondicao){

        return new Promise((resolve)=>{
            var self=this;
            this.db.openDatabase({name: "data.db", location: "default"}).then(() => {
                
                this.db.executeSql("UPDATE passageiro SET "+edicao+" WHERE "+stringCondicao,arrayCondicao).then((data)=>{
                    
                    resolve(true); 

                // self.busca("divida>?",[0]);
                    //console.log("Sucesse!");

                }, (error) => {

                    console.log("ERROR: " + JSON.stringify(error));
                    resolve(false); 
                });

            }, (error) => {
            
                console.log("ERROR: ", error);
                resolve(false); 
            
            });
        });


    }



	busca(condicaoString,condicaoArray):any{

        return new Promise((resolve)=>{
            var self=this;
            this.db.openDatabase({name: "data.db", location: "default"}).then(() => {
                
                this.db.executeSql("SELECT * FROM passageiro where "+condicaoString, condicaoArray).then((data)=>{
                    
                    
                    resolve(data);

                }, (error) => {
                    console.log("ERROR: " + JSON.stringify(error));
                });


            }, (error) => {
                console.log("ERROR: ", error);
            });

            //setTimeout(()=>{
                return this.listaDePassageiros;
            //},400);

        });
        
	}
}