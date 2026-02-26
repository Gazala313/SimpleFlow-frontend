import TaskCard from "./TaskCard";

const KanbanBoard = ({ tasks }) => {
  const columns = ["PENDING", "IN_PROGRESS", "COMPLETED"];

  return (
    <div className="flex gap-6">
      {columns.map((status) => (
        <div key={status} className="w-1/3 bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-4">{status}</h3>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
