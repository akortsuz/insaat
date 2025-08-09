// src/utils/calculations/index.js

import { calculateProjeler } from "./calculateProjeler";
import { calculateSantiyeKurulumu } from "./calculateSantiyeKurulumu";
import { calculateHafriyat } from "./calculateHafriyat";
import { calculateIsMakinesi } from "./calculateIsMakinesi";
import { calculateBetonVeDemir } from "./calculateBetonVeDemir";
import { calculateGazbeton } from "./calculateGazbeton";
import { calculateParke } from "./calculateParke";
import { calculateSeramik } from "./calculateSeramik";
import { calculateKapi } from "./calculateKapi";
import { calculatePencere } from "./calculatePencere";
import { calculateCati } from "./calculateCati";
import { calculateSuYalitimiVeDrenaj } from "./calculateSuYalitimiVeDrenaj";
import { calculateDuvar } from "./calculateDuvar";

export const calculateAllCosts = (formData, fiyatlar) => {
    const toplamInsaatAlani = parseFloat(formData.toplamInsaatAlani) || 0;
    const daireSayisi = parseFloat(formData.bagimsizBolumSayisi) || 0;
    const catiTipi = formData.cati;

    const projeler = calculateProjeler(formData, fiyatlar);
    const santiyeKurulumu = calculateSantiyeKurulumu(formData, fiyatlar);
    const hafriyat = calculateHafriyat(formData, fiyatlar);
    const isMakinesi = calculateIsMakinesi(formData, fiyatlar);
    const betonVeDemir = calculateBetonVeDemir(formData, fiyatlar);
    const suYalitimiVeDrenaj = calculateSuYalitimiVeDrenaj(formData, fiyatlar);
    const duvar = calculateDuvar(formData, fiyatlar);

    const gazbeton = calculateGazbeton(toplamInsaatAlani, fiyatlar);
    const parke = calculateParke(toplamInsaatAlani, fiyatlar);
    const seramik = calculateSeramik(toplamInsaatAlani, fiyatlar);
    const kapi = calculateKapi(daireSayisi, fiyatlar);
    const pencere = calculatePencere(daireSayisi, fiyatlar);
    const cati = calculateCati(catiTipi, toplamInsaatAlani, fiyatlar);

    const genelKalemlerToplam =
        (gazbeton.maliyet || 0) +
        (parke.maliyet || 0) +
        (seramik.maliyet || 0) +
        (kapi.maliyet || 0) +
        (pencere.maliyet || 0) +
        (cati.maliyet || 0);

    const toplamMaliyet =
        (projeler.toplamMaliyet || 0) +
        (santiyeKurulumu.toplamMaliyet || 0) +
        (hafriyat.toplamMaliyeti || 0) +
        (isMakinesi.toplamMaliyeti || 0) +
        (betonVeDemir.toplamMaliyet || 0) +
        (genelKalemlerToplam || 0) +
        (suYalitimiVeDrenaj.toplamMaliyet || 0) +
        (duvar.toplamMaliyet || 0);

    return {
        miktarlar: {
            toplamAlan: toplamInsaatAlani,
            ...betonVeDemir.miktarlar,
            gazbeton: gazbeton.miktar,
            parke: parke.miktar,
            seramik: seramik.miktar,
            kapi: kapi.miktar,
            pencere: pencere.miktar,
            cati: cati.miktar,
        },
        maliyetler: {
            projeler: projeler,
            santiyeKurulumu: santiyeKurulumu,
            hafriyat: hafriyat,
            isMakinesi: isMakinesi,
            betonVeDemir: betonVeDemir,
            suYalitimiVeDrenaj: suYalitimiVeDrenaj,
            duvar: duvar,
            gazbeton: { miktar: gazbeton.miktar, maliyet: gazbeton.maliyet },
            parke: { miktar: parke.miktar, maliyet: parke.maliyet },
            seramik: { miktar: seramik.miktar, maliyet: seramik.maliyet },
            kapi: { miktar: kapi.miktar, maliyet: kapi.maliyet },
            pencere: { miktar: pencere.miktar, maliyet: pencere.maliyet },
            cati: { miktar: cati.miktar, maliyet: cati.maliyet },
        },
        toplamMaliyet,
    };
};