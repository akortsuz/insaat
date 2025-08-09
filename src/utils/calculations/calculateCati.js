// src/utils/calculations/calculateCati.js

export const calculateCati = (catiTipi, toplamInsaatAlani, fiyatlar) => {
    const { catiAhsapMetrekareFiyati, catiOsbMetrekareFiyati } = fiyatlar || {};

    let maliyet = 0;

    // Toplam inşaat alanının %1.25'inin çatı alanı olacağını varsayalım.
    // Bu oran, ihtiyaç duyulursa değiştirilebilir.
    const miktar = toplamInsaatAlani * 1.25;

    if (catiTipi === 'osb') {
        maliyet = miktar * (parseFloat(catiOsbMetrekareFiyati) || 0);
    } else if (catiTipi === 'ahsap') {
        maliyet = miktar * (parseFloat(catiAhsapMetrekareFiyati) || 0);
    }

    return {
        miktar,
        maliyet,
    };
};