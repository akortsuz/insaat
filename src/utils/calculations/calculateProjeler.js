// src/utils/calculations/calculateProjeler.js

export const calculateProjeler = (formData, fiyatlar) => {
    const {
        zeminEtuduYapildiMi, akustikRaporAlinacakMi,
    } = formData;

    const {
        mimariProjeFiyati, statikProjeFiyati, tesisatProjeFiyati, elektrikProjeFiyati, peyzajProjeFiyati,
        zeminEtuduFiyati, haritaciFiyati, yolKotuFiyati, ruhsatVeIskanHarclari, sigortaVeTeminatlar,
        danismanlikFiyati, yapiDenetimHizmetleri, akustikRaporFiyati,
    } = fiyatlar || {};

    let toplamProjeMaliyeti = 0;

    toplamProjeMaliyeti += parseFloat(mimariProjeFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(statikProjeFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(tesisatProjeFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(elektrikProjeFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(peyzajProjeFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(haritaciFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(yolKotuFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(ruhsatVeIskanHarclari) || 0;
    toplamProjeMaliyeti += parseFloat(sigortaVeTeminatlar) || 0;
    toplamProjeMaliyeti += parseFloat(danismanlikFiyati) || 0;
    toplamProjeMaliyeti += parseFloat(yapiDenetimHizmetleri) || 0;
    
    if (zeminEtuduYapildiMi === 'evet') {
        toplamProjeMaliyeti += parseFloat(zeminEtuduFiyati) || 0;
    }
    if (akustikRaporAlinacakMi === 'evet') {
        toplamProjeMaliyeti += parseFloat(akustikRaporFiyati) || 0;
    }

    return {
        maliyetler: {
            mimariProje: parseFloat(mimariProjeFiyati) || 0,
            statikProje: parseFloat(statikProjeFiyati) || 0,
            tesisatProje: parseFloat(tesisatProjeFiyati) || 0,
            elektrikProje: parseFloat(elektrikProjeFiyati) || 0,
            peyzajProje: parseFloat(peyzajProjeFiyati) || 0,
            zeminEtudu: (zeminEtuduYapildiMi === 'evet' ? parseFloat(zeminEtuduFiyati) : 0) || 0,
            haritaci: parseFloat(haritaciFiyati) || 0,
            yolKotu: parseFloat(yolKotuFiyati) || 0,
            ruhsatVeIskan: parseFloat(ruhsatVeIskanHarclari) || 0,
            sigortaVeTeminatlar: parseFloat(sigortaVeTeminatlar) || 0,
            danismanlik: parseFloat(danismanlikFiyati) || 0,
            yapiDenetim: parseFloat(yapiDenetimHizmetleri) || 0,
            akustikRapor: (akustikRaporAlinacakMi === 'evet' ? parseFloat(akustikRaporFiyati) : 0) || 0,
        },
        toplamMaliyet: toplamProjeMaliyeti,
    };
};