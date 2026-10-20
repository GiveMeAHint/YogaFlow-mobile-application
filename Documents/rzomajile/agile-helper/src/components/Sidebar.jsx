export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-screen flex flex-col p-4">
      {/* Логотип */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">Р</div>
        <span className="font-bold text-xl">Ржомба</span>
      </div>
      
      {/* Навигация */}
      <nav className="flex flex-col gap-1">
        <a href="#" className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Проекты</a>
        <a href="#" className="px-3 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-md">Доска</a>
        <a href="#" className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Бэклог</a>
        <a href="#" className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Спринты</a>
        <a href="#" className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Аналитика</a>
        <a href="#" className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Настройки</a>
      </nav>
    </aside>
  );
}