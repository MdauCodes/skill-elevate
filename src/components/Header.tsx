import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, ChevronDown, User, Bell } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { categories } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16 gap-4">
          {/* Left: Logo + Categories */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <Logo size="md" />

            {/* Categories Dropdown - Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden lg:flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Categories
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-background border-border">
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.id} asChild>
                    <Link to={`/courses?category=${cat.slug}`} className="cursor-pointer">
                      {cat.name}
                      <span className="ml-auto text-xs text-muted-foreground">{cat.courseCount}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Center: Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for anything"
                className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </form>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            {/* Teach Link - Desktop */}
            <Link 
              to="/become-tutor" 
              className="hidden lg:block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Teach on Mwanzo
            </Link>

            {/* Cart */}
            <button 
              className="relative p-2 rounded-md text-foreground hover:bg-muted transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 rounded-md text-foreground hover:bg-muted transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                </button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-muted transition-colors">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover border border-border"
                      />
                      <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background border-border">
                    <div className="px-3 py-2">
                      <p className="font-medium text-foreground">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">My Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/courses" className="cursor-pointer">My Courses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/certificates" className="cursor-pointer">Certificates</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" asChild size="sm" className="text-foreground hover:text-primary">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Below header */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for anything"
                className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                to="/courses"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                All Courses
              </Link>
              <Link
                to="/jobs"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                Jobs
              </Link>
              <Link
                to="/become-tutor"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                Teach on Mwanzo
              </Link>

              {/* Categories in Mobile */}
              <div className="px-4 py-2 text-sm font-semibold text-muted-foreground mt-2">Categories</div>
              {categories.slice(0, 5).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/courses?category=${cat.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              
              {!isAuthenticated && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" asChild className="w-full justify-center">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button asChild className="w-full justify-center bg-foreground text-background hover:bg-foreground/90">
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
