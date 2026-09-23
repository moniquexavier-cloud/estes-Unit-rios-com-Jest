import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { VendaService } from "../src/vendaService.js";

// TODO 1: Implemente o Padrão Factory para criar um usuário válido por padrão.
// A função deve aceitar um objeto de 'sobrescritas' para personalizar os dados quando necessário.
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

describe("VendaService", () => {
  let vendaService;
  let repositorioFake;

 // TODO 2: Configure o hook beforeEach.
  beforeEach(() => {
    repositorioFake = {
      salvar: jest.fn().mockResolvedValue(true)
    };

    vendaService = new VendaService(repositorioFake);
  });

  // Cenário de desconto aplicado com sucesso
  describe("processarVenda() - Cenários de Sucesso", () => {
    it("deve aplicar 10% de desconto corretamente ao usar o cupom PROMO10", async () => {
      // ARRANGE
      const usuario = criarUsuarioValido();
      const valorTotal = 200;
      const cupom = "PROMO10";

      // ACT
      const resultado = await vendaService.processarVenda(usuario, valorTotal, cupom);

      // ASSERT
      expect(resultado.valorFinal).toBe(180);
      expect(repositorioFake.salvar).toHaveBeenCalledTimes(1);
    });

    // Cenário de venda sem desconto aplicado
    it("deve processar a venda sem desconto quando nenhum cupom for informado", async () => {
      // ARRANGE
      const usuario = criarUsuarioValido();
      const valorTotal = 100;

      // ACT
      const resultado = await vendaService.processarVenda(usuario, valorTotal);

      // ASSERT
      expect(resultado.valorFinal).toBe(100);
      expect(repositorioFake.salvar).toHaveBeenCalledWith(
        expect.objectContaining({
          valorOriginal: 100,
          valorFinal: 100
        })
      );
    });
  });

  // Cenário de erro quando o usuário estiver inativo
  describe("processarVenda() - Cenários de Exceção", () => {
    it("deve lançar um erro quando o usuário estiver inativo", async () => {
      // ARRANGE
      const usuarioInativo = criarUsuarioValido({ ativo: false });

      // ACT & ASSERT
      await expect(vendaService.processarVenda(usuarioInativo, 100))
        .rejects
        .toThrow("Usuário inválido ou inativo.");
    });

    
  // Cenário de erro quando o valor da venda for baixo
    it("deve lançar um erro quando o valor da venda for menor ou igual a zero", async () => {
      // ARRANGE
      const usuario = criarUsuarioValido();

      // ACT & ASSERT
      await expect(vendaService.processarVenda(usuario, 0))
        .rejects
        .toThrow("O valor da venda deve ser maior que zero.");
    });
  });
});