import { VendaService } from "../src/vendaService.js";

// TODO 1: Implemente o Padrão Factory para criar um usuário válido por padrão.
it("deve criar um usuário válido", async () => {
    const criarUsuarioValido = (sobrescritas = {}) => {
    const usuarioPadrao = {
        id: '1',
        nome: 'Clarinha da Silva',
        ativo: true
    };

return {
      ...usuarioPadrao,
      ...sobrescritas
    };
  };

const usuario = criarUsuarioValido();

expect(usuario).toEqual({
    id: '1',
    nome: 'Clarinha da Silva',
    ativo: true
   });
});

describe("vendaService", () => {
  let vendaService;
  let repositorioFake;
});

// TODO 2: Configure o hook beforeEach
beforeEach(() => {
  repositorioFake = {
    salvar: jest.fn()
  };

  VendaService = new VendaService(repositorioFake);
});

describe("processarVenda() - Cenários de Sucesso", () => {
    it("deve aplicar 10% de desconto corretamente ao usar o cupom PROMO10", async () => {

    // ARRANGE: Crie o usuário, defina o valor total (ex: 200) e o cupom ("PROMO10")
    const usuario = criarUsuarioValido();
    const valorTotal = 200;
    const cupom = "PROMO10";

    // ACT: Chame o método processarVenda da classe vendaService usando await
    const resultado = await VendaService.processarVenda(usuario, valorTotal, cupom);

    // ASSERT: Garanta que o valor final é igual ao valor original
      expect(resultado.valorFinal).toBe(180);
      expect(repositorioFake.salvar).toHaveBeenCalledTimes(1);
    });
  });