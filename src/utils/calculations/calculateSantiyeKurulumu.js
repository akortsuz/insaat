// src/utils/calculations/calculateSantiyeKurulumu.js

export const calculateSantiyeKurulumu = (formData, fiyatlar) => {
    const {
        santiyeCevreCiti, santiyeCepheSayisi, dijitalBaski, insaatSigortasi,
        insaatYapimSuresi, kullanilanAracSayisi, aracAylikMasrafi
    } = formData;

    const {
        santiyeCevreCitiFiyati, dijitalBaskiFiyati, isGuvenligiFiyati, insaatSigortasiBedeli
    } = fiyatlar || {};

    let toplamSantiyeMaliyeti = 0;
    
    // Şantiye Çevre Çiti
    if (santiyeCevreCiti === 'evet') {
        toplamSantiyeMaliyeti += (parseFloat(santiyeCepheSayisi) || 0) * (parseFloat(santiyeCevreCitiFiyati) || 0);
    }
    
    // Dijital Baskı
    if (dijitalBaski === 'evet') {
        toplamSantiyeMaliyeti += parseFloat(dijitalBaskiFiyati) || 0;
    }

    // İş Güvenliği Malzemeleri
    toplamSantiyeMaliyeti += parseFloat(isGuvenligiFiyati) || 0;

    // İnşaat Sigortası
    if (insaatSigortasi === 'evet') {
        toplamSantiyeMaliyeti += parseFloat(insaatSigortasiBedeli) || 0;
    }

    // Şantiye Araç Giderleri
    const toplamSantiyeAracGideri = (parseFloat(aracAylikMasrafi) || 0) * (parseFloat(insaatYapimSuresi) || 0) * (parseFloat(kullanilanAracSayisi) || 0);
    toplamSantiyeMaliyeti += toplamSantiyeAracGideri;

    return {
        maliyetler: {
            santiyeCevreCiti: (santiyeCevreCiti === 'evet' ? (parseFloat(santiyeCepheSayisi) || 0) * (parseFloat(santiyeCevreCitiFiyati) || 0) : 0),
            dijitalBaski: (dijitalBaski === 'evet' ? parseFloat(dijitalBaskiFiyati) || 0 : 0),
            isGuvenligi: parseFloat(isGuvenligiFiyati) || 0,
            insaatSigortasi: (insaatSigortasi === 'evet' ? parseFloat(insaatSigortasiBedeli) || 0 : 0),
            santiyeAracGideri: toplamSantiyeAracGideri,
        },
        toplamMaliyet: toplamSantiyeMaliyeti,
    };
};