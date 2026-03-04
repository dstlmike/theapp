document.getElementById('download-btn').addEventListener('click', function() {
    const element = document.getElementById('content-to-export');
    
    // Configuration Options
    const opt = {
        margin:       0.5, // 0.5 inch margin
        filename:     'document.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, logging: true, dpi: 192, letterRendering: true },
        jsPDF:        { unit: 'in', format: [9.5, 11], orientation: 'portrait' } // 9.5 x 11
    };

    // New Promise-based API
    html2pdf().set(opt).from(element).save();
});
