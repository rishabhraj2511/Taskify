import { AnimatePresence, motion } from 'framer-motion';
import TaskCard from './TaskCard';

const MotionDiv = motion.div;

export default function TaskList({ tasks = [], column, onMove, onDelete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <MotionDiv
            key={task.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              column={column}
              onMove={onMove}
              onDelete={onDelete}
            />
          </MotionDiv>
        ))}
      </AnimatePresence>
    </div>
  );
}
