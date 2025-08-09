// src/utils/calculations/calculatePencere.js

export const calculatePencere = (daireSayisi, fiyatlar) => {
    const { pencereBirimFiyati } = fiyatlar || {};

    const birimFiyat = parseFloat(pencereBirimFiyati) || 0;
    
    // Her daire için 5 adet pencere olduğunu varsayalım.
    const miktar = daireSayisi * 5;
    const maliyet = miktar * birimFiyat;

    return {
        miktar,
        maliyet,
    };
};