import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './GetQuote.css';

const GetQuote = () => {
    const [quotes, setQuotes] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        quoteId: '',
        subject: '',
        customerName: '',
        companyName: '',
        address: '',
        email: '',
        phone: '',
        projectType: '',
        chargePerHour: '',
        projectCost: '',
        requirement: '',
        estimatedTime: '',
        startDate: '',
        endDate: '',
        budgetRange: '',
        techStack: '',
        communication: '',
        remarks: '',
        status: 'Pending'
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        let savedQuotes = JSON.parse(localStorage.getItem('vzario_quotes') || '[]');
        
        // Seed if empty
        if (!savedQuotes || savedQuotes.length === 0) {
            savedQuotes = [
                {
                    id: 1,
                    quoteId: 'QT-240001',
                    subject: 'E-commerce Platform Development',
                    customerName: 'John Doe',
                    companyName: 'TechCorp Solutions',
                    email: 'john@techcorp.com',
                    phone: '+91 9876543210',
                    address: 'Bangalore, India',
                    projectType: 'Web Development',
                    chargePerHour: '1500',
                    projectCost: '150000',
                    requirement: 'Modern E-commerce platform with React and Node.js.',
                    estimatedTime: '3 Months',
                    startDate: '2024-04-01',
                    endDate: '2024-07-01',
                    budgetRange: 'Rs. 1,00,000 - 2,00,000',
                    techStack: 'MERN Stack',
                    communication: 'Google Meet',
                    remarks: 'Priority project',
                    status: 'Approved'
                },
                {
                    id: 2,
                    quoteId: 'QT-240002',
                    subject: 'Mobile Fitness App UI',
                    customerName: 'Jane Smith',
                    companyName: 'Creative Labs',
                    email: 'jane@creative.io',
                    phone: '+91 8765432109',
                    address: 'Mumbai, India',
                    projectType: 'UI/UX Design',
                    chargePerHour: '1200',
                    projectCost: '80000',
                    requirement: 'Mobile App UI Design for a fitness tracking application.',
                    estimatedTime: '1 Month',
                    startDate: '2024-04-15',
                    endDate: '2024-05-15',
                    budgetRange: 'Rs. 50,000 - 1,00,000',
                    techStack: 'Figma, Adobe XD',
                    communication: 'Email',
                    remarks: 'Needs multiple iterations',
                    status: 'In Progress'
                }
            ];
            localStorage.setItem('vzario_quotes', JSON.stringify(savedQuotes));
        } else {
            // Fix missing IDs for any existing records
            let updated = false;
            savedQuotes = savedQuotes.map(q => {
                if (!q.quoteId) {
                    updated = true;
                    return { ...q, quoteId: `QT-${String(q.id || Date.now()).slice(-6)}` };
                }
                return q;
            });
            if (updated) {
                localStorage.setItem('vzario_quotes', JSON.stringify(savedQuotes));
            }
        }
        setQuotes(savedQuotes);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newQuotes;
        if (isEditing) {
            newQuotes = quotes.map(q => q.id === formData.id ? formData : q);
            setIsEditing(false);
        } else {
            const timestamp = Date.now();
            const newQuote = { 
                ...formData, 
                id: timestamp,
                quoteId: `QT-${String(timestamp).slice(-6)}`
            };
            newQuotes = [...quotes, newQuote];
        }
        setQuotes(newQuotes);
        localStorage.setItem('vzario_quotes', JSON.stringify(newQuotes));
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            id: null,
            quoteId: '',
            subject: '',
            customerName: '',
            companyName: '',
            address: '',
            email: '',
            phone: '',
            projectType: '',
            chargePerHour: '',
            projectCost: '',
            requirement: '',
            estimatedTime: '',
            startDate: '',
            endDate: '',
            budgetRange: '',
            techStack: '',
            communication: '',
            remarks: '',
            status: 'Pending'
        });
        setIsEditing(false);
    };

    const handleEdit = (quote) => {
        setFormData(quote);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this quote?')) {
            const newQuotes = quotes.filter(q => q.id !== id);
            setQuotes(newQuotes);
            localStorage.setItem('vzario_quotes', JSON.stringify(newQuotes));
        }
    };

    const downloadPDF = (quote) => {
        const doc = new jsPDF();
        const primaryColor = [20, 20, 20]; // Darker for receipt feel
        const accentColor = [41, 128, 185];
        
        const displayId = quote.quoteId || `QT-${String(quote.id).slice(-6)}`;
        
        // --- Header Section ---
        doc.setFontSize(28);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFont('helvetica', 'bold');
        doc.text('VZARIO', 20, 25);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100);
        doc.text('Innovative Digital Solutions', 20, 32);
        
        // Receipt Label & ID
        doc.setFontSize(18);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text('QUOTE RECEIPT', 190, 25, { align: 'right' });
        doc.setFontSize(10);
        doc.text(`ID: ${displayId}`, 190, 32, { align: 'right' });
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 190, 37, { align: 'right' });

        doc.setDrawColor(230);
        doc.setLineWidth(0.5);
        doc.line(20, 45, 190, 45);

        // --- Side-by-Side Info Section ---
        // Left Column: From (Our Company)
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.text('FROM:', 20, 55);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Vzario Technologies', 20, 62);
        doc.text('contact@vzario.com', 20, 67);
        doc.text('www.vzario.com', 20, 72);

        // Right Column: To (Client)
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.text('BILL TO:', 120, 55);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(quote.customerName, 120, 62);
        doc.text(quote.companyName || 'Individual Client', 120, 67);
        doc.text(quote.email, 120, 72);
        if (quote.address) {
            doc.text(quote.address, 120, 77, { maxWidth: 70 });
        }

        // --- Subject Line ---
        const subjectY = quote.address ? 90 : 85;
        doc.setDrawColor(245);
        doc.setFillColor(245, 245, 245);
        doc.rect(20, subjectY, 170, 12, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(40);
        doc.text(`Subject: ${quote.subject || 'Project Quotation'}`, 25, subjectY + 8);

        // --- Items Table ---
        autoTable(doc, {
            startY: subjectY + 20,
            head: [['Description', 'Project Type', 'Timeframe', 'Amount']],
            body: [
                [
                    { content: quote.requirement, styles: { cellWidth: 70 } },
                    quote.projectType || 'Standard',
                    quote.estimatedTime || 'TBD',
                    `Rs. ${quote.projectCost || '0'}`
                ]
            ],
            theme: 'striped',
            headStyles: { fillColor: [30, 30, 30], textColor: [255, 255, 255], fontStyle: 'bold' },
            bodyStyles: { textColor: [40, 40, 40], fontSize: 10 },
            alternateRowStyles: { fillColor: [250, 250, 250] },
            margin: { left: 20, right: 20 }
        });

        // --- Cost Summary Section ---
        let finalY = doc.lastAutoTable.finalY + 15;
        
        // Side block for additional details
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Terms & Details:', 20, finalY);
        doc.setFont('helvetica', 'normal');
        doc.text(`Timeline: ${quote.startDate || 'N/A'} to ${quote.endDate || 'N/A'}`, 20, finalY + 7);
        doc.text(`Status: ${quote.status}`, 20, finalY + 12);
        doc.text(`Comms: ${quote.communication}`, 20, finalY + 17);

        // Result block (Aligned Right)
        doc.setDrawColor(0);
        doc.setLineWidth(0.1);
        doc.line(130, finalY - 5, 190, finalY - 5);
        
        doc.setFont('helvetica', 'normal');
        doc.text('Rate per Hour:', 130, finalY + 2);
        doc.text(`Rs. ${quote.chargePerHour || '0'}`, 190, finalY + 2, { align: 'right' });
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('ESTIMATED TOTAL:', 130, finalY + 12);
        doc.text(`Rs. ${quote.projectCost || '0'}`, 190, finalY + 12, { align: 'right' });

        // --- Footer ---
        const footerY = 270;
        doc.setDrawColor(200);
        doc.line(20, footerY, 190, footerY);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text('Thank you for your business. This is a formal quotation receipt generated by Vzario.', 105, footerY + 8, { align: 'center' });
        doc.text(`Internal Ref: ${displayId} | Generated: ${new Date().toLocaleString()}`, 105, footerY + 13, { align: 'center' });

        doc.save(`Receipt_${displayId}_${quote.customerName.replace(/\s+/g, '_')}.pdf`);
    };

    return (
        <div className="get-quote-container">
            <div className="quote-header">
                <h1>Get a Quote</h1>
                <p>Fill out the form below to receive a detailed project estimation.</p>
            </div>

            <form className="quote-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Company Information</h3>
                    <div className="form-grid">
                        {isEditing && (
                            <div className="form-group">
                                <label>Quote ID</label>
                                <input type="text" value={formData.quoteId} readOnly className="readonly-input" />
                            </div>
                        )}
                        <div className="form-group">
                            <label>Customer Name *</label>
                            <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Phone *</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="form-group full-width">
                            <label>Address</label>
                            <textarea name="address" value={formData.address} onChange={handleChange} rows="2" />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Project Details</h3>
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Quotation Subject / Summary *</label>
                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g., E-commerce Redesign Quotation" required />
                        </div>
                        <div className="form-group">
                            <label>Project Type</label>
                            <select name="projectType" value={formData.projectType} onChange={handleChange}>
                                <option value="">Select Type</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="SEO/Marketing">SEO/Marketing</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Charge Per Hour (Rs.)</label>
                            <input type="number" name="chargePerHour" value={formData.chargePerHour} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Total Project Cost (Rs.)</label>
                            <input type="number" name="projectCost" value={formData.projectCost} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Estimated Time</label>
                            <input type="text" name="estimatedTime" value={formData.estimatedTime} onChange={handleChange} placeholder="e.g. 3 months" />
                        </div>
                        <div className="form-group full-width">
                            <label>Requirements / Description *</label>
                            <textarea name="requirement" value={formData.requirement} onChange={handleChange} rows="4" required />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Timeline & Budget</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Budget Range</label>
                            <input type="text" name="budgetRange" value={formData.budgetRange} onChange={handleChange} placeholder="e.g. $5000 - $10000" />
                        </div>
                        <div className="form-group">
                            <label>Preferred Communication</label>
                            <select name="communication" value={formData.communication} onChange={handleChange}>
                                <option value="">Select Method</option>
                                <option value="Email">Email</option>
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="Google Meet">Google Meet</option>
                                <option value="Phone Call">Phone Call</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Additional Information</h3>
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Technical Stack (Suggested)</label>
                            <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="e.g. React, Node.js, MongoDB" />
                        </div>
                        <div className="form-group full-width">
                            <label>Additional Remarks</label>
                            <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="2" />
                        </div>
                        <div className="form-group">
                            <label>Quote Status</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">{isEditing ? 'Update Quote' : 'Save Quote'}</button>
                    {isEditing && <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>}
                </div>
            </form>

            <div className="quotes-grid-container">
                <h2>Submitted Quotes</h2>
                <div className="table-responsive">
                    <table className="quotes-table">
                        <thead>
                            <tr>
                                <th>Quote ID</th>
                                <th>Client</th>
                                <th>Project</th>
                                <th>Type</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="no-data">No quotes saved yet.</td>
                                </tr>
                            ) : (
                                quotes.map(quote => (
                                    <tr key={quote.id}>
                                        <td><span className="quote-id-badge">{quote.quoteId || `QT-${String(quote.id).slice(-6)}`}</span></td>
                                        <td>
                                            <div className="client-info">
                                                <strong>{quote.customerName}</strong>
                                                <span>{quote.email}</span>
                                            </div>
                                        </td>
                                        <td>{quote.requirement.substring(0, 30)}...</td>
                                        <td>{quote.projectType || 'N/A'}</td>
                                        <td>Rs. {quote.projectCost || '0'}</td>
                                        <td><span className={`status-badge ${quote.status?.toLowerCase().replace(/\s+/g, '-') || 'pending'}`}>{quote.status || 'Pending'}</span></td>
                                        <td className="actions-cell">
                                            <button className="edit-btn" onClick={() => handleEdit(quote)} title="Edit">✏️</button>
                                            <button className="delete-btn" onClick={() => handleDelete(quote)} title="Delete">🗑️</button>
                                            <button className="pdf-btn" onClick={() => downloadPDF(quote)} title="Download PDF">📄</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GetQuote;
