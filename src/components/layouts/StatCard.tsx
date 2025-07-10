
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, className = ''  }) => {
  return (
    <motion.div 
        className={`flex flex-col items-center text-center p-4  rounded-lg ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
    >
      <p className="text-4xl md:text-5xl font-extrabold text-[#095AD3]">{value}</p>
      <p className="mt-2 text-[#999999] max-w-[200px]">{label}</p>
    </motion.div>
  );
};

export default StatCard;
