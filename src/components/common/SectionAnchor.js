import React, { useState } from 'react';
import { Link2, Check } from 'lucide-react';

const copyToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

const SectionAnchor = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    await copyToClipboard(url);
    window.history.replaceState(null, '', `#${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy link to this section"
      title={copied ? 'Copied!' : 'Copy link'}
      className="inline-flex items-center justify-center p-1 rounded-full text-slate-300 hover:text-primary hover:bg-slate-900/5 transition-colors align-middle"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
    </button>
  );
};

export default SectionAnchor;
