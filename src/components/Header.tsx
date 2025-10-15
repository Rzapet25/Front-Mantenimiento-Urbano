import { Search, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  username?: string;
}

export default function Header({ 
  title, 
  searchTerm = '', 
  onSearchChange, 
  showSearch = true,
  username = 'Usuario'
}: HeaderProps) {
  return (
    <header className="bg-green-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center gap-4">
          {showSearch && onSearchChange && (
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar solicitudes..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          )}
          <button className="p-2 hover:bg-green-400 rounded-lg transition">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-700 font-semibold">{username.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-gray-700 font-medium">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
