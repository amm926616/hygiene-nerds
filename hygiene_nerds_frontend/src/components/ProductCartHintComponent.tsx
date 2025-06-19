import { motion, AnimatePresence } from "framer-motion";

export const RightClickHintComponent = ({ show }: { show: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 10 }}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
        >
          <div className="flex items-center gap-2">
            <span>Double click to see checkout items</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            ></motion.div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-600" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
