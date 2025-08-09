// src/utils/calculations/calculateParke.js

export const calculateParke = (toplamInsaatAlani, fiyatlar) => {
    const { parkeMetrekareFiyati } = fiyatlar || {};

    const metrekareFiyat = parseFloat(parkeMetrekareFiyati) || 0;
    
    // Toplam inşaat alanının %60'ının parke olacağını varsayalım
    // Bu oran, ihtiyaç duyulursa değiştirilebilir.
    const miktar = toplamInsaatAlani * 0.60;
    const maliyet = miktar * metrekareFiyat;

    return {
        miktar,
        maliyet,
    };
};