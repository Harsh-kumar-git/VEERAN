import { motion } from 'framer-motion';

/**
 * Animated V/checkmark SVG — VEERAN brand mark
 * Draws itself on mount via pathLength animation
 */
export default function VCheckmark({
  size = 24,
  color = 'currentColor',
  animated = true,
  strokeWidth = 2,
  className = ''
}) {
  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M4 13L9 18L20 6"
        variants={animated ? variants : undefined}
        initial={animated ? 'hidden' : undefined}
        animate={animated ? 'visible' : undefined}
      />
    </svg>
  );
}

/**
 * Static inline checkmark for use in lists and badges
 */
export function CheckmarkBadge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-start gap-2.5 ${className}`}>
      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#C8590A]/10 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C8590A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 13L9 18L20 6" />
        </svg>
      </span>
      <span>{children}</span>
    </span>
  );
}

/**
 * Large decorative checkmark for section headers
 */
export function SectionCheckmark({ className = '' }) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      initial={{ scale: 0, rotate: -15 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8590A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M4 13L9 18L20 6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  );
}
