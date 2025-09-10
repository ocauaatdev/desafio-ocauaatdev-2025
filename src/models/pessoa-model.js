class Pessoa {
    constructor(nome, brinquedos) {
        this.nome = nome;
        this.brinquedos = brinquedos;
        this.totalAnimais = 0;
    }

    podeAdotar(animal){
        if (this.totalAnimais >= 3) {
            return false;
        }
        return animal.atende(this.brinquedos, this.totalAnimais);
    }

    adotar(){
        this.totalAnimais++;
    }
    
}
export { Pessoa as Pessoa };