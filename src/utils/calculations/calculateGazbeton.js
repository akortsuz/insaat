// src/utils/calculations/calculateGazbeton.js

export const calculateGazbeton = (toplamInsaatAlani, fiyatlar) => {
    const {
        gazbetonBirimFiyati, gazbetonMetrekareOrani
    } = fiyatlar || {};

    const metrekareOrani = parseFloat(gazbetonMetrekareOrani) || 0;
    const birimFiyat = parseFloat(gazbetonBirimFiyati) || 0;

    const miktar = toplamInsaatAlani * metrekareOrani;
    const maliyet = miktar * birimFiyat;

    return {
        miktar,
        maliyet,
    };
};