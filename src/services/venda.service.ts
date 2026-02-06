import { collection, doc, runTransaction } from "firebase/firestore";
import { Venda } from "types/Venda";
import { db } from "./firebase";

export const VendasService = {
  async realizarVenda(venda: Venda) {
    await runTransaction(db, async (transaction) => {
      for (const item of venda.itens) {
        const prodRef = doc(db, "produtos", item.produtoId);
        const prodDoc = await transaction.get(prodRef);

        if (!prodDoc.exists()) throw "Produto não existe!";

        const novoEstoque = prodDoc.data().quantidadeEstoque - item.quantidade;
        if (novoEstoque < 0) throw `Estoque insuficiente para ${item.nome}`;

        transaction.update(prodRef, { quantidadeEstoque: novoEstoque });
      }

      const vendaRef = collection(db, "vendas");
      transaction.set(doc(vendaRef), { ...venda, data: new Date() });
    });
  },
};
