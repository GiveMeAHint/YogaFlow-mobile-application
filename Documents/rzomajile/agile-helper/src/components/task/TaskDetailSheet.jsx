export default function TaskDetailSheet({ isOpen, onClose, task }) {
  // Если панель закрыта, мы её не рендерим (не показываем на экране)
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Затемненный фон (оверлей), при клике на который панель закрывается */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Сама панель */}
      <div className="relative w-[600px] max-w-full bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        
        {/* Шапка панели */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">{task.id}</span>
            <span className="text-sm font-medium text-orange-500 bg-orange-50 px-2 py-0.5 rounded">▲ {task.priority}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-gray-700 p-1.5 hover:bg-gray-100 rounded-md transition-colors">✏️</button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1.5 hover:bg-gray-100 rounded-md transition-colors text-xl leading-none">×</button>
          </div>
        </div>

        {/* Основной контент */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          {/* Заголовок */}
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>

          {/* Сетка метаданных (как в Jira) */}
          <div className="grid grid-cols-[140px_1fr] gap-y-4 text-sm items-center">
            <span className="text-gray-500">Исполнитель</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">АК</div>
              <span className="text-gray-800">Анастасия</span>
            </div>

            <span className="text-gray-500">Приоритет</span>
            <div><span className="border border-gray-200 px-2 py-1 rounded-md text-gray-700">{task.priority}</span></div>

            <span className="text-gray-500">Оценка (SP)</span>
            <div><span className="border border-gray-200 px-2 py-1 rounded-md text-gray-700">{task.points}</span></div>

            <span className="text-gray-500">Спринт</span>
            <div><span className="text-indigo-600 hover:underline cursor-pointer">Спринт 1</span></div>
          </div>

          {/* Описание */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-900">Описание</h3>
            <div className="text-sm text-gray-600 border border-gray-200 rounded-lg p-3 bg-gray-50 min-h-[100px]">
              Нажмите, чтобы добавить подробное описание задачи...
            </div>
          </div>

          {/* Кнопка ИИ */}
          <button className="w-full py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
            ✨ Спросить ИИ-ассистента
          </button>
        </div>
      </div>
    </div>
  );
}