// src/utils/calculations/calculateProjeVeSantiye.js

export const calculateProjeVeSantiye = (formData, fiyatlar) => {
    const {
        // Form verileri
        zeminEtuduYapildiMi, akustikRaporAlinacakMi,
        santiyeCevreCiti, santiyeCepheSayisi, dijitalBaski, insaatSigortasi,
        insaatYapimSuresi, kullanilanAracSayisi, aracAylikMasrafi
    } = formData;

    const {
        // Fiyatlar
        mimariProjeFiyati, statikProjeFiyati, tesisatProjeFiyati, elektrikProjeFiyati, peyzajProjeFiyati,
        zeminEtuduFiyati, haritaciFiyati, yolKotuFiyati, ruhsatVeIskanHarclari, sigortaVeTeminatlar,
        danismanlikFiyati, yapiDenetimHizmetleri, akustikRaporFiyati,
        santiyeCevreCitiFiyati, dijitalBaskiFiyati, isGuvenligiFiyati, insaatSigortasiBedeli
    } = fiyatlar || {};

    let toplamProjeMaliyeti = 0;
    let toplamSantiyeMaliyeti = 0;

    // Proje ve İmar Maliyetleri
    toplamProjeMaliyeti += parseFloat(mimariProjeFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(statikProjeFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(tesisatProjeFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(elektrikProjeFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(peyzajProjeFiyati) || 0;

    if (zeminEtuduYapildiMi === 'evet') {
        toplamProjeMaliyeti += parseFloat(zeminEtuduFiyati) || 0;
    }
    if (akustikRaporAlinacakMi === 'evet') {
        toplamProjeMaliyeti += parseFloat(akustikRaporFiyati) || 0;
    }

    toplamProjeMaliyeti += parseFloat(haritaciFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(yolKotuFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(ruhsatVeIskanHarclari) || 0;
    toplamProjeMaliyeti += parseFloat(sigortaVeTeminatlar) || 0;
    toplamProjeMaliyeti += parseFloat(danismanlikFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(yapiDenetimHizmetleri) || 0;

    // Şantiye Kurulum Maliyetleri
    if (santiyeCevreCiti === 'evet') {
        toplamSantiyeMaliyeti += (parseFloat(santiyeCepheSayisi) || 0) * (parseFloat(santiyeCevreCitiFiyati) || 0);
    }

    if (dijitalBaski === 'evet') {
        toplamSantiyeMaliyeti += parseFloat(dijitalBaskiFiyati) || 0;
    }

    toplamSantiyeMaliyeti += parseFloat(isGuvenligiFiyati) || 0;

    if (insaatSigortasi === 'evet') {
        toplamSantiyeMaliyeti += parseFloat(insaatSigortasiBedeli) || 0;
    }

    const toplamSantiyeAracGideri = (parseFloat(aracAylikMasrafi) || 0) * (parseFloat(insaatYapimSuresi) || 0) * (parseFloat(kullanilanAracSayisi) || 0);
    toplamSantiyeMaliyeti += toplamSantiyeAracGideri;


    const toplamProjeVeSantiye = toplamProjeMaliyeti + toplamSantiyeMaliyeti;

    return {
        projeMaliyeti: toplamProjeMaliyeti,
        santiyeMaliyeti: toplamSantiyeMaliyeti,
        toplamMaliyet: toplamProjeVeSantiye,
    };
};