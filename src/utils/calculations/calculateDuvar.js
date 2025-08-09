// src/utils/calculations/calculateDuvar.js

export const calculateDuvar = (formData, fiyatlar) => {
    const {
        icDuvarToplamYuzeyAlani,
        disDuvarToplamYuzeyi,
        duvardaKullanilanGazbetonYapistiriciSayisi
    } = formData;

    const {
        gazbetonFiyati,
        gazbetonYapistiricisiFiyati,
        gazbetonIscilikFiyati
    } = fiyatlar || {};

    const toplamDuvarAlani = (parseFloat(icDuvarToplamYuzeyAlani) || 0) + (parseFloat(disDuvarToplamYuzeyi) || 0);
    const gazbetonBirimAlan = 0.60 * 0.25; // 60x25 cm gazbeton blok yüzey alanı

    const icDuvardaKullanilanGazbeton = (parseFloat(icDuvarToplamYuzeyAlani) || 0) / gazbetonBirimAlan;
    const disDuvardaKullanilanGazbeton = (parseFloat(disDuvarToplamYuzeyi) || 0) / gazbetonBirimAlan;

    const toplamGazbetonMiktari = icDuvardaKullanilanGazbeton + disDuvardaKullanilanGazbeton;
    const toplamGazbetonMaliyeti = toplamGazbetonMiktari * (parseFloat(gazbetonFiyati) || 0);

    const toplamYapistiriciMaliyeti = (parseFloat(duvardaKullanilanGazbetonYapistiriciSayisi) || 0) * (parseFloat(gazbetonYapistiricisiFiyati) || 0);

    const toplamIscilikMaliyeti = toplamDuvarAlani * (parseFloat(gazbetonIscilikFiyati) || 0);
    
    const toplamMaliyet = toplamGazbetonMaliyeti + toplamYapistiriciMaliyeti + toplamIscilikMaliyeti;

    return {
        miktarlar: {
            icDuvardaKullanilanGazbeton,
            disDuvardaKullanilanGazbeton,
            toplamGazbetonMiktari
        },
        maliyetler: {
            toplamGazbetonMaliyeti,
            toplamYapistiriciMaliyeti,
            toplamIscilikMaliyeti,
        },
        toplamMaliyet,
    };
};