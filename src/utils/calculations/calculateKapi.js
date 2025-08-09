// src/utils/calculations/calculateKapi.js

export const calculateKapi = (daireSayisi, fiyatlar) => {
    const { kapiBirimFiyati } = fiyatlar || {};

    const birimFiyat = parseFloat(kapiBirimFiyati) || 0;
    
    // Her daire için 5 adet kapı olduğunu varsayalım. (giriş kapısı + oda kapıları)
    const miktar = daireSayisi * 5;
    const maliyet = miktar * birimFiyat;

    return {
        miktar,
        maliyet,
    };
};