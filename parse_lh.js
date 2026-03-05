const fs = require('fs');

try {
  const raw = fs.readFileSync('/Users/omarkhaled/Desktop/my projects/badran-hospital/front/lighthouse.json', 'utf8');
  const lh = JSON.parse(raw);
  
  let out = "CORE WEB VITALS & METRICS:\n";
  const mKeys = [
    'first-contentful-paint', 
    'largest-contentful-paint', 
    'cumulative-layout-shift', 
    'total-blocking-time', 
    'interaction-to-next-paint',
    'speed-index', 
    'server-response-time',
    'interactive'
  ];
  
  for (const k of mKeys) {
    if (lh.audits[k]) {
      out += `- ${lh.audits[k].title} (${k}): ${lh.audits[k].displayValue || (lh.audits[k].numericValue + 'ms') || lh.audits[k].score}\n`;
    }
  }
  
  out += "\nFAILING/OPPORTUNITY AUDITS (<0.9 or fail):\n";
  const cats = lh.categories;
  for (const catId in cats) {
    const cat = cats[catId];
    out += `\n=== CATEGORY: ${cat.title} ===\n`;
    for (const ref of cat.auditRefs) {
      const audit = lh.audits[ref.id];
      if (!audit) continue;
      
      // We consider score !== null and < 0.9, but skip purely informative or not applicable.
      // scoreDisplayMode: 'metricSavings', 'binary', 'numeric', 'informative', 'notApplicable', 'error'
      if (audit.scoreDisplayMode === 'informative' || audit.scoreDisplayMode === 'notApplicable') continue;
      
      const isFail = audit.score !== null && audit.score < 0.9;
      const isOpp = audit.details && audit.details.type === 'opportunity' && (audit.details.overallSavingsMs > 0 || audit.details.overallSavingsBytes > 0);
      const isError = audit.scoreDisplayMode === 'error';
      
      if (isFail || isOpp || isError) {
        out += `\n-> AUDIT: ${audit.id} | ${audit.title}\n`;
        out += `   Score: ${audit.score} | Mode: ${audit.scoreDisplayMode} | Value: ${audit.displayValue || 'N/A'}\n`;
        if (audit.details && audit.details.type === 'opportunity') {
            out += `   Savings: ${audit.details.overallSavingsMs || 0}ms, ${audit.details.overallSavingsBytes || 0} bytes\n`;
        }
        if (audit.details && audit.details.items && audit.details.items.length > 0) {
          out += `   Items:\n`;
          let limit = Math.min(10, audit.details.items.length); // get up to 10 items
          for (let i=0; i<limit; i++) {
             out += `     - ${JSON.stringify(audit.details.items[i]).substring(0, 300)}\n`;
          }
          if (audit.details.items.length > 10) out += `     ... (${audit.details.items.length - 10} more)\n`;
        }
        // grab metric savings if applicable
        if (audit.metricSavings) {
             out += `   Metric Savings: ${JSON.stringify(audit.metricSavings)}\n`;
        }
      }
    }
  }
  
  fs.writeFileSync('/Users/omarkhaled/Desktop/my projects/badran-hospital/front/lh_summary.txt', out);
  console.log('Saved to lh_summary.txt');
} catch (e) {
  console.error(e);
}
