
import { motion } from 'framer-motion';

interface ProgressBarProps {
  label: string;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1 text-gray-300 font-medium">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="bg-white h-2.5 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true, amount: 0.8 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
