import html2pdf from 'html2pdf.js';

const PdfButton = ({ elementId, fileName }) => {

  const handleDownloadPdf = () => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element not found with id: ${elementId}`);
      return;
    }

    const opt = {
      margin: 1,
      filename: fileName || 'maliyet-raporu.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <button onClick={handleDownloadPdf} style={{ marginTop: '20px' }}>PDF Olarak İndir</button>
  );
};

export default PdfButton;