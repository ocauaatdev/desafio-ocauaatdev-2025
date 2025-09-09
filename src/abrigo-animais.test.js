import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER,XICARA', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.erro).toBe('Brinquedo inválido');
      expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado para pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER,BOLA',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.erro).toBe('Brinquedo duplicado');
      expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado na lista de adoção', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola,Mimi');

      expect(resultado.erro).toBe('Animal duplicado');
      expect(resultado.lista).toBeFalsy();
  });

  test('Deve permitir que Loco seja adotado se a pessoa tiver mais de um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO,LASER,SKATE',
      'RATO,BOLA', 'Mimi,Rex,Loco');

      expect(resultado.lista[0]).toBe('Loco - pessoa 1');
      expect(resultado.lista[1]).toBe('Mimi - pessoa 1');
      expect(resultado.lista[2]).toBe('Rex - pessoa 2');
      expect(resultado.lista.length).toBe(3);
      expect(resultado.lista).toBeTruthy();
  });

  test('Deve rejeitar adoção se o Loco não tiver companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO',
      'LASER,RATO,BOLA', 
      'Loco,Rex,Bebe');

      expect(resultado.lista[0]).toBe('Bebe - pessoa 2');
      expect(resultado.lista[1]).toBe('Loco - abrigo');
      expect(resultado.lista[2]).toBe('Rex - pessoa 2');
      expect(resultado.lista.length).toBe(3);
      expect(resultado.lista).toBeTruthy();
  });

  test('Deve rejeitar adoção se a pessoa já tiver 3 animais',()=>{
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,RATO,LASER,SKATE,CAIXA,NOVELO',
      'RATO,BOLA',
      'Mimi,Rex,Loco,Bola,Fofo');

      expect(resultado.lista[0]).toBe("Bola - pessoa 1");
      expect(resultado.lista[1]).toBe("Fofo - abrigo");
      expect(resultado.lista[2]).toBe("Loco - pessoa 1");
      expect(resultado.lista[3]).toBe("Mimi - pessoa 1");
      expect(resultado.lista[4]).toBe("Rex - pessoa 2");
      expect(resultado.lista.length).toBe(5);
      expect(resultado.erro).toBeFalsy();
  });
});
