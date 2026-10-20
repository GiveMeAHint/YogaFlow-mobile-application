import TaskDetailSheet from '../components/task/TaskDetailSheet';
import { useState } from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Начальные данные (имитация бэкенда)
const initialTasks = {
  todo: [
    { id: 'task-1', title: 'Настроить вход через Google', priority: 'Высокий', points: 5 },
    { id: 'task-2', title: 'Добавить восстановление пароля', priority: 'Средний', points: 3 },
  ],
  inProgress: [
    { id: 'task-3', title: 'Реализовать фильтры на доске', priority: 'Высокий', points: 5 },
  ],
  review: [
    { id: 'task-4', title: 'Проверить доступность навигации', priority: 'Средний', points: 2 },
  ],
  done: [],
};

export default function BoardPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Находим, в какой колонке сейчас лежит перетаскиваемая карточка
    const activeColumn = Object.keys(tasks).find((col) => tasks[col].find((t) => t.id === activeId));
    
    // Находим, над какой колонкой или карточкой мы отпустили мышь
    const overColumn = Object.keys(tasks).find((col) => col === overId || tasks[col].find((t) => t.id === overId));

    if (!activeColumn || !overColumn) return;

    // Если перетащили в другую колонку
    if (activeColumn !== overColumn) {
      const activeItems = tasks[activeColumn];
      const overItems = tasks[overColumn];
      const activeIndex = activeItems.findIndex((t) => t.id === activeId);
      const overIndex = overItems.findIndex((t) => t.id === overId);

      let newIndex;
      if (overId in tasks) {
        newIndex = overItems.length + 1;
      } else {
        newIndex = overIndex >= 0 ? overIndex : overItems.length + 1;
      }

      const movedTask = activeItems[activeIndex];

      setTasks((prev) => ({
        ...prev,
        [activeColumn]: prev[activeColumn].filter((t) => t.id !== activeId),
        [overColumn]: [
          ...prev[overColumn].slice(0, newIndex),
          movedTask,
          ...prev[overColumn].slice(newIndex, prev[overColumn].length),
        ],
      }));
    } else {
      // Если перетащили внутри одной колонки (меняем порядок)
      const activeIndex = tasks[activeColumn].findIndex((t) => t.id === activeId);
      const overIndex = tasks[activeColumn].findIndex((t) => t.id === overId);
      setTasks((prev) => ({
        ...prev,
        [activeColumn]: arrayMove(prev[activeColumn], activeIndex, overIndex),
      }));
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const activeColumn = Object.keys(tasks).find((col) => tasks[col].find((t) => t.id === active.id));
    const task = tasks[activeColumn].find((t) => t.id === active.id);
    setActiveTask(task);
  };

  

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Доска</h1>
      
      <div className="flex gap-2 mb-6">
        <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50">👤 Исполнитель</button>
        <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50">📊 Приоритет</button>
        <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50">🏷️ Метки</button>
        <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50">🔄 Спринт</button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 items-start flex-1">
          <BoardColumn id="todo" title="К работе" tasks={tasks.todo} onTaskClick={setSelectedTask} />
          <BoardColumn id="inProgress" title="В работе" tasks={tasks.inProgress} onTaskClick={setSelectedTask} />
          <BoardColumn id="review" title="На проверке" tasks={tasks.review} onTaskClick={setSelectedTask} />
          <BoardColumn id="done" title="Готово" tasks={tasks.done} onTaskClick={setSelectedTask} />
        </div>
        <TaskDetailSheet 
          isOpen={!!selectedTask} 
          onClose={() => setSelectedTask(null)} 
          task={selectedTask} 
        />
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// Компонент колонки
function BoardColumn({ id, title, tasks, onTaskClick }) {
  const { setNodeRef } = useSortable({ id });

  return (
    <div ref={setNodeRef} className="w-80 shrink-0 bg-gray-100/50 rounded-xl p-3 flex flex-col gap-3 min-h-[500px]">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          {title} <span className="text-gray-400 font-normal">{tasks.length}</span>
        </h2>
        <button className="text-gray-400 hover:text-gray-700">+</button>
      </div>
      
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
      </SortableContext>

      <button className="text-sm text-gray-500 hover:text-gray-800 text-left px-1 py-1">+ Добавить задачу</button>
    </div>
  );
}

// Компонент карточки
function TaskCard({ task, isOverlay, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Если это overlay (летит за мышкой) — opacity 1 и сильная тень. Если перетаскивается на месте — полупрозрачная.
    opacity: isOverlay ? 1 : (isDragging ? 0.4 : 1), 
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`bg-white p-3 rounded-lg border border-gray-200 cursor-grab active:cursor-grabbing hover:border-indigo-300 transition-colors ${
        isOverlay ? 'shadow-2xl border-indigo-400 rotate-2 scale-105' : 'shadow-sm'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400">{task.id}</span>
        <span className="text-xs font-medium text-orange-500">▲ {task.priority}</span>
      </div>
      <h3 className="text-sm font-medium mb-3">{task.title}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded">◇ {task.points}</span>
        <div className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">АК</div>
      </div>
    </div>
  );
}