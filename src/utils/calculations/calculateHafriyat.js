// src/utils/calculations/calculateHafriyat.js

export const calculateHafriyat = (formData, fiyatlar) => {
    const {
        hafriyatAlani, ortalamaHafriyatYuksekligi,
    } = formData;

    const {
        hafriyatBirimFiyati,
    } = fiyatlar || {};

    const hacim = (parseFloat(hafriyatAlani) || 0) * (parseFloat(ortalamaHafriyatYuksekligi) || 0);
    const toplamMaliyeti = hacim * (parseFloat(hafriyatBirimFiyati) || 0);

    return {
        miktarlar: {
            hafriyatHacmi: hacim,
        },
        maliyetler: {
            hafriyatMaliyeti: toplamMaliyeti,
        },
        toplamMaliyeti,
    };
};