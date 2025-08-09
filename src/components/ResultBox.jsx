// src/components/ResultBox.jsx

import React from 'react';
import styles from "./ResultBox.module.css";

const ResultBox = ({ data }) => {
    if (!data || !data.miktarlar || !data.maliyetler) {
        return null;
    }

    const { miktarlar, maliyetler, toplamMaliyet } = data;

    const formatCost = (cost) => {
        const formattedCost = typeof cost === 'number' ? cost : 0;
        return formattedCost.toLocaleString('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatAmount = (amount, unit = '') => {
        return typeof amount === 'number' ? `${amount.toFixed(2)} ${unit}` : `0.00 ${unit}`;
    };

    return (
        <div id="sonuc" className={styles.resultContainer}>
            <h2 className={styles.resultTitle}>Hesap Sonuçları</h2>

            <div className={styles.section}>
                <h3>Genel Toplam Maliyet:</h3>
                <p className={styles.totalCost}>{formatCost(toplamMaliyet)}</p>
            </div>

            <h3 className={styles.resultTitle}>Genel Kalemler</h3>
            <ul className={styles.resultList}>
                <li className={styles.resultItem}>
                    <span>Gazbeton:</span> {formatAmount(miktarlar.gazbeton, "m²")} → <span>{formatCost(maliyetler.gazbeton?.maliyet)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Parke:</span> {formatAmount(miktarlar.parke, "m²")} → <span>{formatCost(maliyetler.parke?.maliyet)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Seramik:</span> {formatAmount(miktarlar.seramik, "m²")} → <span>{formatCost(maliyetler.seramik?.maliyet)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Kapı:</span> {miktarlar.kapi || 0} adet → <span>{formatCost(maliyetler.kapi?.maliyet)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Pencere:</span> {miktarlar.pencere || 0} adet → <span>{formatCost(maliyetler.pencere?.maliyet)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Çatı:</span> {miktarlar.cati === "osb" ? "OSB + Shingle" : "Ahşap"} → <span>{formatCost(maliyetler.cati?.maliyet)}</span>
                </li>
            </ul>

            <h3 className={styles.resultTitle}>Projelendirme ve İmar İşleri</h3>
            <ul className={styles.resultList}>
                <li className={styles.resultItem}>
                    <span>Proje Toplamı:</span> <span>{formatCost(maliyetler.projeler?.toplamMaliyet)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Mimari Projelendirme:</span> <span>{formatCost(maliyetler.projeler?.maliyetler?.mimariProje)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Statik Projelendirme:</span> <span>{formatCost(maliyetler.projeler?.maliyetler?.statikProje)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Tesisat Projelendirme:</span> <span>{formatCost(maliyetler.projeler?.maliyetler?.tesisatProje)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Elektrik Projelendirme:</span> <span>{formatCost(maliyetler.projeler?.maliyetler?.elektrikProje)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Peyzaj Projelendirme:</span> <span>{formatCost(maliyetler.projeler?.maliyetler?.peyzajProje)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Zemin Etüdü:</span> <span>{formatCost(maliyetler.projeler?.maliyetler?.zeminEtudu)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Harita Mühendisliği:</span> <span>{formatCost(maliyetler.projeler?.maliyetler?.haritaci)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Ruhsat ve İskan Harçları:</span> <span>{formatCost(maliyetler.projeler?.maliyetler?.ruhsatVeIskan)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Yapı Denetim Hizmetleri:</span> <span>{formatCost(maliyetler.projeler?.maliyetler?.yapiDenetim)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Akustik Rapor Masrafı:</span> <span>{formatCost(maliyetler.projeler?.maliyetler?.akustikRapor)}</span>
                </li>
            </ul>

            <h3 className={styles.resultTitle}>Şantiye Kurulumu</h3>
            <ul className={styles.resultList}>
                <li className={styles.resultItem}>
                    <span>Şantiye Kurulumu Toplamı:</span> <span>{formatCost(maliyetler.santiyeKurulumu?.toplamMaliyet)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Şantiye Çevre Çiti:</span> <span>{formatCost(maliyetler.santiyeKurulumu?.maliyetler?.santiyeCevreCiti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Dijital Baskı:</span> <span>{formatCost(maliyetler.santiyeKurulumu?.maliyetler?.dijitalBaski)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>İş Güvenliği Malzemeleri:</span> <span>{formatCost(maliyetler.santiyeKurulumu?.maliyetler?.isGuvenligi)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>İnşaat Sigortası:</span> <span>{formatCost(maliyetler.santiyeKurulumu?.maliyetler?.insaatSigortasi)}</span>
                </li>
            </ul>

            <h3 className={styles.resultTitle}>Hafriyat</h3>
            <ul className={styles.resultList}>
                <li className={styles.resultItem}>
                    <span>Hafriyat Hacmi:</span> <span>{formatAmount(maliyetler.hafriyat?.miktarlar?.hafriyatHacmi, "m³")}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Hafriyat Maliyeti:</span> <span>{formatCost(maliyetler.hafriyat?.toplamMaliyeti)}</span>
                </li>
            </ul>
            
            {/* Yeni Ekleme: Su Yalıtımı ve Drenaj */}
            <h3 className={styles.resultTitle}>Su Yalıtımı ve Drenaj</h3>
            <ul className={styles.resultList}>
                <li className={styles.resultItem}>
                    <span>Toplam Membran Maliyeti:</span> <span>{formatCost(maliyetler.suYalitimiVeDrenaj?.maliyetler?.toplamMembranMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Toplam Su Drenaj Maliyeti:</span> <span>{formatCost(maliyetler.suYalitimiVeDrenaj?.maliyetler?.toplamSuDrenajMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Balkon Su Yalıtımı Fiyatı:</span> <span>{formatCost(maliyetler.suYalitimiVeDrenaj?.maliyetler?.toplamBalkonSuYalitimiFiyati)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Su Yalıtımı ve Drenaj Toplamı:</span> <span>{formatCost(maliyetler.suYalitimiVeDrenaj?.toplamMaliyet)}</span>
                </li>
            </ul>

            {/* Yeni Ekleme: Duvar Maliyetleri */}
            <h3 className={styles.resultTitle}>Duvar Maliyetleri</h3>
            <ul className={styles.resultList}>
                <li className={styles.resultItem}>
                    <span>Toplam Gazbeton Miktarı:</span> <span>{formatAmount(maliyetler.duvar?.miktarlar?.toplamGazbetonMiktari, "adet")}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Gazbeton Malzeme Maliyeti:</span> <span>{formatCost(maliyetler.duvar?.maliyetler?.toplamGazbetonMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Yapıştırıcı Maliyeti:</span> <span>{formatCost(maliyetler.duvar?.maliyetler?.toplamYapistiriciMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>İşçilik Maliyeti:</span> <span>{formatCost(maliyetler.duvar?.maliyetler?.toplamIscilikMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Duvar Toplam Maliyeti:</span> <span>{formatCost(maliyetler.duvar?.toplamMaliyet)}</span>
                </li>
            </ul>
            
            <h3 className={styles.resultTitle}>İş Makinesi ve Araç Giderleri</h3>
            <ul className={styles.resultList}>
                <li className={styles.resultItem}>
                    <span>İş Makinesi Toplamı:</span> <span>{formatCost(maliyetler.isMakinesi?.toplamMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Vinç Masrafı:</span> <span>{formatCost(maliyetler.isMakinesi?.maliyetler?.vincMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Forklift Masrafı:</span> <span>{formatCost(maliyetler.isMakinesi?.maliyetler?.forkliftMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>JCB Masrafı:</span> <span>{formatCost(maliyetler.isMakinesi?.maliyetler?.jcbMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Şantiye Araçları Masrafı:</span> <span>{formatCost(maliyetler.santiyeKurulumu?.maliyetler?.santiyeAracGideri)}</span>
                </li>
            </ul>

            <h3 className={styles.resultTitle}>BETON VE DEMİR</h3>
            <ul className={styles.resultList}>
                <h4 className={styles.subSectionTitle}>TEMEL</h4>
                <li className={styles.resultItem}>
                    <span>Temelde Kullanılan Toplam Beton Hacmi:</span> <span>{formatAmount(maliyetler.betonVeDemir?.miktarlar?.temelBetonHacmi, "m³")}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Temelde Kullanılan Toplam Demir:</span> <span>{formatAmount(maliyetler.betonVeDemir?.miktarlar?.temelDemirTonaji, "ton")}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Temel Betonu Maliyeti:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.temelBetonuMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Temelde Kullanılan Demir Maliyeti:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.temelDemirMaliyeti)}</span>
                </li>

                <h4 className={styles.subSectionTitle}>KOLON ve PERDE</h4>
                <li className={styles.resultItem}>
                    <span>Kolon+Perde Beton Hacmi:</span> <span>{formatAmount(maliyetler.betonVeDemir?.miktarlar?.kolonPerdeBetonHacmi, "m³")}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Kolon+Perdede Kullanılan Demir:</span> <span>{formatAmount(maliyetler.betonVeDemir?.miktarlar?.kolonPerdeDemirTonaji, "ton")}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Kolon+Perde Beton Maliyeti:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.kolonPerdeBetonMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Kolon+Perdede Kullanılan Demir Maliyeti:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.kolonPerdeDemirMaliyeti)}</span>
                </li>

                <h4 className={styles.subSectionTitle}>DÖŞEME</h4>
                <li className={styles.resultItem}>
                    <span>Döşeme Beton Hacmi:</span> <span>{formatAmount(maliyetler.betonVeDemir?.miktarlar?.dosemeBetonHacmi, "m³")}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Döşemede Kullanılan Demir:</span> <span>{formatAmount(maliyetler.betonVeDemir?.miktarlar?.dosemeDemirTonaji, "ton")}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Döşeme Betonu Maliyeti:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.dosemeBetonuMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Döşemede Kullanılan Demir Maliyeti:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.dosemeDemirMaliyeti)}</span>
                </li>

                <h4 className={styles.subSectionTitle}>KALIP ve DEMİR İŞÇİLİĞİ</h4>
                <li className={styles.resultItem}>
                    <span>Toplam Kalıp İşçilik Maliyeti:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.kalipIscilik)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Demir İşçilik Toplam Bedeli:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.demirIscilik)}</span>
                </li>

                <h4 className={styles.subSectionTitle}>TOPLAMLAR</h4>
                <li className={styles.resultItem}>
                    <span>Tüm Yapıda Kullanılan Beton Hacmi:</span> <span>{formatAmount(maliyetler.betonVeDemir?.miktarlar?.toplamBetonHacmi, "m³")}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Tüm Yapıda Kullanılan Demir Tonu:</span> <span>{formatAmount(maliyetler.betonVeDemir?.miktarlar?.toplamDemirMiktari, "ton")}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Toplam Beton Maliyeti:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.toplamBetonMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Toplam Demir Maliyeti:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.toplamDemirMaliyeti)}</span>
                </li>
                <li className={styles.resultItem}>
                    <span>Beton ve Demir Toplam Maliyeti:</span> <span>{formatCost(maliyetler.betonVeDemir?.maliyetler?.betonVeDemirToplam)}</span>
                </li>
            </ul>

            <h3 className={styles.totalCost}>💰 TOPLAM MALİYET: {formatCost(toplamMaliyet)}</h3>
        </div>
    );
};

export default ResultBox;