// src/utils/calculations/calculateSeramik.js

export const calculateSeramik = (toplamInsaatAlani, fiyatlar) => {
    const { seramikMetrekareFiyati } = fiyatlar || {};

    const metrekareFiyat = parseFloat(seramikMetrekareFiyati) || 0;
    
    // Toplam inşaat alanının %40'ının seramik olacağını varsayalım (banyo, mutfak, koridor vb.)
    const miktar = toplamInsaatAlani * 0.40;
    const maliyet = miktar * metrekareFiyat;

    return {
        miktar,
        maliyet,
    };
};