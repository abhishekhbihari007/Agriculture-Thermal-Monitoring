import { Link, useLocation } from "react-router-dom";
import { Menu, X, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Parameters", path: "/parameters" },
    { name: "Crops", path: "/crops" },
    { name: "Reports", path: "/reports" },
    { name: "Dataset Collection", path: "/dataset-collection" },
    { name: "Technology", path: "/technology" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
              <img 
                src="/logo.png" 
                alt="AgroTherm Monitor Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden font-semibold text-lg sm:inline-block">AgroTherm Monitor</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className="transition-colors"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <Link to="/settings">
              <Button
                variant={isActive("/settings") ? "default" : "ghost"}
                size="sm"
                className="transition-colors"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant={isActive("/settings") ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      
    </nav>
  );
};

export default Navbar;
