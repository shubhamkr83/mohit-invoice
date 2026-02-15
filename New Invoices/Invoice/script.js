let entryCounter = 0;

// Number to words conversion
function numberToWords(num) {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  function convertLessThanThousand(n) {
    if (n === 0) return "";
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100)
      return tens[Math.floor(n / 10)] + (n % 10 > 0 ? " " + ones[n % 10] : "");
    return (
      ones[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 > 0 ? " " + convertLessThanThousand(n % 100) : "")
    );
  }

  if (num === 0) return "Zero Only";

  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const remainder = num % 1000;

  let result = "";

  if (crore > 0) result += convertLessThanThousand(crore) + " Crore ";
  if (lakh > 0) result += convertLessThanThousand(lakh) + " Lakh ";
  if (thousand > 0) result += convertLessThanThousand(thousand) + " Thousand ";
  if (remainder > 0) result += convertLessThanThousand(remainder);

  return result.trim() + " Only";
}

// Format number with Indian comma system
function formatIndianNumber(num) {
  const n = parseFloat(num).toFixed(2);
  const parts = n.split(".");
  const intPart = parts[0];
  const decPart = parts[1];

  let lastThree = intPart.substring(intPart.length - 3);
  const otherNumbers = intPart.substring(0, intPart.length - 3);

  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }

  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return formatted + "." + decPart;
}

// Format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
}

// Add transport entry
function addTransportEntry() {
  entryCounter++;
  const container = document.getElementById("transportEntriesContainer");
  const today = new Date().toISOString().split("T")[0];

  const entryHTML = `
                <div class="transport-entry" id="entry-${entryCounter}">
                    <div class="transport-entry-header">
                        <span class="transport-entry-title">Transportation Entry #${entryCounter}</span>
                        <button type="button" class="btn-remove-entry" onclick="removeTransportEntry(${entryCounter})">
                            ✕ Remove
                        </button>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Transport Date *</label>
                            <input type="date" class="transport-date" required value="${today}">
                        </div>
                        <div class="form-group">
                            <label>Docket Number *</label>
                            <input type="text" class="docket-number" required value="LP10297">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>From Location *</label>
                            <input type="text" class="from-location" required value="TAURU">
                        </div>
                        <div class="form-group">
                            <label>To Location *</label>
                            <input type="text" class="to-location" required value="GHAZIPUR 6 POINT">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Mode *</label>
                            <select class="transport-mode" required>
                                <option value="Road">Road</option>
                                <option value="Rail">Rail</option>
                                <option value="Air">Air</option>
                                <option value="Sea">Sea</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Vehicle Type *</label>
                            <input type="text" class="vehicle-type" required value="17FT">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Weight (Kg) *</label>
                            <input type="number" class="weight" required value="3000">
                        </div>
                        <div class="form-group">
                            <label>Vehicle Number *</label>
                            <input type="text" class="vehicle-number" required value="HR6367143">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Transport Charges (₹) *</label>
                            <input type="number" class="freight-amount" required value="75000" step="0.01">
                        </div>
                        <div class="form-group">
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" class="charges-checkbox" style="width: auto; margin: 0;">
                                <span>Enable Detailed Charges</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="charges-section" style="display: none; margin-top: 15px; padding: 15px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #2a5298;">
                        <div style="font-weight: 600; color: #1e3c72; margin-bottom: 10px; font-size: 13px;">Detailed Charges</div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Loading Charges (₹)</label>
                                <input type="number" class="charge-loading" value="0" step="0.01">
                            </div>
                            <div class="form-group">
                                <label>Union Charges (₹)</label>
                                <input type="number" class="charge-union" value="0" step="0.01">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>SLT Charges (₹)</label>
                                <input type="number" class="charge-slt" value="0" step="0.01">
                            </div>
                            <div class="form-group">
                                <label>Detention Charges (₹)</label>
                                <input type="number" class="charge-detention" value="0" step="0.01">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Labour Charges (₹)</label>
                                <input type="number" class="charge-labour" value="0" step="0.01">
                            </div>
                            <div class="form-group">
                                <label>Overload Charges (₹)</label>
                                <input type="number" class="charge-overload" value="0" step="0.01">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>ODC Charges (₹)</label>
                                <input type="number" class="charge-odc" value="0" step="0.01">
                            </div>
                            <div class="form-group">
                                <label>Halting Charges (₹)</label>
                                <input type="number" class="charge-halting" value="0" step="0.01">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Unloading Charges (₹)</label>
                                <input type="number" class="charge-unloading" value="0" step="0.01">
                            </div>
                            <div class="form-group">
                                <!-- Empty for alignment -->
                            </div>
                        </div>
                    </div>
                </div>
            `;

  container.insertAdjacentHTML("beforeend", entryHTML);

  // Add event listener for charges checkbox
  const newEntry = document.getElementById(`entry-${entryCounter}`);
  const chargesCheckbox = newEntry.querySelector(".charges-checkbox");
  const chargesSection = newEntry.querySelector(".charges-section");

  chargesCheckbox.addEventListener("change", function () {
    chargesSection.style.display = this.checked ? "block" : "none";
    generateInvoice();
  });

  generateInvoice();
}

// Remove transport entry
function removeTransportEntry(id) {
  const entry = document.getElementById(`entry-${id}`);
  if (entry) {
    entry.remove();
    generateInvoice();
  }
}

// Set today's date as default
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("invoiceDate").value = today;

  // Auto-uppercase Client Name
  const clientNameInput = document.getElementById("clientName");
  clientNameInput.addEventListener("input", function (e) {
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.toUpperCase();
    this.setSelectionRange(start, end);
  });

  // GST Type radio button event listeners
  const gstTypeRadios = document.querySelectorAll('input[name="gstType"]');
  gstTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      updateGSTDisplay();
      generateInvoice();
    });
  });

  // Add first transport entry by default
  addTransportEntry();
});

// Form submission handler - Combined CSV and Email
document
  .getElementById("invoiceForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Generate invoice and get the data
    const invoiceData = generateInvoice();

    // 1. Download CSV
    downloadCSV(invoiceData);

    // 2. Send Email
    await sendEmailWithInvoice();
  });

// Auto-update on input/change (change catches select, checkbox; input catches text fields)
document.getElementById("invoiceForm").addEventListener("input", function () {
  generateInvoice();
});
document.getElementById("invoiceForm").addEventListener("change", function () {
  generateInvoice();
});

// ========================================
// PRINT FUNCTIONALITY
// ========================================

function printInvoice() {
  // First generate/update the invoice to ensure latest data
  generateInvoice();

  // Small delay to ensure the invoice is fully rendered
  setTimeout(() => {
    window.print();
  }, 100);
}

// ========================================
// EMAIL FUNCTIONALITY
// ========================================

// Generate beautiful HTML email template
function generateHTMLEmailTemplate(data) {
  const {
    clientName,
    invoiceNumber,
    invoiceDate,
    invoiceType,
    docketNumber,
    refPoNo,
    clientAddress,
    clientStateName,
    clientStateCode,
    clientGST,
    transportDetails,
    openingKM,
    closingKM,
    totalDistance,
    notes,
    creditTerms,
    amountInWords,
    totalAmount,
    gstType,
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice ${invoiceNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #334155;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
        <tr>
            <td style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" style="max-width: 700px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #475569 0%, #64748b 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: 1px;">INVOICE</h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">Logpro Supply Chain Solutions Pvt. Ltd.</p>
                            <div style="margin-top: 15px; background: rgba(255, 255, 255, 0.15); padding: 6px 12px; border-radius: 16px; display: inline-block;">
                                <span style="color: #ffffff; font-size: 14px;">#${invoiceNumber}</span>
                            </div>
                        </td>
                    </tr>

                    <!-- Greeting -->
                    <tr>
                        <td style="padding: 30px 30px 20px 30px;">
                            <p style="margin: 0; font-size: 16px; color: #2c3e50;">Dear <strong>${clientName}</strong>,</p>
                            <p style="margin: 10px 0 0 0; font-size: 14px; color: #64748b; line-height: 1.6;">Please find below the invoice details for your reference:</p>
                        </td>
                    </tr>

                    <!-- Invoice Details Section -->
                    <tr>
                        <td style="padding: 20px 30px 0 30px;">
                            <h2 style="margin: 0 0 12px 0; font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; display: inline-block;">Invoice Details</h2>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="padding: 8px 0; font-size: 13px; color: #64748b; width: 40%;">Invoice Type:</td>
                                                <td style="padding: 8px 0; font-size: 13px; color: #2c3e50; font-weight: 600;">${invoiceType || "TAX INVOICE"}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; font-size: 13px; color: #64748b;">Invoice Number:</td>
                                                <td style="padding: 8px 0; font-size: 13px; color: #2c3e50; font-weight: 600;">${invoiceNumber}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; font-size: 13px; color: #64748b;">Invoice Date:</td>
                                                <td style="padding: 8px 0; font-size: 13px; color: #2c3e50; font-weight: 600;">${invoiceDate}</td>
                                            </tr>
                                            
                                            <tr>
                                                <td style="padding: 8px 0; font-size: 13px; color: #64748b;">Reference PO No:</td>
                                                <td style="padding: 8px 0; font-size: 13px; color: #2c3e50; font-weight: 600;">${refPoNo || "N/A"}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Bill To Section -->
                    <tr>
                        <td style="padding: 20px 30px 0 30px;">
                            <h2 style="margin: 0 0 12px 0; font-size: 13px; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #bfdbfe; padding-bottom: 6px; display: inline-block;">Bill To</h2>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; border-left: 3px solid #3b82f6; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0 0 8px 0; font-size: 15px; color: #1f2937; font-weight: 600;">${clientName}</p>
                                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #475569; line-height: 1.6;">${clientAddress.replace(/\n/g, "<br>")}</p>
                                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #475569;">State: ${clientStateName} (${clientStateCode})</p>
                                        <div style="margin-top: 12px; background: #f8fafc; padding: 6px 10px; border-radius: 4px; display: inline-block;">
                                            <span style="font-size: 12px; color: #64748b;"><strong>GSTIN:</strong> ${clientGST}</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Transportation Details -->
                    <tr>
                        <td style="padding: 20px 30px 0 30px;">
                            <h2 style="margin: 0 0 12px 0; font-size: 13px; color: #059669; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #a7f3d0; padding-bottom: 6px; display: inline-block;">Transportation Details</h2>
                            <div style="background-color: #f0fdf4; padding: 16px; border-radius: 8px; font-size: 13px; color: #374151; line-height: 1.6; white-space: pre-line; border-left: 3px solid #10b981;">
${transportDetails}
                            </div>
                        </td>
                    </tr>

                    <!-- Distance Details -->
                    <tr>
                        <td style="padding: 15px 30px 0 30px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #dbeafe; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);">
                                <tr>
                                    <td style="padding: 15px 20px;">
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="padding: 4px 0; font-size: 12px; color: #64748b; font-weight: 500; width: 33%; text-align: center;">
                                                    Opening KM: <span style="font-size: 13px; color: #1f2937; font-weight: 600;">${openingKM}</span>
                                                </td>
                                                <td style="padding: 4px 0; font-size: 12px; color: #64748b; font-weight: 500; width: 33%; text-align: center;">
                                                    Closing KM: <span style="font-size: 13px; color: #1f2937; font-weight: 600;">${closingKM}</span>
                                                </td>
                                                <td style="padding: 4px 0; font-size: 12px; color: #64748b; font-weight: 500; width: 33%; text-align: center;">
                                                    Total: <span style="font-size: 13px; color: #1f2937; font-weight: 600;">${totalDistance} km</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    ${
                      notes
                        ? `
                    <!-- Notes -->
                    <tr>
                        <td style="padding: 15px 30px 0 30px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 8px; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.1);">
                                <tr>
                                    <td style="padding: 15px 20px;">
                                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #92400e; font-weight: 600; text-transform: uppercase;">Notes</p>
                                        <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.6;">${notes}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    `
                        : ""
                    }

                    <!-- Financial Summary -->
                    <tr>
                        <td style="padding: 30px 30px 0 30px;">
                            <h2 style="margin: 0 0 12px 0; font-size: 13px; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #ddd6fe; padding-bottom: 6px; display: inline-block;">Financial Summary</h2>
                        </td>
                    </tr>

                    <!-- Total Amount -->
                    <tr>
                        <td style="padding: 0 30px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);">
                                <tr>
                                    <td style="padding: 20px 25px;">
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="font-size: 15px; color: #ffffff; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Total Amount:</td>
                                                <td style="font-size: 18px; color: #ffffff; font-weight: 700; text-align: right;">₹${totalAmount != null && totalAmount !== undefined ? formatIndianNumber(totalAmount) : "0.00"}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                   
                    <!-- Amount in Words -->
                    <tr>
                        <td style="padding: 15px 30px;">
                            <div style="text-align: center; padding: 12px 16px; background-color: #f8fafc; font-size: 12px; color: #64748b; font-style: italic; border-radius: 6px; border: 1px solid #e2e8f0;">
                                Amount in words: <strong style="color: #374151;">${amountInWords}</strong>
                            </div>
                        </td>
                    </tr>

                    <!-- Payment Terms -->
                    <tr>
                        <td style="padding: 15px 30px 0 30px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fef2f2; border-left: 3px solid #ef4444; border-radius: 8px; box-shadow: 0 2px 8px rgba(239, 68, 68, 0.1);">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h2 style="margin: 0 0 10px 0; font-size: 13px; color: #dc2626; text-transform: uppercase; letter-spacing: 0.5px;">Payment Terms</h2>
                                        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; line-height: 2;">
                                            <li>1. Payment should be made by RTGS/NEFT or Cheque Only.</li>
                                            <li>2. If Payment not received within ${creditTerms} days, interest @ 24% P.A. will be charged.</li>
                                            <li>3. GST payable under Reverse Charge (RCM) by ${clientName} @5% on taxable value of Rs ${formatIndianNumber(totalAmount * 0.05)}.</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Bank Details -->
                    <tr>
                        <td style="padding: 20px 30px 0 30px;">
                            <h2 style="margin: 0 0 12px 0; font-size: 13px; color: #0891b2; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #cffafe; padding-bottom: 6px; display: inline-block;">Bank Details</h2>
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; border-left: 3px solid #0891b2; box-shadow: 0 2px 8px rgba(8, 145, 178, 0.1);">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                            <tr>
                                                <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 35%;">Bank Name:</td>
                                                <td style="padding: 6px 0; font-size: 13px; color: #2c3e50; font-weight: 600;">Axis Bank Ltd.</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Account Name:</td>
                                                <td style="padding: 6px 0; font-size: 13px; color: #2c3e50; font-weight: 600;">Logpro Supply Chain Solutions Pvt. Ltd</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Account Number:</td>
                                                <td style="padding: 6px 0; font-size: 13px; color: #2c3e50; font-weight: 600;">924020023025269</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">IFSC Code:</td>
                                                <td style="padding: 6px 0; font-size: 13px; color: #2c3e50; font-weight: 600;">UTIB0000131</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Branch:</td>
                                                <td style="padding: 6px 0; font-size: 13px; color: #2c3e50; font-weight: 600;">DLF Gurgaon, Haryana, Gurgaon - 122009</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Company Details -->
                    <tr>
                        <td style="padding: 20px 30px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <p style="margin: 0 0 8px 0; font-size: 15px; color: #1f2937; font-weight: 600;">Logpro Supply Chain Solutions Pvt. Ltd.</p>
                                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b;">B-9, Sardar Nagar, GT Road, Delhi-110009, State Code: 07</p>
                                        <p style="margin: 0; font-size: 12px; color: #64748b;">GSTIN: 07AAECL2012L1ZO | PAN: DL2020PTC363325</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0; background-color: #f8fafc; border-radius: 6px; padding: 16px;">
                                <p style="margin: 0 0 8px 0; font-size: 14px; color: #374151; font-weight: 500;">Thank you for your business!</p>
                                <p style="margin: 0; font-size: 13px; color: #64748b;">Please let us know if you have any questions.</p>
                                <p style="margin: 15px 0 0 0; font-size: 12px; color: #64748b; font-style: italic;">Authorized Signatory<br>Logpro Supply Chain Solutions Pvt. Ltd.</p>
                            </div>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

async function sendEmailWithInvoice() {
  // Hardcoded recipient email
  const recipientEmail = "mohit.logpro@gmail.com";

  // Validate required form fields
  const invoiceNumber = document.getElementById("invoiceNumber").value;
  const clientName = document.getElementById("clientName").value;

  if (!invoiceNumber || invoiceNumber.trim() === "") {
    alert("❌ Please fill in the Invoice Number before sending email.");
    return;
  }

  if (!clientName || clientName.trim() === "") {
    alert("❌ Please fill in the Client Name before sending email.");
    return;
  }

  // Get form data with null checks
  const invoiceDate = document.getElementById("invoiceDate")?.value || "";
  const invoiceType =
    document.querySelector('input[name="invoiceType"]:checked')?.value || "";
  const refPoNo = document.getElementById("refPoNo")?.value?.trim() || "";
  const clientAddress = document.getElementById("clientAddress")?.value || "";
  const clientStateCode =
    document.getElementById("clientStateCode")?.value || "";
  const clientStateName =
    document.getElementById("clientStateName")?.value || "";
  const clientGST = document.getElementById("clientGST")?.value || "";
  const openingKM = document.getElementById("openingKM")?.value || "";
  const closingKM = document.getElementById("closingKM")?.value || "";
  const notes = document.getElementById("notes")?.value || "";
  const creditTerms = document.getElementById("creditTerms")?.value || "";
  const gstType =
    document.querySelector('input[name="gstType"]:checked')?.value ||
    "cgst_sgst";

  // Calculate total distance from opening and closing KM
  const openingKMNum = parseFloat(openingKM) || 0;
  const closingKMNum = parseFloat(closingKM) || 0;
  const totalDistance =
    closingKMNum > openingKMNum
      ? (closingKMNum - openingKMNum).toString()
      : "0";

  // Get transportation entries
  const entries = document.querySelectorAll(".transport-entry");
  const docketNumber =
    entries.length > 0
      ? entries[0].querySelector(".docket-number")?.value || ""
      : "";
  let transportDetails = "";

  entries.forEach((entry, index) => {
    const date = entry.querySelector(".transport-date")?.value || "";
    const docket = entry.querySelector(".docket-number")?.value || "";
    const from = entry.querySelector(".from-location")?.value || "";
    const to = entry.querySelector(".to-location")?.value || "";
    const mode = entry.querySelector(".transport-mode")?.value || "";
    const vehicleType = entry.querySelector(".vehicle-type")?.value || "";
    const weight = entry.querySelector(".weight")?.value || "";
    const vehicle = entry.querySelector(".vehicle-number")?.value || "";
    const freight =
      parseFloat(entry.querySelector(".freight-amount")?.value) || 0;
    const chargesEnabled = entry.querySelector(".charges-checkbox")?.checked;

    const loading =
      parseFloat(entry.querySelector(".charge-loading")?.value) || 0;
    const union = parseFloat(entry.querySelector(".charge-union")?.value) || 0;
    const slt = parseFloat(entry.querySelector(".charge-slt")?.value) || 0;
    const detention =
      parseFloat(entry.querySelector(".charge-detention")?.value) || 0;
    const labour =
      parseFloat(entry.querySelector(".charge-labour")?.value) || 0;
    const overload =
      parseFloat(entry.querySelector(".charge-overload")?.value) || 0;
    const odc = parseFloat(entry.querySelector(".charge-odc")?.value) || 0;
    const halting =
      parseFloat(entry.querySelector(".charge-halting")?.value) || 0;
    const unloading =
      parseFloat(entry.querySelector(".charge-unloading")?.value) || 0;

    let lineTotal = freight;
    if (chargesEnabled) {
      lineTotal +=
        loading +
        union +
        slt +
        detention +
        labour +
        overload +
        odc +
        halting +
        unloading;
    }

    let chargesLines = "";
    if (chargesEnabled) {
      chargesLines = `• Transport Charges: ₹${formatIndianNumber(freight)}
`;
      const chargeItems = [
        ["Loading Charges", loading],
        ["Union Charges", union],
        ["SLT Charges", slt],
        ["Detention Charges", detention],
        ["Labour Charges", labour],
        ["Overload Charges", overload],
        ["ODC Charges", odc],
        ["Halting Charges", halting],
        ["Unloading Charges", unloading],
      ];
      chargeItems.forEach(([label, val]) => {
        if (val > 0)
          chargesLines += `• ${label}: ₹${formatIndianNumber(val)}
`;
      });
    }
    chargesLines += `• Total Taxable Value: ₹${formatIndianNumber(lineTotal)}
`;
    if (!chargesEnabled) {
      chargesLines = `• Total Taxable Value: ₹${formatIndianNumber(lineTotal)}
`;
    }

    transportDetails += `
Entry ${index + 1}:
• Date: ${date}
• Docket Number: ${docket}
• Route: ${from} to ${to}
• Transport Mode: ${mode}
• Vehicle Type: ${vehicleType}
• Weight: ${weight} Kg
• Vehicle Number: ${vehicle}
${chargesLines}
`;
  });

  // Calculate totals
  let grandTotal = 0;
  entries.forEach((entry) => {
    const freight =
      parseFloat(entry.querySelector(".freight-amount")?.value) || 0;
    const chargesEnabled = entry.querySelector(".charges-checkbox")?.checked;

    if (chargesEnabled) {
      const loading =
        parseFloat(entry.querySelector(".charge-loading")?.value) || 0;
      const union =
        parseFloat(entry.querySelector(".charge-union")?.value) || 0;
      const slt = parseFloat(entry.querySelector(".charge-slt")?.value) || 0;
      const detention =
        parseFloat(entry.querySelector(".charge-detention")?.value) || 0;
      const labour =
        parseFloat(entry.querySelector(".charge-labour")?.value) || 0;
      const overload =
        parseFloat(entry.querySelector(".charge-overload")?.value) || 0;
      const odc = parseFloat(entry.querySelector(".charge-odc")?.value) || 0;
      const halting =
        parseFloat(entry.querySelector(".charge-halting")?.value) || 0;
      const unloading =
        parseFloat(entry.querySelector(".charge-unloading")?.value) || 0;

      grandTotal +=
        freight +
        loading +
        union +
        slt +
        detention +
        labour +
        overload +
        odc +
        halting +
        unloading;
    } else {
      grandTotal += freight;
    }
  });

  // Calculate GST amounts
  let grandTotalWithGST = grandTotal;
  if (gstType === "igst") {
    const igstAmount = grandTotal * 0.18;
    grandTotalWithGST = grandTotal + igstAmount;
  } else {
    const cgstAmount = grandTotal * 0.09;
    const sgstAmount = grandTotal * 0.09;
    grandTotalWithGST = grandTotal + cgstAmount + sgstAmount;
  }

  // Create email subject
  const subject = `Invoice ${invoiceNumber} - Logpro Supply Chain Solutions - ${invoiceDate}`;

  // Format date for email (e.g. 13-Feb-2026)
  const formattedInvoiceDate = invoiceDate
    ? formatDate(invoiceDate)
    : invoiceDate;

  // Generate HTML email body
  const emailBodyHTML = generateHTMLEmailTemplate({
    clientName,
    invoiceNumber,
    invoiceDate: formattedInvoiceDate,
    invoiceType: invoiceType ? invoiceType + " INVOICE" : "TAX INVOICE",
    docketNumber:
      docketNumber || (entries.length > 0 ? "See entries below" : "N/A"),
    refPoNo: refPoNo?.trim() ? refPoNo : "N/A",
    clientAddress,
    clientStateName,
    clientStateCode,
    clientGST,
    transportDetails,
    openingKM,
    closingKM,
    totalDistance,
    notes,
    creditTerms,
    amountInWords: numberToWords(Math.floor(grandTotal)),
    totalAmount: grandTotal,
    gstType,
  });

  // Send email via backend API
  const API_URL = "http://localhost:3001/api/send-email";

  // Show loading indicator
  const sendButton = document.querySelector(".btn-generate"); // Updated to use the main button
  const originalButtonText = sendButton.innerHTML;
  sendButton.disabled = true;
  sendButton.innerHTML = "📧 Sending CSV + Email...";
  sendButton.style.opacity = "0.6";
  sendButton.style.cursor = "not-allowed";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipientEmail: recipientEmail,
        subject: subject,
        emailBody: emailBodyHTML,
        senderName: "Logpro Supply Chain Solutions Pvt. Ltd.",
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert(
        `✅ Email sent successfully!\n\nRecipient: ${recipientEmail}\nSubject: ${subject}\n\nThe invoice has been delivered to the recipient's inbox.`,
      );
    } else {
      throw new Error(result.error || "Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error);

    // Check if backend is running
    if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("NetworkError")
    ) {
      alert(
        "❌ Cannot connect to email server!\n\nPlease ensure:\n1. Backend server is running (npm start in backend folder)\n2. Server is accessible at http://localhost:3000\n\nError: " +
          error.message,
      );
    } else {
      alert(
        "❌ Failed to send email!\n\nError: " +
          error.message +
          "\n\nPlease try again or contact support.",
      );
    }
  } finally {
    // Restore button state
    sendButton.disabled = false;
    sendButton.innerHTML = originalButtonText;
    sendButton.style.opacity = "1";
    sendButton.style.cursor = "pointer";
  }
}

// ========================================
// CSV GENERATION AND DOWNLOAD
// ========================================

function generateCSV(invoiceData) {
  const csvRows = [];

  // ============================================================
  // HEADER SECTION - Company Branding
  // ============================================================
  csvRows.push([
    "=======================================================================",
  ]);
  csvRows.push(["", "LOGPRO SUPPLY CHAIN SOLUTIONS PVT. LTD."]);
  csvRows.push(["", "INVOICE EXPORT"]);
  csvRows.push([
    "=======================================================================",
  ]);
  csvRows.push([
    "Generated:",
    new Date().toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
    }),
  ]);
  csvRows.push([]);

  // ============================================================
  // INVOICE INFORMATION
  // ============================================================
  csvRows.push([
    "-----------------------------------------------------------------------",
  ]);
  csvRows.push(["|", "INVOICE DETAILS", "", "", "", ""]);
  csvRows.push([
    "-----------------------------------------------------------------------",
  ]);
  const csvDocketNumber =
    invoiceData.docketNumber || invoiceData.transports?.[0]?.docket || "N/A";
  csvRows.push(["|", "Invoice Type:", invoiceData.invoiceType + " INVOICE"]);
  csvRows.push(["|", "Invoice Number:", invoiceData.invoiceNumber]);
  csvRows.push([
    "|",
    "Invoice Date:",
    formatDateForCSV(invoiceData.invoiceDate),
  ]);
  csvRows.push(["|", "Docket Number:", csvDocketNumber]);
  csvRows.push(["|", "Ref PO Number:", invoiceData.refPoNo || "N/A"]);
  csvRows.push([
    "-----------------------------------------------------------------------",
  ]);
  csvRows.push([]);

  // ============================================================
  // CLIENT INFORMATION
  // ============================================================
  csvRows.push([
    "-----------------------------------------------------------------------",
  ]);
  csvRows.push(["|", "CLIENT DETAILS", "", "", "", ""]);
  csvRows.push([
    "-----------------------------------------------------------------------",
  ]);
  csvRows.push(["|", "Client Name:", invoiceData.clientName]);
  csvRows.push([
    "|",
    "Address:",
    invoiceData.clientAddress.replace(/\n/g, ", "),
  ]);
  csvRows.push([
    "|",
    "State:",
    invoiceData.clientStateName +
      " (Code: " +
      invoiceData.clientStateCode +
      ")",
  ]);
  csvRows.push(["|", "GST IN Number:", invoiceData.clientGST]);
  csvRows.push([
    "-----------------------------------------------------------------------",
  ]);
  csvRows.push([]);

  // ============================================================
  // DISTANCE TRACKING (if applicable)
  // ============================================================
  if (invoiceData.openingKM > 0 || invoiceData.closingKM > 0) {
    csvRows.push([
      "-----------------------------------------------------------------------",
    ]);
    csvRows.push(["|", "DISTANCE DETAILS", "", "", "", ""]);
    csvRows.push([
      "-----------------------------------------------------------------------",
    ]);
    csvRows.push([
      "|",
      "Opening KM:",
      formatIndianNumber(invoiceData.openingKM) + " KM",
    ]);
    csvRows.push([
      "|",
      "Closing KM:",
      formatIndianNumber(invoiceData.closingKM) + " KM",
    ]);
    csvRows.push([
      "|",
      "Total Distance Covered:",
      formatIndianNumber(invoiceData.totalDistance) + " KM",
    ]);
    csvRows.push([
      "-----------------------------------------------------------------------",
    ]);
    csvRows.push([]);
  }

  // ============================================================
  // ADDITIONAL NOTES (if provided)
  // ============================================================
  if (invoiceData.notes && invoiceData.notes.trim()) {
    csvRows.push([
      "-----------------------------------------------------------------------",
    ]);
    csvRows.push(["NOTES:", invoiceData.notes.replace(/\n/g, " ")]);
    csvRows.push([
      "-----------------------------------------------------------------------",
    ]);
    csvRows.push([]);
  }

  // ============================================================
  // TRANSPORTATION DETAILS TABLE
  // ============================================================
  csvRows.push([
    "=======================================================================",
  ]);
  csvRows.push(["", "TRANSPORTATION DETAILS", "", "", "", ""]);
  csvRows.push([
    "=======================================================================",
  ]);
  csvRows.push([]);

  // Determine which charge columns to include (use parseFloat to avoid string "0" being truthy)
  const chargeColumns = [];
  const hasAnyCharges = invoiceData.transports.some(
    (t) =>
      parseFloat(t.loadingCharges) > 0 ||
      parseFloat(t.unionCharges) > 0 ||
      parseFloat(t.sltCharges) > 0 ||
      parseFloat(t.detentionCharges) > 0 ||
      parseFloat(t.labourCharges) > 0 ||
      parseFloat(t.overloadCharges) > 0 ||
      parseFloat(t.odcCharges) > 0 ||
      parseFloat(t.haltingCharges) > 0 ||
      parseFloat(t.unloadingCharges) > 0,
  );

  if (hasAnyCharges) {
    if (invoiceData.transports.some((t) => parseFloat(t.loadingCharges) > 0))
      chargeColumns.push("Loading");
    if (invoiceData.transports.some((t) => parseFloat(t.unionCharges) > 0))
      chargeColumns.push("Union");
    if (invoiceData.transports.some((t) => parseFloat(t.sltCharges) > 0))
      chargeColumns.push("SLT");
    if (invoiceData.transports.some((t) => parseFloat(t.detentionCharges) > 0))
      chargeColumns.push("Detention");
    if (invoiceData.transports.some((t) => parseFloat(t.labourCharges) > 0))
      chargeColumns.push("Labour");
    if (invoiceData.transports.some((t) => parseFloat(t.overloadCharges) > 0))
      chargeColumns.push("Overload");
    if (invoiceData.transports.some((t) => parseFloat(t.odcCharges) > 0))
      chargeColumns.push("ODC");
    if (invoiceData.transports.some((t) => parseFloat(t.haltingCharges) > 0))
      chargeColumns.push("Halting");
    if (invoiceData.transports.some((t) => parseFloat(t.unloadingCharges) > 0))
      chargeColumns.push("Unloading");
  }

  // Transportation table headers (match invoice: Other Charges or charge columns, Total Taxable Value)
  const transportHeaders = [
    "Description",
    "Date",
    "Docket",
    "From",
    "To",
    "Mode",
    "Vehicle Type",
    "Weight (Kg)",
    "Vehicle No",
  ];

  if (chargeColumns.length > 0) {
    chargeColumns.forEach((charge) => transportHeaders.push(charge + " (Rs.)"));
  } else {
    transportHeaders.push("Other Charges");
  }

  transportHeaders.push("Total Taxable Value");
  csvRows.push(transportHeaders);

  // Separator line
  csvRows.push(new Array(transportHeaders.length).fill("---------------"));

  // Transportation entries
  let grandTotal = 0;
  const transportCount = invoiceData.transports.length;
  invoiceData.transports.forEach((transport, index) => {
    let lineTotal = parseFloat(transport.freight) || 0;
    const description =
      transportCount > 1
        ? `Transportation Charges #${index + 1}`
        : "Transportation Charges";
    const row = [
      description,
      formatDateForCSV(transport.date),
      transport.docket,
      transport.from,
      transport.to,
      transport.mode,
      transport.vehicleType,
      formatIndianNumber(parseFloat(transport.weight)),
      transport.vehicle,
    ];

    // Add Other Charges or charge values (invoice does not show Freight separately - it's in Total Taxable Value)
    if (hasAnyCharges) {
      const chargeMap = {
        Loading: transport.loadingCharges,
        Union: transport.unionCharges,
        SLT: transport.sltCharges,
        Detention: transport.detentionCharges,
        Labour: transport.labourCharges,
        Overload: transport.overloadCharges,
        ODC: transport.odcCharges,
        Halting: transport.haltingCharges,
        Unloading: transport.unloadingCharges,
      };

      chargeColumns.forEach((charge) => {
        const val = parseFloat(chargeMap[charge]) || 0;
        row.push(val > 0 ? formatIndianNumber(val) : "-");
        lineTotal += val;
      });
    } else {
      row.push("-");
    }

    row.push(formatIndianNumber(lineTotal));
    grandTotal += lineTotal;
    csvRows.push(row);
  });

  // Separator before totals
  csvRows.push(new Array(transportHeaders.length).fill("---------------"));

  // Grand total row
  const totalRow = new Array(transportHeaders.length).fill("");
  totalRow[totalRow.length - 2] = "TOTAL:";
  totalRow[totalRow.length - 1] = "Rs. " + formatIndianNumber(grandTotal);
  csvRows.push(totalRow);

  csvRows.push([]);
  csvRows.push([]);

  csvRows.push([
    "=======================================================================",
  ]);
  csvRows.push;
  const csvTotal = invoiceData.grandTotalWithGST ?? invoiceData.totalAmount;
  csvRows.push(["Amount in Words:", numberToWords(Math.floor(csvTotal))]);
  csvRows.push([
    "=======================================================================",
  ]);

  // ============================================================
  // PAYMENT SUMMARY
  // ============================================================
  csvRows.push([]);
  csvRows.push([
    "=======================================================================",
  ]);
  csvRows.push(["", "PAYMENT TERMS", "", "", "", ""]);
  csvRows.push([
    "=======================================================================",
  ]);
  csvRows.push(["1. Payment should be made by RTGS/NEFT or Cheque Only."]);
  csvRows.push([
    "2. If Payment not received within",
    invoiceData.creditTerms + " Days",
    "interest @ 24% P.A. will be charged.",
  ]);
  csvRows.push([
    "3. GST payable under Reverse Charge (RCM) by " +
      invoiceData.clientName +
      " @5% on taxable value of Rs " +
      formatIndianNumber(invoiceData.totalAmount * 0.05) +
      "/-.",
  ]);
  csvRows.push([]);

  csvRows.push([]);
  csvRows.push([
    "=======================================================================",
  ]);
  csvRows.push(["", "Thank you for your business!", "", "", "", ""]);
  csvRows.push([
    "=======================================================================",
  ]);

  // Convert to CSV string with UTF-8 BOM for Excel compatibility
  const csvString = csvRows
    .map((row) =>
      row
        .map((cell) => {
          // Escape quotes and wrap in quotes if contains comma, quote, or newline
          const cellStr = String(cell || "");
          if (
            cellStr.includes(",") ||
            cellStr.includes('"') ||
            cellStr.includes("\n")
          ) {
            return '"' + cellStr.replace(/"/g, '""') + '"';
          }
          return cellStr;
        })
        .join(","),
    )
    .join("\n");

  // Add BOM for better Excel UTF-8 support
  return "\ufeff" + csvString;
}

// Helper function to format date nicely for CSV
function formatDateForCSV(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function downloadCSV(invoiceData) {
  const csv = generateCSV(invoiceData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  // Create filename with invoice number and date
  const filename = `Invoice_${invoiceData.invoiceNumber.replace(/\//g, "-")}_${invoiceData.invoiceDate}.csv`;

  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Show success message
  alert(`Invoice CSV downloaded successfully!\n\nFilename: ${filename}`);
}

function generateInvoice() {
  console.log("generateInvoice() called");

  // Get form values
  const invoiceNumber = document.getElementById("invoiceNumber").value;
  const invoiceDate = document.getElementById("invoiceDate").value;
  const docketNumber = document.getElementById("docketNumber")?.value || "";
  const refPoNo = document.getElementById("refPoNo").value;

  const clientName = document.getElementById("clientName").value;
  const clientAddress = document.getElementById("clientAddress").value;
  const clientStateCode = document.getElementById("clientStateCode").value;
  const clientStateName = document.getElementById("clientStateName").value;
  const clientGST = document.getElementById("clientGST").value;
  const notes = document.getElementById("notes").value;
  const creditTerms = document.getElementById("creditTerms").value;

  // Get invoice type
  const invoiceType = document.querySelector(
    'input[name="invoiceType"]:checked',
  ).value;

  // Update invoice header info
  document.getElementById("displayInvoiceTitle").textContent =
    invoiceType + " INVOICE";
  document.getElementById("displayInvoiceNumber2").textContent = invoiceNumber;
  document.getElementById("displayInvoiceDate").textContent =
    formatDate(invoiceDate);
  document.getElementById("displayRefPoNo").textContent =
    refPoNo.trim() !== "" ? refPoNo : "NA";
  // displayDocketNumber removed - now shown in table column

  document.getElementById("displayClientName").textContent = clientName;
  document.getElementById("displayClientAddress").textContent = clientAddress;
  document.getElementById("displayClientStateCode").textContent =
    clientStateCode;
  document.getElementById("displayClientStateName").textContent =
    clientStateName;
  document.getElementById("displayClientGST").textContent = clientGST;

  // Get all transport entries
  const entries = document.querySelectorAll(".transport-entry");
  console.log("Found transport entries:", entries.length);
  const tableBody = document.getElementById("transportTableBody");
  tableBody.innerHTML = "";

  let grandTotal = 0;

  // Get Opening KM and Closing KM from standalone fields
  const openingKM = parseFloat(document.getElementById("openingKM").value) || 0;
  const closingKM = parseFloat(document.getElementById("closingKM").value) || 0;
  const totalDistance = closingKM - openingKM;

  // First pass: Detect which charge columns have values across all entries
  const chargeTypes = {
    Loading: { key: "loading", total: 0, hasValue: false },
    Union: { key: "union", total: 0, hasValue: false },
    SLT: { key: "slt", total: 0, hasValue: false },
    Detention: { key: "detention", total: 0, hasValue: false },
    Labour: { key: "labour", total: 0, hasValue: false },
    Overload: { key: "overload", total: 0, hasValue: false },
    ODC: { key: "odc", total: 0, hasValue: false },
    Halting: { key: "halting", total: 0, hasValue: false },
    Unloading: { key: "unloading", total: 0, hasValue: false },
  };

  // Scan all entries to detect which charges are used
  const entryData = [];
  entries.forEach((entry, index) => {
    const data = {
      transportDate: entry.querySelector(".transport-date").value,
      docketNumber: entry.querySelector(".docket-number")
        ? entry.querySelector(".docket-number").value
        : "",
      fromLocation: entry.querySelector(".from-location").value,
      toLocation: entry.querySelector(".to-location").value,
      transportMode: entry.querySelector(".transport-mode").value,
      vehicleType: entry.querySelector(".vehicle-type").value,
      weight: parseFloat(entry.querySelector(".weight").value) || 0,
      vehicleNumber: entry.querySelector(".vehicle-number").value,
      charges: {},
    };

    const chargesEnabled = entry.querySelector(".charges-checkbox")?.checked;

    // Get freight amount (always part of calculation, not a separate column)
    const freightAmount =
      parseFloat(entry.querySelector(".freight-amount").value) || 0;
    data.freightAmount = freightAmount;

    if (chargesEnabled) {
      // Get all charge values
      const loading =
        parseFloat(entry.querySelector(".charge-loading")?.value) || 0;
      const union =
        parseFloat(entry.querySelector(".charge-union")?.value) || 0;
      const slt = parseFloat(entry.querySelector(".charge-slt")?.value) || 0;
      const detention =
        parseFloat(entry.querySelector(".charge-detention")?.value) || 0;
      const labour =
        parseFloat(entry.querySelector(".charge-labour")?.value) || 0;
      const overload =
        parseFloat(entry.querySelector(".charge-overload")?.value) || 0;
      const odc = parseFloat(entry.querySelector(".charge-odc")?.value) || 0;
      const halting =
        parseFloat(entry.querySelector(".charge-halting")?.value) || 0;
      const unloading =
        parseFloat(entry.querySelector(".charge-unloading")?.value) || 0;

      data.charges["loading"] = loading;
      data.charges["union"] = union;
      data.charges["slt"] = slt;
      data.charges["detention"] = detention;
      data.charges["labour"] = labour;
      data.charges["overload"] = overload;
      data.charges["odc"] = odc;
      data.charges["halting"] = halting;
      data.charges["unloading"] = unloading;

      // Mark which charges have values
      if (loading > 0) chargeTypes["Loading"].hasValue = true;
      if (union > 0) chargeTypes["Union"].hasValue = true;
      if (slt > 0) chargeTypes["SLT"].hasValue = true;
      if (detention > 0) chargeTypes["Detention"].hasValue = true;
      if (labour > 0) chargeTypes["Labour"].hasValue = true;
      if (overload > 0) chargeTypes["Overload"].hasValue = true;
      if (odc > 0) chargeTypes["ODC"].hasValue = true;
      if (halting > 0) chargeTypes["Halting"].hasValue = true;
      if (unloading > 0) chargeTypes["Unloading"].hasValue = true;

      // Add to totals
      chargeTypes["Loading"].total += loading;
      chargeTypes["Union"].total += union;
      chargeTypes["SLT"].total += slt;
      chargeTypes["Detention"].total += detention;
      chargeTypes["Labour"].total += labour;
      chargeTypes["Overload"].total += overload;
      chargeTypes["ODC"].total += odc;
      chargeTypes["Halting"].total += halting;
      chargeTypes["Unloading"].total += unloading;
    }

    // Calculate line total
    let lineTotal = freightAmount;
    if (chargesEnabled) {
      lineTotal +=
        (data.charges["loading"] || 0) +
        (data.charges["union"] || 0) +
        (data.charges["slt"] || 0) +
        (data.charges["detention"] || 0) +
        (data.charges["labour"] || 0) +
        (data.charges["overload"] || 0) +
        (data.charges["odc"] || 0) +
        (data.charges["halting"] || 0) +
        (data.charges["unloading"] || 0);
    }

    data.lineTotal = lineTotal;
    grandTotal += lineTotal;
    entryData.push(data);
  });

  // Build active charge columns list
  const activeChargeColumns = [];
  Object.keys(chargeTypes).forEach((chargeName) => {
    if (chargeTypes[chargeName].hasValue) {
      activeChargeColumns.push(chargeName);
    }
  });

  // Update table header dynamically (no GST columns)
  const table = document.querySelector(".transport-table");
  const thead = table.querySelector("thead");
  let headerHTML = "<tr>";
  headerHTML += "<th>Description</th>";
  headerHTML += "<th>Docket No</th>";
  headerHTML += "<th>Date</th>";
  headerHTML += "<th>From</th>";
  headerHTML += "<th>To</th>";
  headerHTML += "<th>Mode</th>";
  headerHTML += "<th>Vehicle Type</th>";
  headerHTML += "<th>Vehicle No</th>";
  headerHTML += "<th>Weight (Kg)</th>";

  // Add dynamic charge columns
  if (activeChargeColumns.length > 0) {
    activeChargeColumns.forEach((chargeName) => {
      headerHTML += `<th>${chargeName} Charges</th>`;
    });
  } else {
    headerHTML += "<th>Other Charges</th>";
  }

  headerHTML += "<th>Total Taxable Value</th>";
  headerHTML += "</tr>";
  thead.innerHTML = headerHTML;

  // Build table rows with dynamic columns (no GST columns)
  entryData.forEach((data, index) => {
    let row = "<tr>";
    row += `<td>Transportation Charges ${entries.length > 1 ? "#" + (index + 1) : ""}</td>`;
    row += `<td>${data.docketNumber}</td>`;
    row += `<td>${formatDate(data.transportDate)}</td>`;
    row += `<td>${data.fromLocation}</td>`;
    row += `<td>${data.toLocation}</td>`;
    row += `<td>${data.transportMode}</td>`;
    row += `<td>${data.vehicleType}</td>`;
    row += `<td>${data.vehicleNumber}</td>`;
    row += `<td>${formatIndianNumber(data.weight)}</td>`;

    // Add dynamic charge column values
    if (activeChargeColumns.length > 0) {
      activeChargeColumns.forEach((chargeName) => {
        const chargeKey = chargeTypes[chargeName].key;
        const value = data.charges[chargeKey] || 0;
        row += `<td class="amount-cell">${value > 0 ? formatIndianNumber(value) : "-"}</td>`;
      });
    } else {
      // If no charges, show placeholder
      row += '<td class="amount-cell">-</td>';
    }

    row += `<td class="amount-cell">${formatIndianNumber(data.lineTotal)}</td>`;
    row += "</tr>";

    tableBody.insertAdjacentHTML("beforeend", row);
  });

  // Update footer with dynamic totals and GST rows
  const tfoot = table.querySelector("tfoot");
  let footerHTML = "";

  // Calculate the number of columns for proper colspan
  let totalColumns = 10; // base columns (added Docket No column)
  if (activeChargeColumns.length > 0) {
    totalColumns += activeChargeColumns.length;
  }

  // Single Total row (with GST included)
  footerHTML += '<tr class="total-row">';
  const chargeColspan =
    activeChargeColumns.length > 0 ? activeChargeColumns.length : 1;
  footerHTML += `<td colspan="9" style="text-align: right; font-weight: bold; padding: 8px;">Total</td>`;
  if (activeChargeColumns.length > 0) {
    activeChargeColumns.forEach(() => {
      footerHTML +=
        '<td class="amount-cell" style="font-weight: bold; padding: 8px;">-</td>';
    });
  } else {
    footerHTML += `<td class="amount-cell" style="font-weight: bold; padding: 8px;" id="totalCharges">-</td>`;
  }
  footerHTML += `<td class="amount-cell" style="font-weight: bold; padding: 8px;" id="displayTotalAmount">${formatIndianNumber(grandTotal)}</td>`;
  footerHTML += "</tr>";

  tfoot.innerHTML = footerHTML;

  // Update distance summary
  document.getElementById("displayOpeningKM").textContent =
    formatIndianNumber(openingKM) + " KM";
  document.getElementById("displayClosingKM").textContent =
    formatIndianNumber(closingKM) + " KM";
  document.getElementById("displayTotalDistance").textContent =
    formatIndianNumber(totalDistance) + " KM";

  // Show/hide distance summary section based on values
  const distanceSummarySection = document.getElementById(
    "distanceSummarySection",
  );
  if (openingKM > 0 || closingKM > 0) {
    distanceSummarySection.style.display = "flex";
  } else {
    distanceSummarySection.style.display = "none";
  }

  // Update notes section
  const notesSection = document.getElementById("notesSection");
  if (notes && notes.trim() !== "") {
    document.getElementById("displayNotes").textContent = notes;
    notesSection.style.display = "flex";
  } else {
    notesSection.style.display = "none";
  }

  // Update amount in words based on the Total (without GST)
  const amountInWords = numberToWords(Math.floor(grandTotal));
  document.getElementById("displayAmountWords").textContent = amountInWords;

  // Update Payment Terms - Credit Days and 5% GST RCM value
  document.getElementById("displayCreditDays").textContent =
    creditTerms || "15";
  document.getElementById("displayRCMClientName").textContent = clientName;
  const gstRCMValue = grandTotal * 0.05; // 5% of taxable value
  document.getElementById("displayCreditTerms").textContent =
    formatIndianNumber(gstRCMValue);

  const firstDocket =
    entries.length > 0
      ? entries[0].querySelector(".docket-number")?.value || ""
      : "";
  const invoicePayload = {
    timestamp: new Date().toISOString(),
    invoiceType,
    invoiceNumber,
    invoiceDate,
    docketNumber: docketNumber || firstDocket || "N/A",
    refPoNo,
    clientName,
    clientAddress,
    clientStateCode,
    clientStateName,
    clientGST,
    openingKM,
    closingKM,
    totalDistance,
    notes,
    creditTerms,
    totalAmount: grandTotal,
    grandTotalWithGST: grandTotal,
    transports: [...entries].map((entry) => {
      const chargesEnabled = entry.querySelector(".charges-checkbox")?.checked;
      const transportData = {
        date: entry.querySelector(".transport-date").value,
        docket: entry.querySelector(".docket-number").value,
        from: entry.querySelector(".from-location").value,
        to: entry.querySelector(".to-location").value,
        mode: entry.querySelector(".transport-mode").value,
        vehicleType: entry.querySelector(".vehicle-type").value,
        weight: entry.querySelector(".weight").value,
        vehicle: entry.querySelector(".vehicle-number").value,
        freight: entry.querySelector(".freight-amount").value,
      };

      if (chargesEnabled) {
        transportData.loadingCharges =
          entry.querySelector(".charge-loading")?.value || 0;
        transportData.unionCharges =
          entry.querySelector(".charge-union")?.value || 0;
        transportData.sltCharges =
          entry.querySelector(".charge-slt")?.value || 0;
        transportData.detentionCharges =
          entry.querySelector(".charge-detention")?.value || 0;
        transportData.labourCharges =
          entry.querySelector(".charge-labour")?.value || 0;
        transportData.overloadCharges =
          entry.querySelector(".charge-overload")?.value || 0;
        transportData.odcCharges =
          entry.querySelector(".charge-odc")?.value || 0;
        transportData.haltingCharges =
          entry.querySelector(".charge-halting")?.value || 0;
        transportData.unloadingCharges =
          entry.querySelector(".charge-unloading")?.value || 0;
      }

      return transportData;
    }),
  };

  // Return the invoice payload for CSV download
  return invoicePayload;
}
