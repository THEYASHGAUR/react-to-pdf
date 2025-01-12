import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";

export default function Invoice() {
    // Create a ref to reference the element that will be converted to PDF
    const printRef = React.useRef(null);

    const handleDownloadPdf = async () => {
      // Access the DOM element through the ref
      const element = printRef.current;

      // If the element is not found, exit the function
      if (!element) {
        return;
      }

      // Use html2canvas to capture the element as a canvas with increased scale for better resolution
      const canvas = await html2canvas(element, {
        scale: 2, // Increase resolution by scaling up the canvas
      });

      // Convert the canvas to a data URL in PNG format
      const data = canvas.toDataURL("image/png");

      // Create a new jsPDF instance with specified options
      const pdf = new jsPDF({
        orientation: "portrait", // Page orientation set to portrait
        unit: "px", // Unit of measurement in pixels
        format: "a4", // PDF page format set to A4 size
      });

      // Get properties of the generated image to calculate its dimensions
      const imgProperties = pdf.getImageProperties(data);

      // Get the width of the PDF page
      const pdfWidth = pdf.internal.pageSize.getWidth();

      // Calculate the height of the image to maintain its aspect ratio
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      // Add the image to the PDF at position (0, 0) with calculated width and height
      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the generated PDF with a specific filename
      pdf.save("invoice.pdf");
    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div ref={printRef} className="p-8 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
            </div>
            <div className="text-right">
              <h2 className="font-semibold">Company Name</h2>
              <p className="text-sm text-gray-600">
                123 Business Street
                <br />
                City, State 12345
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
            <p className="text-gray-700">
              Client Name
              <br />
              Client Address
              <br />
              City, State ZIP
            </p>
          </div>

          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-right">Quantity</th>
                <th className="border p-2 text-right">Unit Price</th>
                <th className="border p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Web Design Service</td>
                <td className="border p-2 text-right">1</td>
                <td className="border p-2 text-right">$1,500.00</td>
                <td className="border p-2 text-right">$1,500.00</td>
              </tr>
              <tr>
                <td className="border p-2">Hosting Setup</td>
                <td className="border p-2 text-right">1</td>
                <td className="border p-2 text-right">$250.00</td>
                <td className="border p-2 text-right">$250.00</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>$1,750.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%):</span>
                <span>$175.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>$1,925.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
