export const calculateBeton = (toplamAlan, fiyatlar) => {
    const miktar = toplamAlan * 0.3;
    const maliyet = miktar * fiyatlar.beton;
    return { miktar, maliyet };
};