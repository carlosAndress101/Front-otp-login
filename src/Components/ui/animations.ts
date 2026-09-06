import { motion, AnimatePresence, type Variants } from 'motion/react';

// Reusable animation variants — subtle, premium feel
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
};

// Auth page entrance
export const authPageEnter: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

// Alert enter/exit
export const alertVariants: Variants = {
  hidden: { opacity: 0, y: -8, height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, height: 0, transition: { duration: 0.15, ease: 'easeIn' } },
};

export { motion, AnimatePresence };
