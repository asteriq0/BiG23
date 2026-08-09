import { motion } from "framer-motion";

function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        delay,
      }}
      viewport={{
        once: true,
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;