import React from 'react';
import { LayoutDashboard, Bell, User, LogOut, Settings } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ session }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-zinc-800/50 transition-all" style={{height: 80}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Left Side: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              {/* System status indicator */}
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse border border-zinc-900" aria-hidden="true" />
                <span className="font-mono text-2xl font-extrabold tracking-widest uppercase text-zinc-50">
                  WASTE.MAP
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side: Navigation & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {session ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="text-zinc-200 hover:text-zinc-50">
                    <LayoutDashboard className="h-5 w-5" />
                  </Button>
                </Link>
                
                <Button variant="ghost" size="icon" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-zinc-900"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 ml-2 border border-zinc-800">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt="User avatar" />
                        <AvatarFallback className="bg-zinc-800 text-zinc-50">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none uppercase tracking-widest">ACCOUNT</p>
                        <p className="text-xs leading-none text-zinc-400 uppercase tracking-widest">
                          {session?.user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="font-medium hover:bg-zinc-800/50 uppercase tracking-widest">
                  SIGN IN
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
