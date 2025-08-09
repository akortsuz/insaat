// src/utils/calculations/calculateIsMakinesi.js

export const calculateIsMakinesi = (formData, fiyatlar) => {
    const {
        kiralikVincKullanilacakMi, vincUcreti, vincKiralamaSuresi,
        kiralikForkliftKullanilacakMi, forkliftUcreti, forkliftKiralamaSuresi,
        kiralikJcbKullanilacakMi, jcbUcreti, jcbKiralamaSuresi
    } = formData;

    const {
        vincGunlukUcreti, forkliftGunlukUcreti, jcbGunlukUcreti,
    } = fiyatlar || {};

    let toplamMaliyeti = 0;
    
    // Vinç Maliyeti
    let vincMaliyeti = 0;
    if (kiralikVincKullanilacakMi === 'evet') {
        vincMaliyeti = (parseFloat(vincKiralamaSuresi) || 0) * (parseFloat(vincUcreti) || parseFloat(vincGunlukUcreti) || 0);
    }
    toplamMaliyeti += vincMaliyeti;
    
    // Forklift Maliyeti
    let forkliftMaliyeti = 0;
    if (kiralikForkliftKullanilacakMi === 'evet') {
        forkliftMaliyeti = (parseFloat(forkliftKiralamaSuresi) || 0) * (parseFloat(forkliftUcreti) || parseFloat(forkliftGunlukUcreti) || 0);
    }
    toplamMaliyeti += forkliftMaliyeti;

    // JCB Maliyeti
    let jcbMaliyeti = 0;
    if (kiralikJcbKullanilacakMi === 'evet') {
        jcbMaliyeti = (parseFloat(jcbKiralamaSuresi) || 0) * (parseFloat(jcbUcreti) || parseFloat(jcbGunlukUcreti) || 0);
    }
    toplamMaliyeti += jcbMaliyeti;

    return {
        maliyetler: {
            vincMaliyeti,
            forkliftMaliyeti,
            jcbMaliyeti,
        },
        toplamMaliyeti,
    };
};