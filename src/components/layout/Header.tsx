
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../logo/Logo';
import { useLanguage } from '@/contexts/LanguageContext';
import { BellRing, User, Globe, MenuIcon } from 'lucide-react';
import useUserStore from '@/lib/userStore';
import { isAdminLoggedIn, logoutAdmin } from '@/lib/adminService';
import { asLanguageOption } from '@/lib/typeUtils';

interface HeaderProps {
  handleLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage } = useLanguage();
  const { isAuthenticated, currentUser } = useUserStore();
  const adminLoggedIn = isAdminLoggedIn();

  // Check if we're on a public page
  const isPublicPage = ['/landing', '/marketing', '/blog', '/about', '/services', '/features', '/pricing', '/terms', '/careers', '/privacy'].some(
    path => location.pathname.startsWith(path)
  );

  const onLogout = () => {
    // Handle admin logout separately
    if (adminLoggedIn) {
      logoutAdmin();
      navigate('/landing');
      return;
    }
    
    // Regular user logout
    if (handleLogout) {
      handleLogout();
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={adminLoggedIn ? '/blog' : isAuthenticated ? '/dashboard' : '/landing'}>
            <Logo />
          </Link>
        </div>
          
        <div className="flex items-center gap-3">
          {/* Public navigation for marketing pages */}
          {isPublicPage && (
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => navigate('/about')}
              >
                About Us
              </Button>
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => navigate('/services')}
              >
                Services
              </Button>
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => navigate('/features')}
              >
                Features
              </Button>
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => navigate('/pricing')}
              >
                Pricing
              </Button>
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => navigate('/blog')}
              >
                Blog
              </Button>
            </div>
          )}
          
          <div className="flex items-center gap-2 ml-auto">
            <Globe className="h-4 w-4 text-royal-blue" />
            <select 
              className="text-sm border-none bg-transparent focus:ring-0"
              value={language}
              onChange={(e) => changeLanguage(asLanguageOption(e.target.value))}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>
          
          {!isAuthenticated && !adminLoggedIn && (
            <>
              <Button
                variant="outline"
                className="text-royal-blue border-royal-blue hover:bg-royal-blue/10"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                className="bg-royal-blue hover:bg-royal-blue/90 text-white"
                onClick={() => navigate('/login', { state: { defaultTab: 'signup' } })}
              >
                Sign Up
              </Button>
            </>
          )}
          
          {(isAuthenticated || adminLoggedIn) && (
            <div className="flex items-center gap-2">
              {isAuthenticated && !adminLoggedIn && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/saved-nudges')}
                  className="relative"
                >
                  <BellRing className="h-5 w-5" />
                  {currentUser?.savedNudges?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-saffron-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {currentUser.savedNudges.length}
                    </span>
                  )}
                </Button>
              )}
              
              {isAuthenticated && !adminLoggedIn && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/profile')}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
