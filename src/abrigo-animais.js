import { Animal } from "./models/animal-model.js";
import { Pessoa } from "./models/pessoa-model.js";

class AbrigoAnimais {

  constructor(){
    this.animais = {
      Rex: new Animal("Rex", "cão", ["RATO", "BOLA"]),
      Mimi: new Animal("Mimi", "gato", ["BOLA", "LASER"]),
      Fofo: new Animal("Fofo", "gato", ["BOLA", "RATO", "LASER"]),
      Zero: new Animal("Zero", "gato", ["RATO", "BOLA"]),
      Bola: new Animal("Bola", "cão", ["CAIXA", "NOVELO"]),
      Bebe: new Animal("Bebe", "cão", ["LASER", "RATO", "BOLA"]),
      Loco: new Animal("Loco", "jabuti", ["SKATE", "RATO"])
    };
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    const pessoa1 = new Pessoa("pessoa 1", brinquedosPessoa1.split(",").map(b => b.trim().toUpperCase()));
    const pessoa2 = new Pessoa("pessoa 2", brinquedosPessoa2.split(",").map(b => b.trim().toUpperCase()));
    const listaAnimaisDesejados = ordemAnimais.split(",");

    const brinquedosValidos = ["RATO", "BOLA", "LASER", "NOVELO", "CAIXA", "SKATE"];
    const resultado = [];

    const todosBrinquedos = pessoa1.brinquedos.concat(pessoa2.brinquedos);
    const listaAnimaisUnicos = new Set(listaAnimaisDesejados);

    if(listaAnimaisUnicos.size !== listaAnimaisDesejados.length){
      return{erro: "Animal duplicado"};
    }

    for(let brinquedo of todosBrinquedos){
      if(!brinquedosValidos.includes(brinquedo)){
        return{erro: "Brinquedo inválido"};
      }
    }

    if(new Set(pessoa1.brinquedos).size !== pessoa1.brinquedos.length || new Set(pessoa2.brinquedos).size !== pessoa2.brinquedos.length){
      return{erro: "Brinquedo duplicado"}
    }
    
    const brinquedosDeGatos = new Set();

    for(let nomeAnimal of listaAnimaisDesejados){
      const animalObjeto = this.animais[nomeAnimal];

      if(!animalObjeto){
        return{erro: "Animal inválido"};
      }
      
      var dono = "abrigo";
      const pessoa1Atende = pessoa1.podeAdotar(animalObjeto, pessoa1.totalAnimais);
      const pessoa2Atende = pessoa2.podeAdotar(animalObjeto, pessoa2.totalAnimais);
      
      let pessoa1PodeAdotar = pessoa1Atende;
      let pessoa2PodeAdotar = pessoa2Atende;

      if(animalObjeto.tipo === "gato"){
        if(pessoa1Atende){
          const conflito1 = animalObjeto.brinquedos.some(brinquedo => brinquedosDeGatos.has(brinquedo));
          if(conflito1){ pessoa1PodeAdotar = false;}
        }
        else if(pessoa2Atende){
          const conflito2 = animalObjeto.brinquedos.some(brinquedo => brinquedosDeGatos.has(brinquedo));
          if(conflito2){ pessoa2PodeAdotar = false;}
        }
      }

      if(pessoa1PodeAdotar && !pessoa2PodeAdotar){
        dono = pessoa1.nome;
        pessoa1.adotar();
        if(animalObjeto.tipo === "gato"){
          animalObjeto.brinquedos.forEach(b => brinquedosDeGatos.add(b));
        }
      }
      else if(pessoa2PodeAdotar && !pessoa1PodeAdotar){
        dono = pessoa2.nome;
        pessoa2.adotar();
        if(animalObjeto.tipo === "gato"){
          animalObjeto.brinquedos.forEach(b => brinquedosDeGatos.add(b));
        }
      }
      else if(pessoa1PodeAdotar && pessoa2PodeAdotar){
        dono = "abrigo";
      }

      resultado.push(`${animalObjeto.nome} - ${dono}`);
    }
    return {lista: resultado.sort()};
  }
}

export { AbrigoAnimais as AbrigoAnimais };
