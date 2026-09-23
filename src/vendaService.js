export class VendaService {
  constructor(repositorioVendas) {
    this.repositorioVendas = repositorioVendas;
  }

  async processarVenda(usuario, valorTotal, cupom) {
    if (!usuario || !usuario.ativo) {
      throw new Error("Usuário inválido ou inativo.");
    }

    if (valorTotal <= 0) {
      throw new Error("O valor da venda deve ser maior que zero.");
    }

    let percentualDesconto = 0;
    if (cupom === "PROMO10") percentualDesconto = 10;
    if (cupom === "PROMO20") percentualDesconto = 20;

    const valorComDesconto = valorTotal - (valorTotal * (percentualDesconto / 100));

    const venda = {
      usuarioId: usuario.id,
      valorOriginal: valorTotal,
      valorFinal: valorComDesconto,
      data: new Date()
    };

    await this.repositorioVendas.salvar(venda);

    return venda;
  }
}
