import React from "react";

const whatsappNumber = "916369830134"; // No + or spaces for wa.me link
const defaultMessage = encodeURIComponent("Hello I need to know about your counseling services");
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

const WhatsAppFloatButton = () => (
  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat for Counseling on WhatsApp"
    className="whatsapp-float-btn"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style={{ marginRight: 8 }}
    >
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path
        d="M23.472 19.339c-.355-.177-2.104-1.037-2.43-1.156-.326-.119-.563-.177-.8.178-.237.355-.914 1.156-1.12 1.393-.207.237-.414.267-.769.089-.355-.178-1.5-.553-2.857-1.763-1.056-.944-1.77-2.108-1.98-2.463-.207-.355-.022-.546.155-.723.159-.158.355-.414.533-.622.178-.207.237-.355.355-.592.119-.237.06-.444-.03-.622-.089-.178-.8-1.924-1.096-2.637-.289-.693-.583-.599-.8-.61-.207-.009-.444-.011-.681-.011-.237 0-.622.089-.948.444-.326.355-1.24 1.211-1.24 2.955 0 1.744 1.27 3.429 1.447 3.669.178.237 2.5 3.82 6.063 5.209.849.292 1.51.466 2.027.596.851.203 1.626.174 2.238.106.682-.076 2.104-.859 2.403-1.689.296-.83.296-1.541.207-1.689-.089-.148-.326-.237-.681-.414z"
        fill="#fff"
      />
    </svg>
    <span style={{ fontWeight: 600, letterSpacing: 0.5 }}>Chat for COUNSELING</span>
  </a>
);

export default WhatsAppFloatButton; 