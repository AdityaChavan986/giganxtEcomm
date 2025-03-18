'use client';
import React, { useRef } from 'react';

const InvoiceButton = ({ order, currency }) => {
  // Create a consistent date format function
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const printInvoice = () => {
    // Using this approach ensures window object is only accessed in client-side
    if (typeof window !== 'undefined') {
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Invoice #${order._id.substring(0, 8).toUpperCase()}</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              <style>
                @media print {
                  body {
                    print-color-adjust: exact;
                    -webkit-print-color-adjust: exact;
                  }
                  @page {
                    size: A4;
                    margin: 16mm;
                  }
                  .no-print {
                    display: none;
                  }
                }
                body {
                  font-family: Arial, sans-serif;
                }
              </style>
            </head>
            <body class="bg-white p-8">
              <div class="max-w-4xl mx-auto bg-white p-8 shadow-none">
                <div class="no-print flex justify-end mb-4">
                  <button onclick="window.print()" class="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                    Print Invoice
                  </button>
                </div>
                
                <div class="flex justify-between mb-8">
                  <div>
                    <h1 class="text-2xl font-bold">GigaNXT</h1>
                    <p class="text-sm">Invoice #${order._id.substring(0, 8).toUpperCase()}</p>
                    <p class="text-sm">Date: ${formatDate(order.date)}</p>
                  </div>
                  <div class="text-right text-sm">
                    <p>GigaNXT E-Comm</p>
                    <p>123 Tech Street</p>
                    <p>Techville, TS 12345</p>
                    <p>support@giganxt.com</p>
                  </div>
                </div>
                
                <div class="border border-gray-200 p-4 mb-6">
                  <h2 class="text-sm font-bold mb-2">BILL TO:</h2>
                  <p class="text-sm">${order.address.fullName}</p>
                  <p class="text-sm">${order.address.area}</p>
                  <p class="text-sm">${order.address.city}, ${order.address.state}</p>
                  <p class="text-sm">Phone: ${order.address.phoneNumber}</p>
                </div>
                
                <h2 class="text-lg font-bold mb-4">ORDER DETAILS</h2>
                <table class="w-full border-collapse mb-6">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="text-left p-2 border border-gray-200 text-sm font-bold w-1/2">Product</th>
                      <th class="text-center p-2 border border-gray-200 text-sm font-bold w-1/12">Qty</th>
                      <th class="text-right p-2 border border-gray-200 text-sm font-bold w-1/6">Price</th>
                      <th class="text-right p-2 border border-gray-200 text-sm font-bold w-1/6">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${order.items.map((item, index) => `
                      <tr>
                        <td class="p-2 border border-gray-200 text-sm">${item.product.name}</td>
                        <td class="p-2 border border-gray-200 text-sm text-center">${item.quantity}</td>
                        <td class="p-2 border border-gray-200 text-sm text-right">${currency}${item.product.offerPrice || item.product.price}</td>
                        <td class="p-2 border border-gray-200 text-sm text-right">${currency}${(item.product.offerPrice || item.product.price) * item.quantity}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
                
                <div class="flex justify-end mb-8">
                  <div class="w-64">
                    <div class="flex justify-between border-t border-black pt-2">
                      <span class="font-bold">TOTAL:</span>
                      <span class="font-bold">${currency}${order.amount}</span>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-100 p-4 text-sm mb-8">
                  <p>Thank you for your purchase! If you have any questions about this invoice, please contact our customer support.</p>
                </div>
                
                <div class="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
                  <p>This is a computer-generated invoice and requires no signature.</p>
                </div>
              </div>
            </body>
          </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
      }
    }
  };

  return (
    <button
      onClick={printInvoice}
      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      View Invoice
    </button>
  );
};

export default InvoiceButton; 