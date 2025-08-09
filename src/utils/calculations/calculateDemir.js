export const calculateDemir = (toplamAlan, fiyatlar) => {
    const miktar = (toplamAlan / 100) * 4;
    const maliyet = miktar * fiyatlar.demir;
    return { miktar, maliyet };
};