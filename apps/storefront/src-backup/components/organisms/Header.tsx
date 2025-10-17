import { Link } from 'react-router-dom';
import { ShoppingCart, Bot, Package } from 'lucide-react';
import { useCart } from '../../lib/store';
import { Button } from '../atoms/Button';

interface HeaderProps {
  onAssistantToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAssistantToggle }) => {
  const totalItems = useCart(state => state.getTotalItems());

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-primary">
          ShopLite
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-primary transition">
            Catalog
          </Link>
          <Link to="/order/LSC1234567" className="text-gray-700 hover:text-primary transition flex items-center">
            <Package size={18} className="mr-1" />
            Order Check
          </Link>
          
          <Button variant="ghost" className="relative" onClick={onAssistantToggle}>
            <Bot size={20} className="text-primary" />
            <span className="sr-only">Toggle Assistant</span>
          </Button>

          <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <ShoppingCart size={24} className="text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export const Footer = () => (
    <footer className="bg-gray-800 text-white mt-auto py-4">
        <div className="container mx-auto px-4 text-center text-sm">
            © {new Date().getFullYear()} ShopLite Demo | RAG Assignment
        </div>
    </footer>
);