import { AnalysisResult } from '../types';

export function printAnalysisReport(result: AnalysisResult): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print/export the analysis report.');
    return;
  }

  const isTrusted = result.metrics.status === 'TRUSTED';
  const isCaution = result.metrics.status === 'CAUTION';
  const statusColor = isTrusted ? '#10b981' : isCaution ? '#f59e0b' : '#ef4444';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>TrustVision Audit Report — ${result.id}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          background: #ffffff;
          margin: 0;
          padding: 40px;
          line-height: 1.5;
        }
        .header {
          border-bottom: 2px solid #0f172a;
          padding-bottom: 20px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .brand {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #0f172a;
        }
        .brand span {
          color: #0284c7;
        }
        .meta {
          font-size: 12px;
          color: #64748b;
          text-align: right;
        }
        .summary-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 30px;
          display: flex;
          gap: 30px;
          align-items: center;
        }
        .score-circle {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 6px solid ${statusColor};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }
        .score-val {
          font-size: 32px;
          font-weight: 900;
          color: ${statusColor};
          line-height: 1;
        }
        .score-lbl {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748b;
          margin-top: 4px;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 12px;
          color: #ffffff;
          background: ${statusColor};
          margin-bottom: 8px;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 30px;
        }
        .metric-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 16px;
          border-radius: 6px;
        }
        .metric-title {
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .metric-value {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
        }
        .section-title {
          font-size: 16px;
          font-weight: 700;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
          margin-top: 24px;
          margin-bottom: 12px;
          color: #0f172a;
        }
        .findings-list {
          padding-left: 20px;
          margin-bottom: 24px;
        }
        .findings-list li {
          margin-bottom: 8px;
          font-size: 14px;
          color: #334155;
        }
        .recommendation-box {
          border-left: 4px solid ${statusColor};
          background: #f0fdf4;
          padding: 16px;
          border-radius: 0 6px 6px 0;
          margin-bottom: 30px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          font-size: 11px;
          color: #94a3b8;
          display: flex;
          justify-content: space-between;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">TRUST<span>VISION</span></div>
          <div style="font-size: 13px; color: #475569; margin-top: 2px;">AI Integrity Assurance for Computer Vision Pipelines</div>
        </div>
        <div class="meta">
          <strong>REPORT ID:</strong> ${result.id}<br>
          <strong>TIMESTAMP:</strong> ${result.timestamp} (UTC)<br>
          <strong>OPERATOR / TEAM:</strong> BOOM BOOM<br>
          <strong>INTEGRITY ENGINE:</strong> TrustVision v1.0.4-Core
        </div>
      </div>

      <div class="summary-box">
        <div class="score-circle">
          <div class="score-val">${result.metrics.trustScore}</div>
          <div class="score-lbl">Trust Score</div>
        </div>
        <div>
          <div class="status-badge">${result.metrics.status.replace('_', ' ')}</div>
          <h2 style="margin: 0 0 6px 0; font-size: 18px; color: #0f172a;">${result.recommendation.summary}</h2>
          <p style="margin: 0; font-size: 13px; color: #64748b;">Target Visual Input: <strong>${result.imageName}</strong> | Inference Latency: <strong>${result.processingTimeMs} ms</strong></p>
        </div>
      </div>

      <div class="section-title">INTEGRITY &amp; RISK METRICS</div>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-title">IMAGE QUALITY</div>
          <div class="metric-value">${result.metrics.imageQuality}%</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">MODEL CONFIDENCE</div>
          <div class="metric-value">${result.metrics.modelConfidence}%</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">CONSISTENCY SCORE</div>
          <div class="metric-value">${result.metrics.consistencyScore}%</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">ANOMALY RISK</div>
          <div class="metric-value" style="color: ${result.metrics.anomalyRisk > 30 ? '#ef4444' : '#0f172a'};">${result.metrics.anomalyRisk}%</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">MANIPULATION RISK</div>
          <div class="metric-value" style="color: ${result.metrics.manipulationRisk > 30 ? '#ef4444' : '#0f172a'};">${result.metrics.manipulationRisk}%</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">ADVERSARIAL RISK</div>
          <div class="metric-value" style="color: ${result.metrics.adversarialRisk > 30 ? '#ef4444' : '#0f172a'};">${result.metrics.adversarialRisk}%</div>
        </div>
      </div>

      <div class="section-title">KEY INTEGRITY FINDINGS</div>
      <ul class="findings-list">
        ${result.keyFindings.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <div class="section-title">RECOMMENDED ACTION &amp; POLICY DIRECTIVE</div>
      <div class="recommendation-box" style="background: ${isTrusted ? '#f0fdf4' : isCaution ? '#fffbeb' : '#fef2f2'}; border-color: ${statusColor};">
        <strong style="color: ${statusColor}; font-size: 14px;">POLICY DECISION: ${result.recommendation.action}</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 13px; color: #334155;">
          ${result.recommendation.details.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>

      <div class="section-title">SAMPLE VISION MODEL OUTPUT</div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 30px;">
        <thead>
          <tr style="background: #f1f5f9; text-align: left;">
            <th style="padding: 8px 12px; border: 1px solid #e2e8f0;">Detected Anchor</th>
            <th style="padding: 8px 12px; border: 1px solid #e2e8f0;">Softmax Confidence</th>
            <th style="padding: 8px 12px; border: 1px solid #e2e8f0;">Integrity Status</th>
          </tr>
        </thead>
        <tbody>
          ${result.detections.map(d => `
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: 600;">${d.label}</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${d.confidence}%</td>
              <td style="padding: 8px 12px; border: 1px solid #e2e8f0; color: ${d.anomalyFlag ? '#ef4444' : '#10b981'}; font-weight: 600;">
                ${d.anomalyFlag ? '⚠ ANOMALY / PERTURBED' : '✓ VERIFIED'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        <div>TRUSTVISION — AI Integrity Assurance Layer | Built by <strong>BOOM BOOM</strong></div>
        <div>CONFIDENTIAL AUDIT LOG — Generated for Hackathon Demonstration</div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(() => {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
