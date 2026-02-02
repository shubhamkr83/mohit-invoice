
        let entryCounter = 0;

        // Number to words conversion
        function numberToWords(num) {
            const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
            const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
            const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

            function convertLessThanThousand(n) {
                if (n === 0) return '';
                if (n < 10) return ones[n];
                if (n < 20) return teens[n - 10];
                if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 > 0 ? ' ' + ones[n % 10] : '');
                return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 > 0 ? ' ' + convertLessThanThousand(n % 100) : '');
            }

            if (num === 0) return 'Zero Only';
            
            const crore = Math.floor(num / 10000000);
            const lakh = Math.floor((num % 10000000) / 100000);
            const thousand = Math.floor((num % 100000) / 1000);
            const remainder = num % 1000;

            let result = '';
            
            if (crore > 0) result += convertLessThanThousand(crore) + ' Crore ';
            if (lakh > 0) result += convertLessThanThousand(lakh) + ' Lakh ';
            if (thousand > 0) result += convertLessThanThousand(thousand) + ' Thousand ';
            if (remainder > 0) result += convertLessThanThousand(remainder);

            return result.trim() + ' Only';
        }

        // Format number with Indian comma system
        function formatIndianNumber(num) {
            const n = parseFloat(num).toFixed(2);
            const parts = n.split('.');
            const intPart = parts[0];
            const decPart = parts[1];
            
            let lastThree = intPart.substring(intPart.length - 3);
            const otherNumbers = intPart.substring(0, intPart.length - 3);
            
            if (otherNumbers !== '') {
                lastThree = ',' + lastThree;
            }
            
            const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
            return formatted + '.' + decPart;
        }

        // Format date
        function formatDate(dateStr) {
            const date = new Date(dateStr);
            const day = date.getDate();
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = months[date.getMonth()];
            const year = date.getFullYear().toString().slice(-2);
            return `${day}-${month}-${year}`;
        }

        // Add transport entry
        function addTransportEntry() {
            entryCounter++;
            const container = document.getElementById('transportEntriesContainer');
            const today = new Date().toISOString().split('T')[0];
            
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
            
            container.insertAdjacentHTML('beforeend', entryHTML);
            
            // Add event listener for charges checkbox
            const newEntry = document.getElementById(`entry-${entryCounter}`);
            const chargesCheckbox = newEntry.querySelector('.charges-checkbox');
            const chargesSection = newEntry.querySelector('.charges-section');
            
            chargesCheckbox.addEventListener('change', function() {
                chargesSection.style.display = this.checked ? 'block' : 'none';
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
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('invoiceDate').value = today;
            
            // Auto-uppercase Client Name
            const clientNameInput = document.getElementById('clientName');
            clientNameInput.addEventListener('input', function(e) {
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.toUpperCase();
                this.setSelectionRange(start, end);
            });
            
            // GST Type radio button event listeners
            const gstTypeRadios = document.querySelectorAll('input[name="gstType"]');
            gstTypeRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    updateGSTDisplay();
                    generateInvoice();
                });
            });
            
            // Initialize GST display
            updateGSTDisplay();
            
            // Add first transport entry by default
            addTransportEntry();
        });

        // Form submission handler - Download CSV
        document.getElementById('invoiceForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Generate invoice and get the data
            const invoiceData = generateInvoice();
            
            // Download CSV
            downloadCSV(invoiceData);
        });


        // Auto-update on input change
        document.getElementById('invoiceForm').addEventListener('input', function() {
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
            csvRows.push(['=======================================================================']);
            csvRows.push(['', 'LOGPRO SUPPLY CHAIN SOLUTIONS PVT. LTD.']);
            csvRows.push(['', 'INVOICE EXPORT']);
            csvRows.push(['=======================================================================']);
            csvRows.push(['Generated:', new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })]);
            csvRows.push([]);
            
            // ============================================================
            // INVOICE INFORMATION
            // ============================================================
            csvRows.push(['-----------------------------------------------------------------------']);
            csvRows.push(['|', 'INVOICE DETAILS', '', '', '', '']);
            csvRows.push(['-----------------------------------------------------------------------']);
            csvRows.push(['|', 'Invoice Type:', invoiceData.invoiceType + ' INVOICE']);
            csvRows.push(['|', 'Invoice Number:', invoiceData.invoiceNumber]);
            csvRows.push(['|', 'Invoice Date:', formatDateForCSV(invoiceData.invoiceDate)]);
            csvRows.push(['|', 'Docket Number:', invoiceData.docketNumber]);
            csvRows.push(['|', 'Ref PO Number:', invoiceData.refPoNo || 'N/A']);
            csvRows.push(['-----------------------------------------------------------------------']);
            csvRows.push([]);
            
            // ============================================================
            // CLIENT INFORMATION
            // ============================================================
            csvRows.push(['-----------------------------------------------------------------------']);
            csvRows.push(['|', 'CLIENT DETAILS', '', '', '', '']);
            csvRows.push(['-----------------------------------------------------------------------']);
            csvRows.push(['|', 'Client Name:', invoiceData.clientName]);
            csvRows.push(['|', 'Address:', invoiceData.clientAddress.replace(/\n/g, ', ')]);
            csvRows.push(['|', 'State:', invoiceData.clientStateName + ' (Code: ' + invoiceData.clientStateCode + ')']);
            csvRows.push(['|', 'GST IN Number:', invoiceData.clientGST]);
            csvRows.push(['-----------------------------------------------------------------------']);
            csvRows.push([]);
            
            // ============================================================
            // DISTANCE TRACKING (if applicable)
            // ============================================================
            if (invoiceData.openingKM > 0 || invoiceData.closingKM > 0) {
                csvRows.push(['-----------------------------------------------------------------------']);
                csvRows.push(['|', 'DISTANCE DETAILS', '', '', '', '']);
                csvRows.push(['-----------------------------------------------------------------------']);
                csvRows.push(['|', 'Opening KM:', formatIndianNumber(invoiceData.openingKM) + ' KM']);
                csvRows.push(['|', 'Closing KM:', formatIndianNumber(invoiceData.closingKM) + ' KM']);
                csvRows.push(['|', 'Total Distance Covered:', formatIndianNumber(invoiceData.totalDistance) + ' KM']);
                csvRows.push(['-----------------------------------------------------------------------']);
                csvRows.push([]);
            }
            
            // ============================================================
            // ADDITIONAL NOTES (if provided)
            // ============================================================
            if (invoiceData.notes && invoiceData.notes.trim()) {
                csvRows.push(['-----------------------------------------------------------------------']);
                csvRows.push(['|', 'NOTES', '', '', '', '']);
                csvRows.push(['-----------------------------------------------------------------------']);
                csvRows.push(['|', invoiceData.notes.replace(/\n/g, ' ')]);
                csvRows.push(['-----------------------------------------------------------------------']);
                csvRows.push([]);
            }
            
            // ============================================================
            // TRANSPORTATION DETAILS TABLE
            // ============================================================
            csvRows.push(['=======================================================================']);
            csvRows.push(['', 'TRANSPORTATION DETAILS', '', '', '', '']);
            csvRows.push(['=======================================================================']);
            csvRows.push([]);
            
            // Determine which charge columns to include
            const chargeColumns = [];
            const hasAnyCharges = invoiceData.transports.some(t => 
                t.loadingCharges || t.unionCharges || t.sltCharges || 
                t.detentionCharges || t.labourCharges || t.overloadCharges || 
                t.odcCharges || t.haltingCharges || t.unloadingCharges
            );
            
            if (hasAnyCharges) {
                if (invoiceData.transports.some(t => t.loadingCharges > 0)) chargeColumns.push('Loading');
                if (invoiceData.transports.some(t => t.unionCharges > 0)) chargeColumns.push('Union');
                if (invoiceData.transports.some(t => t.sltCharges > 0)) chargeColumns.push('SLT');
                if (invoiceData.transports.some(t => t.detentionCharges > 0)) chargeColumns.push('Detention');
                if (invoiceData.transports.some(t => t.labourCharges > 0)) chargeColumns.push('Labour');
                if (invoiceData.transports.some(t => t.overloadCharges > 0)) chargeColumns.push('Overload');
                if (invoiceData.transports.some(t => t.odcCharges > 0)) chargeColumns.push('ODC');
                if (invoiceData.transports.some(t => t.haltingCharges > 0)) chargeColumns.push('Halting');
                if (invoiceData.transports.some(t => t.unloadingCharges > 0)) chargeColumns.push('Unloading');
            }
            
            // Transportation table headers with better formatting
            const transportHeaders = [
                '#', 'Date', 'Docket', 'From', 'To', 'Mode', 
                'Vehicle Type', 'Weight (Kg)', 'Vehicle No', 'Freight (Rs.)'
            ];
            
            if (chargeColumns.length > 0) {
                chargeColumns.forEach(charge => transportHeaders.push(charge + ' (Rs.)'));
            }
            
            transportHeaders.push('Total (Rs.)');
            csvRows.push(transportHeaders);
            
            // Separator line
            csvRows.push(new Array(transportHeaders.length).fill('---------------'));
            
            // Transportation entries
            let grandTotal = 0;
            invoiceData.transports.forEach((transport, index) => {
                let lineTotal = parseFloat(transport.freight) || 0;
                
                const row = [
                    index + 1,
                    formatDateForCSV(transport.date),
                    transport.docket,
                    transport.from,
                    transport.to,
                    transport.mode,
                    transport.vehicleType,
                    formatIndianNumber(parseFloat(transport.weight)),
                    transport.vehicle,
                    formatIndianNumber(parseFloat(transport.freight))
                ];
                
                // Add charge values if columns exist
                if (hasAnyCharges) {
                    const chargeMap = {
                        'Loading': transport.loadingCharges,
                        'Union': transport.unionCharges,
                        'SLT': transport.sltCharges,
                        'Detention': transport.detentionCharges,
                        'Labour': transport.labourCharges,
                        'Overload': transport.overloadCharges,
                        'ODC': transport.odcCharges,
                        'Halting': transport.haltingCharges,
                        'Unloading': transport.unloadingCharges
                    };
                    
                    chargeColumns.forEach(charge => {
                        const val = parseFloat(chargeMap[charge]) || 0;
                        row.push(val > 0 ? formatIndianNumber(val) : '-');
                        lineTotal += val;
                    });
                }
                
                row.push(formatIndianNumber(lineTotal));
                grandTotal += lineTotal;
                csvRows.push(row);
            });
            
            // Separator before totals
            csvRows.push(new Array(transportHeaders.length).fill('---------------'));
            
            // Grand total row
            const totalRow = new Array(transportHeaders.length).fill('');
            totalRow[totalRow.length - 2] = 'GRAND TOTAL:';
            totalRow[totalRow.length - 1] = 'Rs. ' + formatIndianNumber(grandTotal);
            csvRows.push(totalRow);
            
            csvRows.push([]);
            csvRows.push([]);
            
            // ============================================================
            // PAYMENT SUMMARY
            // ============================================================
            csvRows.push(['=======================================================================']);
            csvRows.push(['', 'PAYMENT SUMMARY', '', '', '', '']);
            csvRows.push(['=======================================================================']);
            csvRows.push([]);
            csvRows.push(['Total Amount:', 'Rs. ' + formatIndianNumber(invoiceData.totalAmount), '', '', '', '(INR)']);
            csvRows.push([]);
            csvRows.push(['Credit Terms:', invoiceData.creditTerms + ' Days']);
            csvRows.push([]);
            
            // GST Details based on selected GST type
            if (invoiceData.gstType === 'igst') {
                csvRows.push(['IGST @18%:', 'Rs. ' + formatIndianNumber(invoiceData.igstAmount)]);
            } else {
                csvRows.push(['CGST @9%:', 'Rs. ' + formatIndianNumber(invoiceData.cgstAmount)]);
                csvRows.push(['SGST @9%:', 'Rs. ' + formatIndianNumber(invoiceData.sgstAmount)]);
            }
            csvRows.push(['Grand Total (with GST):', 'Rs. ' + formatIndianNumber(invoiceData.grandTotalWithGST)]);
            csvRows.push(['Amount in Words:', numberToWords(Math.floor(invoiceData.grandTotalWithGST))]);
            csvRows.push([]);
            csvRows.push(['=======================================================================']);
            csvRows.push(['', 'Thank you for your business!', '', '', '', '']);
            csvRows.push(['=======================================================================']);
            
            // Convert to CSV string with UTF-8 BOM for Excel compatibility
            const csvString = csvRows.map(row => 
                row.map(cell => {
                    // Escape quotes and wrap in quotes if contains comma, quote, or newline
                    const cellStr = String(cell || '');
                    if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                        return '"' + cellStr.replace(/"/g, '""') + '"';
                    }
                    return cellStr;
                }).join(',')
            ).join('\n');
            
            // Add BOM for better Excel UTF-8 support
            return '\ufeff' + csvString;
        }
        
        // Helper function to format date nicely for CSV
        function formatDateForCSV(dateStr) {
            const date = new Date(dateStr);
            const day = String(date.getDate()).padStart(2, '0');
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        
        function downloadCSV(invoiceData) {
            const csv = generateCSV(invoiceData);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            
            // Create filename with invoice number and date
            const filename = `Invoice_${invoiceData.invoiceNumber.replace(/\//g, '-')}_${invoiceData.invoiceDate}.csv`;
            
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename);
            } else {
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.style.display = 'none';
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
            const igstRow = document.querySelector('.gst-row:nth-child(1)');
            const cgstRow = document.querySelector('.gst-row:nth-child(2)');
            const sgstRow = document.querySelector('.gst-row:nth-child(3)');
            
            if (gstType === 'igst') {
                // Show only IGST
                igstRow.style.display = 'flex';
                cgstRow.style.display = 'none';
                sgstRow.style.display = 'none';
            } else {
                // Show CGST and SGST, hide IGST
                igstRow.style.display = 'none';
                cgstRow.style.display = 'flex';
                sgstRow.style.display = 'flex';
            }
        }

        function generateInvoice() {
            // Get form values
            const invoiceNumber = document.getElementById('invoiceNumber').value;
            const invoiceDate = document.getElementById('invoiceDate').value;
            const docketNumber = document.getElementById('docketNumber').value;
            const refPoNo = document.getElementById('refPoNo').value;
            
            const clientName = document.getElementById('clientName').value;
            const clientAddress = document.getElementById('clientAddress').value;
            const clientStateCode = document.getElementById('clientStateCode').value;
            const clientStateName = document.getElementById('clientStateName').value;
            const clientGST = document.getElementById('clientGST').value;
            const notes = document.getElementById('notes').value;
            const creditTerms = document.getElementById('creditTerms').value;
            
            // Get invoice type
            const invoiceType = document.querySelector('input[name="invoiceType"]:checked').value;
            
            // Update invoice header info
            document.getElementById('displayInvoiceTitle').textContent = invoiceType + ' INVOICE';
            document.getElementById('displayInvoiceNumber2').textContent = invoiceNumber;
            document.getElementById('displayInvoiceDate').textContent = formatDate(invoiceDate);
            document.getElementById('displayRefPoNo').textContent = refPoNo.trim() !== '' ? refPoNo : 'NA';
            
            document.getElementById('displayClientName').textContent = clientName;
            document.getElementById('displayClientAddress').textContent = clientAddress;
            document.getElementById('displayClientStateCode').textContent = clientStateCode;
            document.getElementById('displayClientStateName').textContent = clientStateName;
            document.getElementById('displayClientGST').textContent = clientGST;
            
            // Get all transport entries
            const entries = document.querySelectorAll('.transport-entry');
            const tableHead = document.getElementById('transportTableHead');
            const tableBody = document.getElementById('transportTableBody');
            tableBody.innerHTML = '';
            
            let grandTotal = 0;
            
            // Get Opening KM and Closing KM from standalone fields
            const openingKM = parseFloat(document.getElementById('openingKM').value) || 0;
            const closingKM = parseFloat(document.getElementById('closingKM').value) || 0;
            const totalDistance = closingKM - openingKM;
            
            // Define all possible charge types with their labels
            const chargeTypes = [
                { key: 'loading', label: 'Loading Charges', class: 'charge-loading' },
                { key: 'union', label: 'Union Charges', class: 'charge-union' },
                { key: 'slt', label: 'SLT Charges', class: 'charge-slt' },
                { key: 'detention', label: 'Detention Charges', class: 'charge-detention' },
                { key: 'labour', label: 'Labour Charges', class: 'charge-labour' },
                { key: 'overload', label: 'Overload Charges', class: 'charge-overload' },
                { key: 'odc', label: 'ODC Charges', class: 'charge-odc' },
                { key: 'halting', label: 'Halting Charges', class: 'charge-halting' },
                { key: 'unloading', label: 'Unloading Charges', class: 'charge-unloading' }
            ];
            
            // Collect all unique charges that have values across all entries
            const activeCharges = new Set();
            entries.forEach(entry => {
                const chargesEnabled = entry.querySelector('.charges-checkbox')?.checked;
                if (chargesEnabled) {
                    chargeTypes.forEach(chargeType => {
                        const chargeInput = entry.querySelector(`.${chargeType.class}`);
                        const chargeValue = parseFloat(chargeInput?.value) || 0;
                        if (chargeValue > 0) {
                            activeCharges.add(chargeType.key);
                        }
                    });
                }
            });
            
            // Build dynamic table header
            let headerRow = '<tr>';
            headerRow += '<th>Description</th>';
            headerRow += '<th>Docket No.</th>';
            headerRow += '<th>Date</th>';
            headerRow += '<th>From</th>';
            headerRow += '<th>To</th>';
            headerRow += '<th>Mode</th>';
            headerRow += '<th>Vehicle Type</th>';
            headerRow += '<th>Weight (Kg)</th>';
            headerRow += '<th>Vehicle No.</th>';
            headerRow += '<th>Freight</th>';
            
            // Add columns for active charges
            if (activeCharges.size > 0) {
                chargeTypes.forEach(chargeType => {
                    if (activeCharges.has(chargeType.key)) {
                        headerRow += `<th>${chargeType.label}</th>`;
                    }
                });
            } else {
                // If no charges, show "Other Charges" column
                headerRow += '<th>Other Charges</th>';
            }
            
            headerRow += '<th>Total (INR)</th>';
            headerRow += '</tr>';
            tableHead.innerHTML = headerRow;
            
            // Build table rows
            entries.forEach((entry, index) => {
                const transportDate = entry.querySelector('.transport-date').value;
                const docketNumberField = entry.querySelector('.docket-number');
                const docketNumber = docketNumberField ? docketNumberField.value : '';
                const fromLocation = entry.querySelector('.from-location').value;
                const toLocation = entry.querySelector('.to-location').value;
                const transportMode = entry.querySelector('.transport-mode').value;
                const vehicleType = entry.querySelector('.vehicle-type').value;
                const weight = parseFloat(entry.querySelector('.weight').value) || 0;
                const vehicleNumber = entry.querySelector('.vehicle-number').value;
                const freightAmount = parseFloat(entry.querySelector('.freight-amount').value) || 0;
                
                // Calculate total including all charges
                let lineTotal = freightAmount;
                const entryCharges = {};
                
                const chargesEnabled = entry.querySelector('.charges-checkbox')?.checked;
                if (chargesEnabled) {
                    chargeTypes.forEach(chargeType => {
                        const chargeInput = entry.querySelector(`.${chargeType.class}`);
                        const chargeValue = parseFloat(chargeInput?.value) || 0;
                        entryCharges[chargeType.key] = chargeValue;
                        lineTotal += chargeValue;
                    });
                }
                
                grandTotal += lineTotal;
                
                let row = '<tr>';
                row += `<td>Transportation Charges ${entries.length > 1 ? '#' + (index + 1) : ''}</td>`;
                row += `<td>${docketNumber}</td>`;
                row += `<td>${formatDate(transportDate)}</td>`;
                row += `<td>${fromLocation}</td>`;
                row += `<td>${toLocation}</td>`;
                row += `<td>${transportMode}</td>`;
                row += `<td>${vehicleType}</td>`;
                row += `<td>${formatIndianNumber(weight)}</td>`;
                row += `<td>${vehicleNumber}</td>`;
                row += `<td class="amount-cell">${formatIndianNumber(freightAmount)}</td>`;
                
                // Add charge columns
                if (activeCharges.size > 0) {
                    chargeTypes.forEach(chargeType => {
                        if (activeCharges.has(chargeType.key)) {
                            const chargeValue = entryCharges[chargeType.key] || 0;
                            row += `<td class="amount-cell">${chargeValue > 0 ? formatIndianNumber(chargeValue) : '-'}</td>`;
                        }
                    });
                } else {
                    // Show dash for "Other Charges" if no charges enabled
                    row += '<td class="amount-cell">-</td>';
                }
                
                row += `<td class="amount-cell">${formatIndianNumber(lineTotal)}</td>`;
                row += '</tr>';
                
                tableBody.insertAdjacentHTML('beforeend', row);
            });
            
            // Update distance summary
            document.getElementById('displayOpeningKM').textContent = formatIndianNumber(openingKM) + ' KM';
            document.getElementById('displayClosingKM').textContent = formatIndianNumber(closingKM) + ' KM';
            document.getElementById('displayTotalDistance').textContent = formatIndianNumber(totalDistance) + ' KM';
            
            // Show/hide distance summary section based on values
            const distanceSummarySection = document.getElementById('distanceSummarySection');
            if (openingKM > 0 || closingKM > 0) {
                distanceSummarySection.style.display = 'flex';
            } else {
                distanceSummarySection.style.display = 'none';
            }
            
            // Update notes section
            const notesSection = document.getElementById('notesSection');
            if (notes && notes.trim() !== '') {
                document.getElementById('displayNotes').textContent = notes;
                notesSection.style.display = 'flex';
            } else {
                notesSection.style.display = 'none';
            }
            
            // Update totals
            document.getElementById('displayTotalAmount').textContent = formatIndianNumber(grandTotal);
            
            // Calculate GST amounts based on selected GST type
            const gstType = document.querySelector('input[name="gstType"]:checked').value;
            let igstAmount = 0;
            let cgstAmount = 0;
            let sgstAmount = 0;
            let grandTotalWithGST = grandTotal;
            
            if (gstType === 'igst') {
                igstAmount = grandTotal * 0.18;
                grandTotalWithGST = grandTotal + igstAmount;
            } else {
                cgstAmount = grandTotal * 0.09;
                sgstAmount = grandTotal * 0.09;
                grandTotalWithGST = grandTotal + cgstAmount + sgstAmount;
            }
            
            // Update GST displays
            document.getElementById('displayIGST').textContent = formatIndianNumber(igstAmount);
            document.getElementById('displayCGST').textContent = formatIndianNumber(cgstAmount);
            document.getElementById('displaySGST').textContent = formatIndianNumber(sgstAmount);
            document.getElementById('displayGrandTotal').textContent = formatIndianNumber(grandTotalWithGST);
            
            const amountInWords = numberToWords(Math.floor(grandTotalWithGST));
            document.getElementById('displayAmountWords').textContent = amountInWords;
            
            // Update Credit Terms
            document.getElementById('displayCreditTerms').textContent = creditTerms;

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
                igstAmount: igstAmount,
                cgstAmount: cgstAmount,
                sgstAmount: sgstAmount,
                grandTotalWithGST: grandTotalWithGST,
                transports: [...entries].map(entry => {
                    const chargesEnabled = entry.querySelector('.charges-checkbox')?.checked;
                    const transportData = {
                        date: entry.querySelector('.transport-date').value,
                        docket: entry.querySelector('.docket-number').value,
                        from: entry.querySelector('.from-location').value,
                        to: entry.querySelector('.to-location').value,
                        mode: entry.querySelector('.transport-mode').value,
                        vehicleType: entry.querySelector('.vehicle-type').value,
                        weight: entry.querySelector('.weight').value,
                        vehicle: entry.querySelector('.vehicle-number').value,
                        freight: entry.querySelector('.freight-amount').value
                    };
                    
                    if (chargesEnabled) {
                        transportData.loadingCharges = entry.querySelector('.charge-loading')?.value || 0;
                        transportData.unionCharges = entry.querySelector('.charge-union')?.value || 0;
                        transportData.sltCharges = entry.querySelector('.charge-slt')?.value || 0;
                        transportData.detentionCharges = entry.querySelector('.charge-detention')?.value || 0;
                        transportData.labourCharges = entry.querySelector('.charge-labour')?.value || 0;
                        transportData.overloadCharges = entry.querySelector('.charge-overload')?.value || 0;
                        transportData.odcCharges = entry.querySelector('.charge-odc')?.value || 0;
                        transportData.haltingCharges = entry.querySelector('.charge-halting')?.value || 0;
                        transportData.unloadingCharges = entry.querySelector('.charge-unloading')?.value || 0;
                    }
                    
                    return transportData;
                })
            };
            
            // Return the invoice payload for CSV download
            return invoicePayload;
        }
    
