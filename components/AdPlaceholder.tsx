'use client';

interface AdPlaceholderProps {
  slotType?: 'horizontal' | 'rectangle';
  className?: string;
  adSlotId?: string;
}

export default function AdPlaceholder({
  slotType = 'horizontal',
  className = '',
  adSlotId,
}: AdPlaceholderProps) {
  // If adSlotId is provided in production, you can replace this with actual AdSense <ins> script
  return (
    <div className={`my-8 flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1.5">
        Advertisement
      </span>
      <div
        className={`w-full border border-dashed border-slate-300 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-center text-xs text-slate-400 select-none ${
          slotType === 'horizontal'
            ? 'min-h-[90px] max-w-[728px] h-[90px]'
            : 'min-h-[250px] max-w-[300px] h-[250px]'
        }`}
      >
        <span className="text-slate-400 dark:text-slate-600 font-mono text-xs">
          {adSlotId ? `Ad Slot #${adSlotId}` : 'Responsive Ad Unit (728x90 / 300x250)'}
        </span>
      </div>
    </div>
  );
}
