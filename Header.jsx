import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Upload',
      path: '/video-upload-dashboard',
      icon: 'Upload',
      tooltip: 'Upload video files for processing'
    },
    {
      label: 'Edit',
      path: '/metadata-editor',
      icon: 'Edit3',
      tooltip: 'Edit metadata and FPS settings'
    },
    {
      label: 'Process',
      path: '/processing-center',
      icon: 'Play',
      tooltip: 'Monitor processing operations'
    },
    {
      label: 'Results',
      path: '/results-summary',
      icon: 'Download',
      tooltip: 'View and download processed files'
    },
    {
      label: 'History',
      path: '/processing-history',
      icon: 'History',
      tooltip: 'View processing history and logs'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Video" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-text-primary leading-tight">
              G9 Store FPS
            </h1>
            <span className="text-xs text-text-secondary leading-none">
              Professional Video Processing
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                nav-transition focus-ring
                ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={16} 
                color={isActivePath(item?.path) ? 'currentColor' : 'currentColor'} 
              />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="w-10 h-10"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-1001 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 right-0 w-64 bg-surface border-l border-border shadow-lg z-1002 md:hidden">
            <nav className="p-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium
                    nav-transition focus-ring text-left
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    color="currentColor" 
                  />
                  <div className="flex flex-col">
                    <span>{item?.label}</span>
                    <span className="text-xs opacity-75">{item?.tooltip}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
