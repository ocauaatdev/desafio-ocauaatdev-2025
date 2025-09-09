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
    
    for(let nomeAnimal of listaAnimaisDesejados){
      const animalObjeto = this.animais[nomeAnimal];

      if(!animalObjeto){
        return{erro: "Animal inválido"};
      }
      

      const pessoa1Atende = pessoa1.podeAdotar(animalObjeto, pessoa1.totalAnimais);
      const pessoa2Atende = pessoa2.podeAdotar(animalObjeto, pessoa1.totalAnimais);
      var dono = "abrigo";

      if(pessoa1Atende && !pessoa2Atende){
        dono = pessoa1.nome;
        pessoa1.adotar();
      }
      else if(pessoa2Atende && !pessoa1Atende){
        dono = pessoa2.nome;
        pessoa2.adotar();
      }
      else if(pessoa1Atende && pessoa2Atende){
        dono = "abrigo";
      }

      resultado.push(`${animalObjeto.nome} - ${dono}`);
    }

    return {lista: resultado.sort()};
  }
}

export { AbrigoAnimais as AbrigoAnimais };
