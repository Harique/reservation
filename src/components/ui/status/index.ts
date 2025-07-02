import { cva, type VariantProps } from 'class-variance-authority'

export { default as Status } from './Status.vue'

export const statusVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        Active:
          'bg-[#E8FFF3] text-[#50CD89] w-[51px] h-[26px] rounded-[4px] font-semibold leading-[12px] text-xs',
        Reserved:
          'bg-[#FFF8DD] text-[#F6C000] w-[69px] h-[26px] rounded-[4px] font-semibold leading-[12px] text-xs',
        Finished:
          'bg-[#FFF5F8] text-[#F1416C] w-[64px] h-[26px] rounded-[4px] font-semibold leading-[12px] text-xs',
        Cancelled:
          'bg-[#FFF5F8] text-[#F1416C] w-[69px] h-[26px] rounded-[4px] font-semibold leading-[12px] text-xs',
        
      },
      
    },
    defaultVariants: {
      variant: 'Reserved',
    },
  },
)

export type ButtonVariants = VariantProps<typeof statusVariants>
