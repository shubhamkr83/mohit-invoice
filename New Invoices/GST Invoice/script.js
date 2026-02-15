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
                            <label>Freight Amount (₹) *</label>
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

  // Initialize GST display
  updateGSTDisplay();

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

    // Download CSV
    downloadCSV(invoiceData);
  });

// Auto-update on input change
document.getElementById("invoiceForm").addEventListener("input", function () {
  generateInvoice();
});

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
  csvRows.push(["|", "Invoice Type:", invoiceData.invoiceType + " INVOICE"]);
  csvRows.push(["|", "Invoice Number:", invoiceData.invoiceNumber]);
  csvRows.push([
    "|",
    "Invoice Date:",
    formatDateForCSV(invoiceData.invoiceDate),
  ]);
  csvRows.push(["|", "Docket(s):", invoiceData.docketNumber || "N/A"]);
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
    csvRows.push(["|", "NOTES", "", "", "", ""]);
    csvRows.push([
      "-----------------------------------------------------------------------",
    ]);
    csvRows.push(["|", invoiceData.notes.replace(/\n/g, " ")]);
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

  // Determine which charge columns to include (match invoice)
  const chargeColumns = [];
  const hasAnyCharges = invoiceData.transports.some(
    (t) =>
      (parseFloat(t.loadingCharges) || 0) > 0 ||
      (parseFloat(t.unionCharges) || 0) > 0 ||
      (parseFloat(t.sltCharges) || 0) > 0 ||
      (parseFloat(t.detentionCharges) || 0) > 0 ||
      (parseFloat(t.labourCharges) || 0) > 0 ||
      (parseFloat(t.overloadCharges) || 0) > 0 ||
      (parseFloat(t.odcCharges) || 0) > 0 ||
      (parseFloat(t.haltingCharges) || 0) > 0 ||
      (parseFloat(t.unloadingCharges) || 0) > 0,
  );

  if (hasAnyCharges) {
    if (
      invoiceData.transports.some(
        (t) => (parseFloat(t.loadingCharges) || 0) > 0,
      )
    )
      chargeColumns.push("Loading");
    if (
      invoiceData.transports.some((t) => (parseFloat(t.unionCharges) || 0) > 0)
    )
      chargeColumns.push("Union");
    if (invoiceData.transports.some((t) => (parseFloat(t.sltCharges) || 0) > 0))
      chargeColumns.push("SLT");
    if (
      invoiceData.transports.some(
        (t) => (parseFloat(t.detentionCharges) || 0) > 0,
      )
    )
      chargeColumns.push("Detention");
    if (
      invoiceData.transports.some((t) => (parseFloat(t.labourCharges) || 0) > 0)
    )
      chargeColumns.push("Labour");
    if (
      invoiceData.transports.some(
        (t) => (parseFloat(t.overloadCharges) || 0) > 0,
      )
    )
      chargeColumns.push("Overload");
    if (invoiceData.transports.some((t) => (parseFloat(t.odcCharges) || 0) > 0))
      chargeColumns.push("ODC");
    if (
      invoiceData.transports.some(
        (t) => (parseFloat(t.haltingCharges) || 0) > 0,
      )
    )
      chargeColumns.push("Halting");
    if (
      invoiceData.transports.some(
        (t) => (parseFloat(t.unloadingCharges) || 0) > 0,
      )
    )
      chargeColumns.push("Unloading");
  }

  // Transportation table headers - match invoice: Description, Docket No, Date, From, To, Mode, Vehicle Type, Vehicle No, Weight (Kg), [charges], Total Taxable Value
  const transportHeaders = [
    "Description",
    "Docket No",
    "Date",
    "From",
    "To",
    "Mode",
    "Vehicle Type",
    "Vehicle No",
    "Weight (Kg)",
  ];
  if (chargeColumns.length > 0) {
    chargeColumns.forEach((charge) =>
      transportHeaders.push(charge + " Charges (Rs.)"),
    );
  } else {
    transportHeaders.push("Other Charges");
  }
  transportHeaders.push("Total Taxable Value (Rs.)");
  csvRows.push(transportHeaders);

  // Separator line
  csvRows.push(new Array(transportHeaders.length).fill("---------------"));

  // Transportation entries - same column order as invoice
  let grandTotal = 0;
  const transportCount = invoiceData.transports.length;
  invoiceData.transports.forEach((transport, index) => {
    const freight = parseFloat(transport.freight) || 0;
    let lineTotal = freight;

    const description =
      transportCount > 1
        ? "Transportation Charges #" + (index + 1)
        : "Transportation Charges";

    const row = [
      description,
      transport.docket || "",
      formatDateForCSV(transport.date),
      transport.from || "",
      transport.to || "",
      transport.mode || "",
      transport.vehicleType || "",
      transport.vehicle || "",
      formatIndianNumber(parseFloat(transport.weight) || 0),
    ];

    if (chargeColumns.length > 0) {
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

  // Grand total row - match invoice "Sub Total" then GST then "Grand Total"
  const totalRow = new Array(transportHeaders.length).fill("");
  totalRow[0] = "Sub Total:";
  totalRow[totalRow.length - 1] = "Rs. " + formatIndianNumber(grandTotal);
  csvRows.push(totalRow);

  csvRows.push([]);
  csvRows.push([]);

  // ============================================================
  // PAYMENT SUMMARY
  // ============================================================
  csvRows.push([
    "=======================================================================",
  ]);
  csvRows.push(["", "PAYMENT SUMMARY", "", "", "", ""]);
  csvRows.push([
    "=======================================================================",
  ]);
  csvRows.push([]);
  csvRows.push([
    "Sub Total (Taxable Value):",
    "Rs. " + formatIndianNumber(invoiceData.totalAmount),
    "",
    "",
    "",
    "(INR)",
  ]);
  csvRows.push([]);
  csvRows.push(["Credit Terms:", invoiceData.creditTerms + " Days"]);
  csvRows.push([]);

  // GST Details based on selected GST type
  if (invoiceData.gstType === "igst") {
    csvRows.push([
      "IGST @18%:",
      "Rs. " + formatIndianNumber(invoiceData.igstAmount),
    ]);
  } else {
    csvRows.push([
      "CGST @9%:",
      "Rs. " + formatIndianNumber(invoiceData.cgstAmount),
    ]);
    csvRows.push([
      "SGST @9%:",
      "Rs. " + formatIndianNumber(invoiceData.sgstAmount),
    ]);
  }
  csvRows.push([
    "Grand Total (with GST):",
    "Rs. " + formatIndianNumber(invoiceData.grandTotalWithGST),
  ]);
  csvRows.push([
    "Amount in Words:",
    numberToWords(Math.floor(invoiceData.grandTotalWithGST)),
  ]);
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
  alert(`âœ… Invoice CSV downloaded successfully!\n\nFilename: ${filename}`);
}

// Update GST Display based on selected GST type
function updateGSTDisplay() {
  const gstType = document.querySelector('input[name="gstType"]:checked').value;
  const igstRow = document.querySelector(".gst-row:nth-child(1)");
  const cgstRow = document.querySelector(".gst-row:nth-child(2)");
  const sgstRow = document.querySelector(".gst-row:nth-child(3)");

  if (gstType === "igst") {
    // Show only IGST
    igstRow.style.display = "flex";
    cgstRow.style.display = "none";
    sgstRow.style.display = "none";
  } else {
    // Show CGST and SGST, hide IGST
    igstRow.style.display = "none";
    cgstRow.style.display = "flex";
    sgstRow.style.display = "flex";
  }
}

function generateInvoice() {
  console.log("generateInvoice() called");

  // Get form values
  const invoiceNumber = document.getElementById("invoiceNumber").value;
  const invoiceDate = document.getElementById("invoiceDate").value;
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

  // Get GST type for calculations
  const gstType = document.querySelector('input[name="gstType"]:checked').value;

  // Calculate GST totals (not per-line, just overall)
  let totalIGST = 0;
  let totalCGST = 0;
  let totalSGST = 0;
  let grandTotalWithGST = 0;

  if (gstType === "igst") {
    totalIGST = grandTotal * 0.18;
    grandTotalWithGST = grandTotal + totalIGST;
  } else {
    totalCGST = grandTotal * 0.09;
    totalSGST = grandTotal * 0.09;
    grandTotalWithGST = grandTotal + totalCGST + totalSGST;
  }

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
    // If no charges, show placeholder
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

  // Subtotal row (before GST)
  footerHTML += '<tr class="total-row">';
  const chargeColspan =
    activeChargeColumns.length > 0 ? activeChargeColumns.length : 1;
  footerHTML += `<td colspan="${9 + chargeColspan}" style="text-align: right; font-weight: bold; padding: 8px;">Sub Total</td>`;
  footerHTML += `<td class="amount-cell" style="font-weight: bold; padding: 8px;">${formatIndianNumber(grandTotal)}</td>`;
  footerHTML += "</tr>";

  // GST rows
  if (gstType === "igst") {
    footerHTML += "<tr>";
    footerHTML += `<td colspan="${9 + chargeColspan}" style="text-align: right; padding: 8px;">IGST @18%</td>`;
    footerHTML += `<td class="amount-cell" style="padding: 8px;">${formatIndianNumber(totalIGST)}</td>`;
    footerHTML += "</tr>";
  } else {
    footerHTML += "<tr>";
    footerHTML += `<td colspan="${9 + chargeColspan}" style="text-align: right; padding: 8px;">CGST @9%</td>`;
    footerHTML += `<td class="amount-cell" style="padding: 8px;">${formatIndianNumber(totalCGST)}</td>`;
    footerHTML += "</tr>";
    footerHTML += "<tr>";
    footerHTML += `<td colspan="${9 + chargeColspan}" style="text-align: right; padding: 8px;">SGST @9%</td>`;
    footerHTML += `<td class="amount-cell" style="padding: 8px;">${formatIndianNumber(totalSGST)}</td>`;
    footerHTML += "</tr>";
  }

  // Grand Total row
  footerHTML += '<tr class="total-row">';
  footerHTML += `<td colspan="${9 + chargeColspan}" style="text-align: right; font-weight: bold; padding: 8px;">Grand Total</td>`;
  footerHTML += `<td class="amount-cell" style="font-weight: bold; padding: 8px;" id="displayTotalAmount">${formatIndianNumber(grandTotalWithGST)}</td>`;
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

  // Note: GST is now calculated in the table generation above
  // Update GST displays in the summary section below the table
  document.getElementById("displayIGST").textContent =
    formatIndianNumber(totalIGST);
  document.getElementById("displayCGST").textContent =
    formatIndianNumber(totalCGST);
  document.getElementById("displaySGST").textContent =
    formatIndianNumber(totalSGST);
  document.getElementById("displayGrandTotal").textContent =
    formatIndianNumber(grandTotalWithGST);

  // Amount in words uses Grand Total (with GST) to match the total displayed in the invoice
  const amountInWords = numberToWords(Math.floor(grandTotalWithGST));
  document.getElementById("displayAmountWords").textContent = amountInWords;

  // Update Payment Terms - Credit Days and 5% GST RCM value
  document.getElementById("displayCreditDays").textContent =
    creditTerms || "15";
  const rcmClientNameElement = document.getElementById("displayRCMClientName");
  if (rcmClientNameElement) {
    rcmClientNameElement.textContent = clientName;
  }
  const gstRCMValue = grandTotal * 0.05; // 5% of taxable value (before GST)
  const displayCreditTermsEl = document.getElementById("displayCreditTerms");
  if (displayCreditTermsEl) {
    displayCreditTermsEl.textContent = formatIndianNumber(gstRCMValue);
  }

  // Docket(s) for CSV/email: single value or "Multiple (see table)"
  const firstDocket =
    entries.length > 0
      ? entries[0].querySelector(".docket-number")?.value || ""
      : "";
  const docketNumber =
    entries.length <= 1
      ? firstDocket
      : entries.length > 1
        ? "Multiple (see table)"
        : "";

  const invoicePayload = {
    timestamp: new Date().toISOString(),
    invoiceType,
    invoiceNumber,
    invoiceDate,
    docketNumber,
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
    gstType: gstType,
    igstAmount: totalIGST,
    cgstAmount: totalCGST,
    sgstAmount: totalSGST,
    grandTotalWithGST: grandTotalWithGST,
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
