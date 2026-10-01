import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { 
  Car, 
  Cctv, 
  Activity, 
  Factory, 
  Bot, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const UseCasesSection: React.FC = () => {
  const useCases = [
    {
      icon: <Car className="w-6 h-6 text-cyan-400" />,
      title: 'Autonomous Systems & AVs',
      tag: 'Critical Safety',
      description: 'Validate camera streams before autopilot planners execute braking or steering decisions. Intercept adversarial road signs in real time.',
      benefits: ['Shields against adversarial road stickers', 'Detects camera lens precipitation', 'Prevents erroneous lane departures']
    },
    {
      icon: <Cctv className="w-6 h-6 text-indigo-400" />,
      title: 'Smart Surveillance & Security',
      tag: 'Integrity Defense',
      description: 'Identify video feed splicing, looping, or synthetic clone artifacts before security operators or automated alarm triggers act.',
      benefits: ['Detects video frame looping attacks', 'Flags digital object splicing', 'Verifies camera hardware timestamping']
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      title: 'Medical Imaging Pipelines',
      tag: 'Quality Envelope',
      description: 'Provide an integrity check around radiology image processing to flag scanner artifacts or compression corruption prior to clinician review.',
      benefits: ['Verifies DICOM compression consistency', 'Flags scanner motion blur artifacts', 'Provides audit trail for compliance']
    },
    {
      icon: <Factory className="w-6 h-6 text-amber-400" />,
      title: 'Industrial Machine Vision',
      tag: 'Defect Assurance',
      description: 'Monitor quality and illumination consistency on high-speed factory inspection lines to prevent false positive defect alarms.',
      benefits: ['Compensates for optical strobe flicker', 'Verifies surface reflection consistency', 'Reduces false scrap rejection rates']
    },
    {
      icon: <Bot className="w-6 h-6 text-sky-400" />,
      title: 'Robotics & Automation',
      tag: 'Spatial Verification',
      description: 'Detect unusual visual inputs and sensor occlusions before robotic arms or automated guided vehicles (AGVs) initiate physical actuation.',
      benefits: ['Validates depth & RGB consistency', 'Prevents collisions from blinded sensors', 'Provides emergency fallback triggers']
    }
  ];

  return (
    <section className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3">
            DEPLOYMENT DOMAINS
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Where TrustVision Protects Mission-Critical Vision
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Enterprise computer-vision systems rely on high-integrity visual feeds to make autonomous, financial, and operational decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, idx) => (
            <GlassCard key={idx} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {uc.icon}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {uc.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {uc.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {uc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-1.5">
                {uc.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}

          {/* Compliance Card */}
          <GlassCard className="p-6 bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-3">
                <AlertCircle className="w-4 h-4" />
                SECURITY ASSURANCE NOTICE
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Defense-in-Depth Layer
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                TrustVision acts as an external watchdog that does not alter internal model weights, enabling zero-downtime integration with existing PyTorch, TensorFlow, and ONNX backends.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
              API COMPATIBLE: REST / gRPC / WebRTC
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
};
