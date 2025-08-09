// src/components/InputForm.jsx dosyasının tam içeriği

import React, { useState } from 'react';
import styles from './InputForm.module.css';
import { calculateAllCosts } from "../utils/calculations";
import ResultBox from './ResultBox.jsx';

// Güncellenmiş fiyatlar listesi
const fiyatlar = {
    // Beton ve Demir
    demirFiyati: 22000, // Demir ton fiyatı
    c30Fiyati: 2400, // C30 Beton metreküp fiyatı
    kalipIscilikFiyati: 500, // Kalıp işçilik metrekare fiyatı
    demirIscilikFiyati: 1250, // Demir işçilik ton fiyatı

    // Proje ve İmar
    mimariProjeFiyati: 50000,
    statikProjeFiyati: 30000,
    tesisatProjeFiyati: 20000,
    elektrikProjeFiyati: 20000,
    peyzajProjeFiyati: 10000,
    zeminEtuduFiyati: 15000,
    haritaciFiyati: 10000,
    yolKotuFiyati: 5000,
    ruhsatVeIskanHarclari: 25000,
    sigortaVeTeminatlar: 20000,
    danismanlikFiyati: 15000,
    yapiDenetimHizmetleri: 50000,
    akustikRaporFiyati: 10000,

    // Şantiye Kurulumu
    santiyeCevreCitiFiyati: 5000,
    dijitalBaskiFiyati: 2000,
    isGuvenligiFiyati: 7500,
    insaatSigortasiBedeli: 12000,

    // Hafriyat
    hafriyatBirimFiyati: 150,

    // İş Makinesi
    vincGunlukUcreti: 5000,
    forkliftGunlukUcreti: 2500,
    jcbGunlukUcreti: 3000,

    // İnce İşler
    gazbetonBirimFiyati: 1000,
    gazbetonMetrekupOrani: 0.25,
    gazbetonMetrekareOrani: 0.8,
    parkeMetrekareFiyati: 300,
    seramikMetrekareFiyati: 200,
    kapiBirimFiyati: 15000,
    pencereBirimFiyati: 10000,
    catiAhsapFiyati: 500, // Örnek olarak
    catiOsbFiyati: 1000, // Örnek olarak

    // Yeni Fiyatlar: Su Yalıtımı ve Drenaj
    membranIscilikFiyati: 150,
    membranTopFiyati: 800,
    suDrenajiBirimFiyati: 100,
    balkonSuYalitimiFiyati: 15000,

    // Yeni Fiyatlar: Duvar
    gazbetonYapistiricisiFiyati: 100,
    gazbetonIscilikFiyati: 80,

    // Yeni Fiyatlar: Çatı
    ahsapFiyati: 15000, // m³ fiyatı
    ahsapIscilikBirimMaliyeti: 5000, // m³ işçilik fiyatı
    osb11mmFiyati: 1100, // Plaka fiyatı
    osbPlakaSayisi: 1, // m2 başına plaka sayısı varsayımı
    tasYunuBirimFiyati: 100, // m² fiyatı
    xpsFiyati: 150, // 5cm XPS m² fiyatı
    kiremitAdetFiyati: 15,
    cekmeSacDereFiyati: 250, // m fiyatı
};

const InputForm = () => {
    const [formData, setFormData] = useState({
        // Proje Bilgileri
        toplamInsaatAlani: '',
        bagimsizBolumSayisi: '',
        mimarSorumlu: 'hayır',
        mimaraOdenenBirimFiyat: '',
        zeminEtuduYapildiMi: 'hayır',
        akustikRaporAlinacakMi: 'hayır',
        haritaciUcreti: '',

        // Şantiye Kurulumu
        santiyeCevreCiti: 'hayır',
        santiyeCepheSayisi: '',
        santiyeCevreMalzemeFiyati: '',
        dijitalBaski: 'hayır',
        dijitalBaskiMaliyeti: '',
        isGuvenligiMalzemeleri: '',
        insaatSigortasi: 'hayır',
        insaatSigortaBedeli: '',

        // Hafriyat
        hafriyatAlani: '',
        ortalamaHafriyatYuksekligi: '',
        hafriyatBirimFiyati: '',

        // İş Makinesi
        kiralikVincKullanilacakMi: 'hayır',
        vincUcreti: '',
        vincKiralamaSuresi: '',
        kiralikForkliftKullanilacakMi: 'hayır',
        forkliftUcreti: '',
        forkliftKiralamaSuresi: '',
        kiralikJcbKullanilacakMi: 'hayır',
        jcbUcreti: '',
        jcbKiralamaSuresi: '',
        santiyedeKullanilanAracVarMi: 'hayır',
        kullanilanAracSayisi: '',
        aracAylikMasrafi: '',
        insaatYapimSuresi: '',

        // Beton ve Demir
        temelAlani: '',
        temelKalinligi: '',
        normalKatSayisi: '',
        normalKatAlani: '',
        kirisDerinligi: '',
        kirisGenisligi: '',
        dosemeKalinligi: '',

        // Su Yalıtımı ve Drenaj
        temelSuYalitimiAlani: '',
        kacKatMembranYapilacak: '',
        kacTopMembranKullanildi: '',
        toplamSuDrenajUzunlugu: '',

        // Duvar
        icDuvarToplamYuzeyAlani: '',
        disDuvarToplamYuzeyi: '',
        duvardaKullanilanGazbetonYapistiriciSayisi: '',

        // Çatı
        cati: {
            catiTipi: '',
            ahsapMetrekupMaliyeti: '',
            ahsapIscilikMaliyeti: '',
            osbKatmanSayisi: '',
            osbPlakaSayisi: '',
            osbPlakaFiyati: '',
            isiYalitimAlani: '',
            tasYunuBirimFiyati: '',
            xpsFiyati: '',
            suYalitimAlani: '',
            kiremitAdetSayisi: '',
            kiremitAdetFiyati: '',
            dereTuru: '',
            cekmeSacDereFiyati: '',
            dereUzunlugu: '',
        }
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Cati state'i için özel bir kontrol
        if (name.startsWith('cati.')) {
            const [_, key] = name.split('.');
            setFormData(prevFormData => ({
                ...prevFormData,
                cati: {
                    ...prevFormData.cati,
                    [key]: type === 'checkbox' ? checked : value,
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const calculatedResult = calculateAllCosts(formData, fiyatlar);
        setResult(calculatedResult);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>İnşaat Maliyeti Hesaplayıcı</h1>
            <form onSubmit={handleSubmit}>
                {/* Proje Bilgileri */}
                <h2 className={styles.sectionTitle}>1. Proje Bilgileri</h2>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Toplam İnşaat Alanı (m²):</label>
                    <input
                        type="number"
                        name="toplamInsaatAlani"
                        value={formData.toplamInsaatAlani}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Bağımsız Bölüm Sayısı:</label>
                    <input
                        type="number"
                        name="bagimsizBolumSayisi"
                        value={formData.bagimsizBolumSayisi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                {/* Proje ve İmar */}
                <h3 className={styles.subSectionTitle}>Proje ve İmar İşleri</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Mimarla sorumlu müteahhit:</label>
                    <select
                        name="mimarSorumlu"
                        value={formData.mimarSorumlu}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="evet">Evet</option>
                        <option value="hayır">Hayır</option>
                    </select>
                </div>
                {formData.mimarSorumlu === 'evet' && (
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mimara Ödenen Birim Fiyat:</label>
                        <input
                            type="number"
                            name="mimaraOdenenBirimFiyat"
                            value={formData.mimaraOdenenBirimFiyat}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                )}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Zemin Etüdü Yapıldı Mı?</label>
                    <select
                        name="zeminEtuduYapildiMi"
                        value={formData.zeminEtuduYapildiMi}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="evet">Evet</option>
                        <option value="hayır">Hayır</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Akustik Rapor Alınacak Mı?</label>
                    <select
                        name="akustikRaporAlinacakMi"
                        value={formData.akustikRaporAlinacakMi}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="evet">Evet</option>
                        <option value="hayır">Hayır</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Haritacı Ücreti (₺):</label>
                    <input
                        type="number"
                        name="haritaciUcreti"
                        value={formData.haritaciUcreti}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                {/* Şantiye Kurulumu */}
                <h2 className={styles.sectionTitle}>2. Şantiye Kurulumu</h2>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Şantiye Çevre Çiti Gerekli mi?</label>
                    <select
                        name="santiyeCevreCiti"
                        value={formData.santiyeCevreCiti}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="evet">Evet</option>
                        <option value="hayır">Hayır</option>
                    </select>
                </div>
                {formData.santiyeCevreCiti === 'evet' && (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Kaç Cephede Çit Gerekli?</label>
                            <input
                                type="number"
                                name="santiyeCepheSayisi"
                                value={formData.santiyeCepheSayisi}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Çit Birim Fiyatı (₺/m):</label>
                            <input
                                type="number"
                                name="santiyeCevreMalzemeFiyati"
                                value={formData.santiyeCevreMalzemeFiyati}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    </>
                )}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Dijital Baskı Gerekli mi?</label>
                    <select
                        name="dijitalBaski"
                        value={formData.dijitalBaski}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="evet">Evet</option>
                        <option value="hayır">Hayır</option>
                    </select>
                </div>
                {formData.dijitalBaski === 'evet' && (
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Dijital Baskı Maliyeti (₺):</label>
                        <input
                            type="number"
                            name="dijitalBaskiMaliyeti"
                            value={formData.dijitalBaskiMaliyeti}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                )}
                <div className={styles.formGroup}>
                    <label className={styles.label}>İş Güvenliği Malzemeleri Maliyeti (₺):</label>
                    <input
                        type="number"
                        name="isGuvenligiMalzemeleri"
                        value={formData.isGuvenligiMalzemeleri}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>İnşaat Sigortası Gerekli mi?</label>
                    <select
                        name="insaatSigortasi"
                        value={formData.insaatSigortasi}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="evet">Evet</option>
                        <option value="hayır">Hayır</option>
                    </select>
                </div>
                {formData.insaatSigortasi === 'evet' && (
                    <div className={styles.formGroup}>
                        <label className={styles.label}>İnşaat Sigorta Bedeli (₺):</label>
                        <input
                            type="number"
                            name="insaatSigortaBedeli"
                            value={formData.insaatSigortaBedeli}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                )}

                {/* Hafriyat */}
                <h2 className={styles.sectionTitle}>3. Hafriyat</h2>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Hafriyat Alanı (m²):</label>
                    <input
                        type="number"
                        name="hafriyatAlani"
                        value={formData.hafriyatAlani}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Ortalama Hafriyat Yüksekliği (m):</label>
                    <input
                        type="number"
                        name="ortalamaHafriyatYuksekligi"
                        value={formData.ortalamaHafriyatYuksekligi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Hafriyat Birim Fiyatı (₺/m³):</label>
                    <input
                        type="number"
                        name="hafriyatBirimFiyati"
                        value={formData.hafriyatBirimFiyati}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                {/* İş Makinesi ve Araç Giderleri */}
                <h2 className={styles.sectionTitle}>4. İş Makinesi ve Araç Giderleri</h2>
                <h3 className={styles.subSectionTitle}>Vinç</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Kiralık Vinç Kullanılacak mı?</label>
                    <select
                        name="kiralikVincKullanilacakMi"
                        value={formData.kiralikVincKullanilacakMi}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="evet">Evet</option>
                        <option value="hayır">Hayır</option>
                    </select>
                </div>
                {formData.kiralikVincKullanilacakMi === 'evet' && (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Vinç Günlük Ücreti (₺):</label>
                            <input
                                type="number"
                                name="vincUcreti"
                                value={formData.vincUcreti}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Vinç Kiralama Süresi (Gün):</label>
                            <input
                                type="number"
                                name="vincKiralamaSuresi"
                                value={formData.vincKiralamaSuresi}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    </>
                )}
                <h3 className={styles.subSectionTitle}>Forklift</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Kiralık Forklift Kullanılacak mı?</label>
                    <select
                        name="kiralikForkliftKullanilacakMi"
                        value={formData.kiralikForkliftKullanilacakMi}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="evet">Evet</option>
                        <option value="hayır">Hayır</option>
                    </select>
                </div>
                {formData.kiralikForkliftKullanilacakMi === 'evet' && (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Forklift Günlük Ücreti (₺):</label>
                            <input
                                type="number"
                                name="forkliftUcreti"
                                value={formData.forkliftUcreti}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Forklift Kiralama Süresi (Gün):</label>
                            <input
                                type="number"
                                name="forkliftKiralamaSuresi"
                                value={formData.forkliftKiralamaSuresi}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    </>
                )}
                <h3 className={styles.subSectionTitle}>JCB</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Kiralık JCB Kullanılacak mı?</label>
                    <select
                        name="kiralikJcbKullanilacakMi"
                        value={formData.kiralikJcbKullanilacakMi}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="evet">Evet</option>
                        <option value="hayır">Hayır</option>
                    </select>
                </div>
                {formData.kiralikJcbKullanilacakMi === 'evet' && (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>JCB Günlük Ücreti (₺):</label>
                            <input
                                type="number"
                                name="jcbUcreti"
                                value={formData.jcbUcreti}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>JCB Kiralama Süresi (Gün):</label>
                            <input
                                type="number"
                                name="jcbKiralamaSuresi"
                                value={formData.jcbKiralamaSuresi}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    </>
                )}
                <h3 className={styles.subSectionTitle}>Şantiye Araçları</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Şantiyede Kullanılan Araç Var mı?</label>
                    <select
                        name="santiyedeKullanilanAracVarMi"
                        value={formData.santiyedeKullanilanAracVarMi}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="evet">Evet</option>
                        <option value="hayır">Hayır</option>
                    </select>
                </div>
                {formData.santiyedeKullanilanAracVarMi === 'evet' && (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Kullanılan Araç Sayısı:</label>
                            <input
                                type="number"
                                name="kullanilanAracSayisi"
                                value={formData.kullanilanAracSayisi}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Araç Aylık Masrafı (₺):</label>
                            <input
                                type="number"
                                name="aracAylikMasrafi"
                                value={formData.aracAylikMasrafi}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>İnşaat Yapım Süresi (Ay):</label>
                            <input
                                type="number"
                                name="insaatYapimSuresi"
                                value={formData.insaatYapimSuresi}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    </>
                )}

                {/* Beton ve Demir */}
                <h2 className={styles.sectionTitle}>5. Beton ve Demir</h2>
                <h3 className={styles.subSectionTitle}>Temel Bilgileri</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Temel Alanı (m²):</label>
                    <input
                        type="number"
                        name="temelAlani"
                        value={formData.temelAlani}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Temel Kalınlığı (m):</label>
                    <input
                        type="number"
                        name="temelKalinligi"
                        value={formData.temelKalinligi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <h3 className={styles.subSectionTitle}>Kat Bilgileri</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Normal Kat Sayısı:</label>
                    <input
                        type="number"
                        name="normalKatSayisi"
                        value={formData.normalKatSayisi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Normal Kat Alanı (m²):</label>
                    <input
                        type="number"
                        name="normalKatAlani"
                        value={formData.normalKatAlani}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <h3 className={styles.subSectionTitle}>Döşeme Bilgileri</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Döşeme Kalınlığı (m):</label>
                    <input
                        type="number"
                        name="dosemeKalinligi"
                        value={formData.dosemeKalinligi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <h3 className={styles.subSectionTitle}>Kiriş Bilgileri</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Kiriş Derinliği (m):</label>
                    <input
                        type="number"
                        name="kirisDerinligi"
                        value={formData.kirisDerinligi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Kiriş Genişliği (m):</label>
                    <input
                        type="number"
                        name="kirisGenisligi"
                        value={formData.kirisGenisligi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                {/* Su Yalıtımı ve Drenaj */}
                <h2 className={styles.sectionTitle}>6. Su Yalıtımı ve Drenaj</h2>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Temelde Su Yalıtımı Yapılacak Alan (m²):</label>
                    <input
                        type="number"
                        name="temelSuYalitimiAlani"
                        value={formData.temelSuYalitimiAlani}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Kaç Kat Membran Yapılacak?</label>
                    <input
                        type="number"
                        name="kacKatMembranYapilacak"
                        value={formData.kacKatMembranYapilacak}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Kaç Top Membran Kullanıldı?</label>
                    <input
                        type="number"
                        name="kacTopMembranKullanildi"
                        value={formData.kacTopMembranKullanildi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Toplam Su Drenaj Uzunluğu (m):</label>
                    <input
                        type="number"
                        name="toplamSuDrenajUzunlugu"
                        value={formData.toplamSuDrenajUzunlugu}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                {/* Duvar */}
                <h2 className={styles.sectionTitle}>7. Duvar</h2>
                <div className={styles.formGroup}>
                    <label className={styles.label}>İç Duvar Toplam Yüzey Alanı (m²):</label>
                    <input
                        type="number"
                        name="icDuvarToplamYuzeyAlani"
                        value={formData.icDuvarToplamYuzeyAlani}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Dış Duvar Toplam Yüzeyi (m²):</label>
                    <input
                        type="number"
                        name="disDuvarToplamYuzeyi"
                        value={formData.disDuvarToplamYuzeyi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Duvarda Kullanılan Gazbeton Yapıştırıcı Sayısı (torba):</label>
                    <input
                        type="number"
                        name="duvardaKullanilanGazbetonYapistiriciSayisi"
                        value={formData.duvardaKullanilanGazbetonYapistiriciSayisi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                {/* Çatı */}
                <h2 className={styles.sectionTitle}>8. Çatı</h2>
                <div className={styles.formGroup}>
                    <h3 className={styles.subSectionTitle}>Karkas</h3>
                    <label className={styles.label}>Çatı Tipi:</label>
                    <select
                        name="cati.catiTipi"
                        value={formData.cati.catiTipi}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Seçiniz</option>
                        <option value="ahsap">Ahşap Karkas</option>
                        <option value="celik">Çelik Karkas</option>
                    </select>
                </div>

                {formData.cati.catiTipi === 'ahsap' && (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Kullanılacak Olan Ahşap (m³):</label>
                            <input
                                type="number"
                                name="cati.ahsapMetrekupMaliyeti"
                                value={formData.cati.ahsapMetrekupMaliyeti}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Ahşap Çatı İşçiliği (₺):</label>
                            <input
                                type="number"
                                name="cati.ahsapIscilikMaliyeti"
                                value={formData.cati.ahsapIscilikMaliyeti}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    </>
                )}

                <h3 className={styles.subSectionTitle}>Kaplama Türü OSB</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>OSB Katman Sayısı:</label>
                    <select
                        name="cati.osbKatmanSayisi"
                        value={formData.cati.osbKatmanSayisi}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Seçiniz</option>
                        <option value="tek">Tek Kat</option>
                        <option value="cift">Çift Kat</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Kullanılacak Olan Toplam OSB Plaka Sayısı:</label>
                    <input
                        type="number"
                        name="cati.osbPlakaSayisi"
                        value={formData.cati.osbPlakaSayisi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>OSB Fiyatı (11mm Plaka):</label>
                    <input
                        type="number"
                        name="cati.osbPlakaFiyati"
                        value={formData.cati.osbPlakaFiyati}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <h3 className={styles.subSectionTitle}>Isı Yalıtımı</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Isı Yalıtımı Yapılacak Toplam Alan (m²):</label>
                    <input
                        type="number"
                        name="cati.isiYalitimAlani"
                        value={formData.cati.isiYalitimAlani}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Taş Yünü Birim Fiyatı (m²):</label>
                    <input
                        type="number"
                        name="cati.tasYunuBirimFiyati"
                        value={formData.cati.tasYunuBirimFiyati}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>5 cm XPS Fiyatı (m²):</label>
                    <input
                        type="number"
                        name="cati.xpsFiyati"
                        value={formData.cati.xpsFiyati}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <h3 className={styles.subSectionTitle}>Su Yalıtımı</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Su Yalıtımı Yapılacak Alan (m²):</label>
                    <input
                        type="number"
                        name="cati.suYalitimAlani"
                        value={formData.cati.suYalitimAlani}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Toplam Kiremit Sayısı:</label>
                    <input
                        type="number"
                        name="cati.kiremitAdetSayisi"
                        value={formData.cati.kiremitAdetSayisi}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Kiremit Adet Fiyatı:</label>
                    <input
                        type="number"
                        name="cati.kiremitAdetFiyati"
                        value={formData.cati.kiremitAdetFiyati}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                
                <h3 className={styles.subSectionTitle}>Dere</h3>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Dere Türü:</label>
                    <select
                        name="cati.dereTuru"
                        value={formData.cati.dereTuru}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Seçiniz</option>
                        <option value="cekmeSac">Çekme Sac Dere</option>
                        <option value="plastik">Plastik Dere</option>
                        <option value="yok">Dere Yok</option>
                    </select>
                </div>
                {formData.cati.dereTuru === 'cekmeSac' && (
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Çekme Sac Dere Fiyatı:</label>
                        <input
                            type="number"
                            name="cati.cekmeSacDereFiyati"
                            value={formData.cati.cekmeSacDereFiyati}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                )}
                {(formData.cati.dereTuru === 'cekmeSac' || formData.cati.dereTuru === 'plastik') && (
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Dere Uzunluğu (m):</label>
                        <input
                            type="number"
                            name="cati.dereUzunlugu"
                            value={formData.cati.dereUzunlugu}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                )}
                

                {/* Hesaplama Butonu */}
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.button}>
                        Hesapla
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setFormData(initialState)} 
                        className={styles.resetButton}
                    >
                        Sıfırla
                    </button>
                </div>
            </form>
            {result && <ResultBox data={result} />}
        </div>
    );
};

export default InputForm;