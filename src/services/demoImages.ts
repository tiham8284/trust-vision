// High-quality SVG-based demo images for instant local rendering with zero network dependency

export const DEMO_IMAGES = {
  normal: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f2027"/>
          <stop offset="50%" stop-color="#203a43"/>
          <stop offset="100%" stop-color="#2c5364"/>
        </linearGradient>
        <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="carGrad1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
        <linearGradient id="carGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#475569"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
      </defs>
      <!-- Background / Sky -->
      <rect width="800" height="500" fill="url(#skyGrad)"/>
      
      <!-- Distant City Skyline -->
      <path d="M 50 260 L 50 180 L 110 180 L 110 260 L 140 260 L 140 140 L 200 140 L 200 260 L 250 260 L 250 200 L 320 200 L 320 260 L 480 260 L 480 160 L 540 160 L 540 260 L 620 260 L 620 190 L 680 190 L 680 260 L 750 260 L 750 210 L 800 210 L 800 260 Z" fill="#1e293b" opacity="0.6"/>
      <!-- Window grid on skyline -->
      <circle cx="160" cy="160" r="2" fill="#38bdf8" opacity="0.8"/>
      <circle cx="180" cy="180" r="2" fill="#38bdf8" opacity="0.8"/>
      <circle cx="500" cy="180" r="2" fill="#38bdf8" opacity="0.8"/>
      <circle cx="520" cy="200" r="2" fill="#38bdf8" opacity="0.8"/>
      
      <!-- Ground & Road -->
      <rect y="260" width="800" height="240" fill="url(#roadGrad)"/>
      <polygon points="100,500 350,260 450,260 700,500" fill="#111827"/>
      
      <!-- Lane Markings (Crisp, High Quality) -->
      <polygon points="395,260 405,260 415,500 385,500" fill="#facc15" opacity="0.9" stroke="#ca8a04" stroke-width="1"/>
      <line x1="280" y1="460" x2="310" y2="400" stroke="#f8fafc" stroke-width="4" stroke-dasharray="25,25"/>
      <line x1="520" y1="460" x2="490" y2="400" stroke="#f8fafc" stroke-width="4" stroke-dasharray="25,25"/>
      
      <!-- Leading Vehicle (Car 1) -->
      <g transform="translate(330, 275) scale(0.65)">
        <rect x="20" y="30" width="120" height="50" rx="12" fill="url(#carGrad1)"/>
        <rect x="38" y="10" width="84" height="28" rx="6" fill="#0369a1"/>
        <!-- Windows -->
        <rect x="42" y="14" width="36" height="20" rx="3" fill="#bae6fd" opacity="0.85"/>
        <rect x="82" y="14" width="36" height="20" rx="3" fill="#bae6fd" opacity="0.85"/>
        <!-- Headlights / Taillights -->
        <circle cx="28" cy="60" r="6" fill="#ef4444"/>
        <circle cx="132" cy="60" r="6" fill="#ef4444"/>
        <!-- Wheels -->
        <rect x="25" y="70" width="22" height="15" rx="4" fill="#0f172a"/>
        <rect x="113" y="70" width="22" height="15" rx="4" fill="#0f172a"/>
        <!-- License plate -->
        <rect x="65" y="60" width="30" height="10" rx="2" fill="#ffffff"/>
        <text x="80" y="68" font-family="monospace" font-size="7" text-anchor="middle" fill="#000">TV-940</text>
      </g>
      
      <!-- Secondary Vehicle (Right Lane Car) -->
      <g transform="translate(480, 310) scale(0.85)">
        <rect x="20" y="30" width="130" height="52" rx="12" fill="url(#carGrad2)"/>
        <rect x="40" y="8" width="90" height="30" rx="6" fill="#334155"/>
        <rect x="45" y="12" width="38" height="22" rx="3" fill="#e2e8f0" opacity="0.8"/>
        <rect x="88" y="12" width="38" height="22" rx="3" fill="#e2e8f0" opacity="0.8"/>
        <circle cx="30" cy="62" r="7" fill="#ef4444"/>
        <circle cx="140" cy="62" r="7" fill="#ef4444"/>
        <rect x="26" y="72" width="24" height="16" rx="4" fill="#020617"/>
        <rect x="120" y="72" width="24" height="16" rx="4" fill="#020617"/>
      </g>
      
      <!-- Pedestrian on Sidewalk (Left) -->
      <g transform="translate(180, 290)">
        <circle cx="10" cy="10" r="6" fill="#fbbf24"/>
        <rect x="6" y="18" width="8" height="24" rx="3" fill="#38bdf8"/>
        <line x1="8" y1="42" x2="5" y2="65" stroke="#1e293b" stroke-width="3"/>
        <line x1="12" y1="42" x2="16" y2="65" stroke="#1e293b" stroke-width="3"/>
      </g>
      
      <!-- Street Sign: Speed Limit 45 (Crisp) -->
      <g transform="translate(680, 220)">
        <rect x="18" y="50" width="6" height="110" fill="#64748b"/>
        <rect x="0" y="0" width="42" height="52" rx="5" fill="#ffffff" stroke="#000000" stroke-width="3"/>
        <text x="21" y="18" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle" fill="#000">SPEED</text>
        <text x="21" y="28" font-family="sans-serif" font-weight="bold" font-size="9" text-anchor="middle" fill="#000">LIMIT</text>
        <text x="21" y="46" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle" fill="#000">45</text>
      </g>
      
      <!-- Clean Vision HUD Overlays -->
      <rect x="10" y="10" width="780" height="480" fill="none" stroke="#00f0ff" stroke-width="1" opacity="0.3" stroke-dasharray="10,15"/>
      <text x="25" y="35" font-family="monospace" font-size="12" fill="#00f0ff" font-weight="bold">AUTONOMOUS_FEED_CAM_01 // 1080p 60FPS // SHUTTER: 1/500s</text>
      <text x="775" y="35" font-family="monospace" font-size="12" fill="#10b981" font-weight="bold" text-anchor="end">SIGNAL: OPTIMAL (99.4%)</text>
    </svg>
  `)}`,

  low_quality: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <filter id="heavyNoiseBlur" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" result="noise"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.45 0" in="noise" result="coloredNoise"/>
          <feComposite operator="in" in2="SourceGraphic"/>
          <feGaussianBlur stdDeviation="3.2" result="blurred"/>
          <feMerge>
            <feMergeNode in="blurred"/>
            <feMergeNode in="coloredNoise"/>
          </feMerge>
        </filter>
        <radialGradient id="glareGrad" cx="70%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
          <stop offset="40%" stop-color="#f59e0b" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      
      <!-- Dark Grainy Night Scene -->
      <rect width="800" height="500" fill="#090d16" filter="url(#heavyNoiseBlur)"/>
      <polygon points="50,500 320,280 480,280 750,500" fill="#111827" opacity="0.8"/>
      
      <!-- Blurred Vehicle in Rain/Fog -->
      <g transform="translate(300, 270) scale(0.9)" filter="url(#heavyNoiseBlur)">
        <rect x="20" y="30" width="140" height="55" rx="8" fill="#334155"/>
        <rect x="40" y="10" width="95" height="30" rx="4" fill="#1e293b"/>
        <circle cx="30" cy="62" r="10" fill="#dc2626" opacity="0.6"/>
        <circle cx="150" cy="62" r="10" fill="#dc2626" opacity="0.6"/>
      </g>
      
      <!-- Harsh Rain Streaks -->
      <g stroke="#94a3b8" stroke-width="1.2" opacity="0.4">
        <line x1="50" y1="20" x2="30" y2="90"/>
        <line x1="120" y1="60" x2="100" y2="140"/>
        <line x1="220" y1="10" x2="190" y2="120"/>
        <line x1="340" y1="80" x2="310" y2="200"/>
        <line x1="450" y1="40" x2="420" y2="160"/>
        <line x1="560" y1="10" x2="530" y2="130"/>
        <line x1="680" y1="90" x2="650" y2="210"/>
        <line x1="750" y1="30" x2="720" y2="150"/>
        <line x1="180" y1="240" x2="150" y2="350"/>
        <line x1="500" y1="280" x2="470" y2="400"/>
      </g>

      <!-- Night Headlight Glare Flare -->
      <circle cx="560" cy="200" r="180" fill="url(#glareGrad)" style="mix-blend-mode: screen;"/>
      
      <!-- Degraded Frame Overlay -->
      <rect x="0" y="0" width="800" height="500" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.5"/>
      <text x="25" y="35" font-family="monospace" font-size="12" fill="#f59e0b" font-weight="bold">LOW_SNR_WARNING // ISO: 12800 // SEVERE SENSOR NOISE &amp; BLUR</text>
      <text x="775" y="35" font-family="monospace" font-size="12" fill="#f59e0b" font-weight="bold" text-anchor="end">QUALITY DEGRADED (42.1%)</text>
    </svg>
  `)}`,

  manipulated: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="manSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#312e81"/>
        </linearGradient>
      </defs>
      
      <rect width="800" height="500" fill="url(#manSky)"/>
      <rect y="270" width="800" height="230" fill="#0f172a"/>
      <polygon points="120,500 360,270 440,270 680,500" fill="#1e293b"/>
      
      <!-- Real Vehicle (Car A) -->
      <g transform="translate(240, 310) scale(0.85)">
        <rect x="20" y="30" width="130" height="52" rx="10" fill="#ef4444"/>
        <rect x="40" y="10" width="90" height="28" rx="5" fill="#991b1b"/>
        <rect x="45" y="14" width="38" height="20" rx="3" fill="#fee2e2" opacity="0.9"/>
        <rect x="88" y="14" width="38" height="20" rx="3" fill="#fee2e2" opacity="0.9"/>
        <circle cx="30" cy="62" r="7" fill="#fbbf24"/>
        <circle cx="140" cy="62" r="7" fill="#fbbf24"/>
        <!-- Natural Shadow -->
        <ellipse cx="85" cy="88" rx="65" ry="8" fill="#000000" opacity="0.5"/>
      </g>
      
      <!-- SPLICED / CLONED REGION: Duplicate Car pasted with unnatural bounding edge -->
      <g transform="translate(460, 305) scale(0.85)">
        <!-- Manipulation Artifact Box / Splicing Border -->
        <rect x="5" y="0" width="160" height="95" fill="#1e293b" opacity="0.25" stroke="#ef4444" stroke-dasharray="4,4" stroke-width="1.5"/>
        <rect x="20" y="30" width="130" height="52" rx="10" fill="#ef4444"/>
        <rect x="40" y="10" width="90" height="28" rx="5" fill="#991b1b"/>
        <rect x="45" y="14" width="38" height="20" rx="3" fill="#fee2e2" opacity="0.9"/>
        <rect x="88" y="14" width="38" height="20" rx="3" fill="#fee2e2" opacity="0.9"/>
        <circle cx="30" cy="62" r="7" fill="#fbbf24"/>
        <circle cx="140" cy="62" r="7" fill="#fbbf24"/>
        <!-- Missing or Inverted Shadow Angle (Manipulation Tell) -->
        <ellipse cx="95" cy="80" rx="30" ry="4" fill="#000000" opacity="0.15"/>
        <!-- Inconsistent Noise Region Box Tag -->
        <rect x="10" y="-8" width="150" height="16" rx="2" fill="#ef4444"/>
        <text x="85" y="4" font-family="monospace" font-size="9" fill="#fff" font-weight="bold" text-anchor="middle">SPLICING_ANOMALY [ELA: 88%]</text>
      </g>
      
      <!-- Spliced Altered Street Sign (Speed Limit 120 pasted over) -->
      <g transform="translate(670, 210)">
        <rect x="18" y="50" width="6" height="120" fill="#475569"/>
        <rect x="0" y="0" width="46" height="56" rx="4" fill="#ffffff" stroke="#000" stroke-width="2"/>
        <rect x="4" y="24" width="38" height="28" fill="#fef08a" stroke="#ef4444" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="23" y="16" font-family="sans-serif" font-weight="bold" font-size="9" text-anchor="middle" fill="#000">SPEED</text>
        <text x="23" y="44" font-family="sans-serif" font-weight="900" font-size="20" text-anchor="middle" fill="#dc2626">120</text>
      </g>
      
      <!-- Telemetry Overlay -->
      <text x="25" y="35" font-family="monospace" font-size="12" fill="#ef4444" font-weight="bold">INTEGRITY_FLAG // ERROR LEVEL ANALYSIS (ELA) ANOMALY DETECTED</text>
      <text x="775" y="35" font-family="monospace" font-size="12" fill="#ef4444" font-weight="bold" text-anchor="end">MANIPULATION RISK: HIGH (64%)</text>
    </svg>
  `)}`,

  adversarial: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <!-- High Frequency Adversarial Perturbation Pattern -->
        <pattern id="adversarialNoise" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#00f0ff" opacity="0.35"/>
          <rect x="4" y="4" width="4" height="4" fill="#ff0055" opacity="0.4"/>
          <rect x="8" y="0" width="4" height="4" fill="#00ff66" opacity="0.3"/>
          <rect x="12" y="8" width="4" height="4" fill="#ffffff" opacity="0.45"/>
          <rect x="0" y="12" width="4" height="4" fill="#ffff00" opacity="0.3"/>
          <rect x="8" y="12" width="4" height="4" fill="#00f0ff" opacity="0.35"/>
        </pattern>
        <linearGradient id="advRoad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#020617"/>
        </linearGradient>
      </defs>
      
      <!-- Road Scene with Adversarial Noise Grid Layer -->
      <rect width="800" height="500" fill="#0a0f1d"/>
      <rect y="260" width="800" height="240" fill="url(#advRoad)"/>
      <polygon points="120,500 370,260 430,260 680,500" fill="#1e293b"/>
      
      <!-- Standard Stop Sign in Middle of Vision Focus -->
      <g transform="translate(340, 160)">
        <rect x="54" y="110" width="12" height="150" fill="#64748b"/>
        <!-- Octagonal Stop Sign -->
        <polygon points="35,0 85,0 120,35 120,85 85,120 35,120 0,85 0,35" fill="#dc2626" stroke="#ffffff" stroke-width="4"/>
        <text x="60" y="72" font-family="sans-serif" font-weight="900" font-size="28" text-anchor="middle" fill="#ffffff">STOP</text>
      </g>
      
      <!-- PERTURBATION OVERLAY (Simulating Fast Gradient Sign Method / Universal Adversarial Perturbation) -->
      <rect x="280" y="120" width="240" height="220" fill="url(#adversarialNoise)" style="mix-blend-mode: color-dodge;" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="6,4"/>
      
      <!-- High Frequency Gradient vectors visualization -->
      <g stroke="#00f0ff" stroke-width="1" opacity="0.6">
        <line x1="300" y1="140" x2="315" y2="135"/>
        <line x1="350" y1="145" x2="365" y2="155"/>
        <line x1="420" y1="130" x2="435" y2="125"/>
        <line x1="470" y1="160" x2="485" y2="150"/>
        <line x1="310" y1="220" x2="325" y2="230"/>
        <line x1="490" y1="240" x2="505" y2="230"/>
      </g>
      
      <!-- Callout badge -->
      <rect x="290" y="90" width="220" height="22" rx="4" fill="#ef4444"/>
      <text x="400" y="105" font-family="monospace" font-size="10" fill="#ffffff" font-weight="bold" text-anchor="middle">⚠ ADVERSARIAL PERTURBATION DETECTED</text>
      <text x="400" y="365" font-family="monospace" font-size="11" fill="#f87171" font-weight="bold" text-anchor="middle">RAW MODEL: "GREEN LIGHT (89.2%)" — TRUSTVISION: "BLOCKED"</text>
      
      <!-- System Telemetry -->
      <text x="25" y="35" font-family="monospace" font-size="12" fill="#ef4444" font-weight="bold">ADVERSARIAL_ATTACK_SIGNATURE // FGSM / HIGH-FREQ PERTURBATION</text>
      <text x="775" y="35" font-family="monospace" font-size="12" fill="#ef4444" font-weight="bold" text-anchor="end">ADVERSARIAL RISK: HIGH (81%)</text>
    </svg>
  `)}`
};
