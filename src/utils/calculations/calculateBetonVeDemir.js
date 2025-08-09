// src/utils/calculations/calculateBetonVeDemir.js

export const calculateBetonVeDemir = (formData, fiyatlar) => {
    const {
        temelKalinligi, temelAlani, normalKatAlani, normalKatSayisi,
        dosemeKalinligi,
    } = formData;

    const {
        demirFiyati, c30Fiyati, kalipIscilikFiyati, demirIscilikFiyati,
    } = fiyatlar || {}; // fiyatlar undefined ise boş bir obje kullan

    const temelKalinligiFloat = parseFloat(temelKalinligi) || 0;
    const temelAlaniFloat = parseFloat(temelAlani) || 0;
    const normalKatAlaniFloat = parseFloat(normalKatAlani) || 0;
    const normalKatSayisiFloat = parseFloat(normalKatSayisi) || 0;
    const dosemeKalinligiFloat = parseFloat(dosemeKalinligi) || 0;

    const birimDemirFiyati = parseFloat(demirFiyati) || 0;
    const birimC30Fiyati = parseFloat(c30Fiyati) || 0;
    const birimKalipIscilikFiyati = parseFloat(kalipIscilikFiyati) || 0;
    const birimDemirIscilikFiyati = parseFloat(demirIscilikFiyati) || 0;

    // Temel
    const temelBetonHacmi = temelAlaniFloat * temelKalinligiFloat;
    const temelDemirTonaji = temelBetonHacmi * 0.08;
    const temelBetonuMaliyeti = temelBetonHacmi * birimC30Fiyati;
    const temelDemirMaliyeti = temelDemirTonaji * birimDemirFiyati;

    // Kolon ve Perde (basit bir yaklaşımla hesaplama)
    const kolonPerdeBetonHacmi = (normalKatAlaniFloat * normalKatSayisiFloat) * 0.15;
    const kolonPerdeDemirTonaji = kolonPerdeBetonHacmi * 0.15;
    const kolonPerdeBetonMaliyeti = kolonPerdeBetonHacmi * birimC30Fiyati;
    const kolonPerdeDemirMaliyeti = kolonPerdeDemirTonaji * birimDemirFiyati;

    // Döşeme
    const dosemeBetonHacmi = (normalKatAlaniFloat * normalKatSayisiFloat) * dosemeKalinligiFloat;
    const dosemeDemirTonaji = dosemeBetonHacmi * 0.06;
    const dosemeBetonuMaliyeti = dosemeBetonHacmi * birimC30Fiyati;
    const dosemeDemirMaliyeti = dosemeDemirTonaji * birimDemirFiyati;

    // İşçilik
    const toplamKalipIscilik = (temelAlaniFloat + normalKatAlaniFloat * normalKatSayisiFloat) * 3 * birimKalipIscilikFiyati;
    const toplamDemirTonaji = temelDemirTonaji + kolonPerdeDemirTonaji + dosemeDemirTonaji;
    const toplamDemirIscilik = toplamDemirTonaji * birimDemirIscilikFiyati;
    
    // Toplamlar
    const toplamBetonHacmi = temelBetonHacmi + kolonPerdeBetonHacmi + dosemeBetonHacmi;
    const toplamBetonMaliyeti = temelBetonuMaliyeti + kolonPerdeBetonMaliyeti + dosemeBetonuMaliyeti;
    const toplamDemirMaliyeti = temelDemirMaliyeti + kolonPerdeDemirMaliyeti + dosemeDemirMaliyeti;
    const betonVeDemirToplam = toplamBetonMaliyeti + toplamDemirMaliyeti + toplamKalipIscilik + toplamDemirIscilik;

    return {
        miktarlar: {
            temelBetonHacmi,
            temelDemirTonaji,
            kolonPerdeBetonHacmi,
            kolonPerdeDemirTonaji,
            dosemeBetonHacmi,
            dosemeDemirTonaji,
            toplamBetonHacmi,
            toplamDemirMiktari: toplamDemirTonaji,
        },
        maliyetler: {
            temelBetonuMaliyeti,
            temelDemirMaliyeti,
            kolonPerdeBetonMaliyeti,
            kolonPerdeDemirMaliyeti,
            dosemeBetonuMaliyeti,
            dosemeDemirMaliyeti,
            kalipIscilik: toplamKalipIscilik,
            demirIscilik: toplamDemirIscilik,
            toplamBetonMaliyeti,
            toplamDemirMaliyeti,
            betonVeDemirToplam,
        },
        toplamMaliyet: betonVeDemirToplam,
    };
};