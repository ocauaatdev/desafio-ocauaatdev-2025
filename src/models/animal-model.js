class Animal{
    constructor(nome, tipo, brinquedos){
        this.nome = nome;
        this.tipo = tipo;
        this.brinquedos = brinquedos;
    }

    atende(brinquedosPessoa, totalAnimaisPessoa){;

        let posicaoProximaBuscaFav = 0;

        //percorre cada brinquedo favorito do animal dentro do array
        for(let brinquedoFavorito of this.brinquedos){
            let encontrouBrinquedo = false;
            
            if(this.nome === "Loco"){
                if(totalAnimaisPessoa === 0){
                    return false;
                }
                for(let brinquedoFavorito of this.brinquedos){
                    if(!brinquedosPessoa.includes(brinquedoFavorito)){
                        return false;
                    }
                }
                return true;
                
            }
            else{
                // percorre os brinquedos da pessoa, mas a partir da última posição de brinquedo favorito encontrada
                for(let indice = posicaoProximaBuscaFav; indice < brinquedosPessoa.length; indice++){
                    if(brinquedoFavorito === brinquedosPessoa[indice]){
                        posicaoProximaBuscaFav = indice + 1;
                        encontrouBrinquedo = true;
                        break;
                    }
                }
            }
                      
            if(!encontrouBrinquedo){return false;} 
        
        } return true; 
    
    }
}

export { Animal as Animal };