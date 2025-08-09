// src/utils/calculations/calculateSuYalitimiVeDrenaj.js

export const calculateSuYalitimiVeDrenaj = (formData, fiyatlar) => {
    const {
        temelSuYalitimiAlani,
        kacKatMembranYapilacak,
        kacTopMembranKullanildi,
        toplamSuDrenajUzunlugu
    } = formData;

    const {
        membranIscilikFiyati,
        membranTopFiyati,
        suDrenajiBirimFiyati,
        balkonSuYalitimiFiyati
    } = fiyatlar || {};

    const membranMalzemeMaliyeti = (parseFloat(kacTopMembranKullanildi) || 0) * (parseFloat(membranTopFiyati) || 0);
    const membranIscilikMaliyeti = (parseFloat(temelSuYalitimiAlani) || 0) * (parseFloat(membranIscilikFiyati) || 0);
    const toplamMembranMaliyeti = (membranMalzemeMaliyeti + membranIscilikMaliyeti) * (parseFloat(kacKatMembranYapilacak) || 1);

    const toplamSuDrenajMaliyeti = (parseFloat(toplamSuDrenajUzunlugu) || 0) * (parseFloat(suDrenajiBirimFiyati) || 0);
    const toplamBalkonSuYalitimiFiyati = parseFloat(balkonSuYalitimiFiyati) || 0;

    const toplamMaliyet = toplamMembranMaliyeti + toplamSuDrenajMaliyeti + toplamBalkonSuYalitimiFiyati;

    return {
        maliyetler: {
            toplamMembranMaliyeti,
            toplamSuDrenajMaliyeti,
            toplamBalkonSuYalitimiFiyati,
        },
        toplamMaliyet,
    };
};