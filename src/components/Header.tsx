import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "../lib/UserContext";
import { logOut } from "../lib/authActions";
import {
  Home,
  Users,
  Briefcase,
  MessageCircle,
  Bell,
  Search,
  ChevronDown,
  Grid3X3,
  BookOpen,
  Clock,
  Target,
  Rocket
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [searchValue, setSearchValue] = useState("");
  
  // Load notifications from localStorage or use defaults
  const defaultNotifications = [
    {
      id: 1,
      icon: Clock,
      title: "Daily AI Quest Ending Soon",
      message: "5 hours remaining for today's AI quest",
      time: "5 hours left",
      type: "warning",
      action: () => {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector('[data-section="daily-quest"]');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    },
    {
      id: 2,
      icon: Target,
      title: "Weekly Wisdom Quiz",
      message: "1 day remaining for weekly wisdom quiz",
      time: "1 day left",
      type: "info",
      action: () => {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector('[data-section="weekly-wisdom"]');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    },
    {
      id: 3,
      icon: Rocket,
      title: "Intuit Hackathon Started!",
      message: "Intuit hackathon has started - join now!",
      time: "Just started",
      type: "success",
      action: () => {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector('[data-section="hackathons"]');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  ];

  // Initialize notifications state from localStorage
  const [notifications, setNotifications] = useState(() => {
    const savedNotificationsCleared = localStorage.getItem('notifications_cleared');
    return savedNotificationsCleared === 'true' ? [] : defaultNotifications;
  });

  const [unreadCount, setUnreadCount] = useState(() => {
    const savedNotificationsCleared = localStorage.getItem('notifications_cleared');
    return savedNotificationsCleared === 'true' ? 0 : defaultNotifications.length;
  });

  // Function to mark all notifications as read and persist the state
  const markAllAsRead = () => {
    setUnreadCount(0);
    setNotifications([]);
    localStorage.setItem('notifications_cleared', 'true');
  };
  
  const username = user?.email ? user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1) : "Guest";
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "G";

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-4 border-l-amber-500 bg-amber-50 hover:bg-amber-100';
      case 'success':
        return 'border-l-4 border-l-green-500 bg-green-50 hover:bg-green-100';
      case 'info':
      default:
        return 'border-l-4 border-l-blue-500 bg-blue-50 hover:bg-blue-100';
    }
  };

  const getIconStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-amber-600';
      case 'success':
        return 'text-green-600';
      case 'info':
      default:
        return 'text-blue-600';
    }
  };

  return (
    <header 
      id="global-nav" 
      aria-label="Global Navigation"
      className="global-nav fixed top-0 left-0 w-full z-50 bg-white shadow-sm"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
    >
      <div className="global-nav__content">
        <div className="flex items-center h-[52px] max-w-[1128px] mx-auto px-10">
          
          {/* Left section - Logo and Search */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="flex-shrink-0"
            >
              <div className="global-nav__branding-logo">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  className="w-[40px] h-[40px] text-[#0a66c2] fill-current"
                  focusable="false"
                  data-supported-dps="24x24"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </div>
            </a>

            {/* Search Bar */}
            <div className="global-nav__search hidden md:block">
              <div className="search-global-typeahead relative w-[280px] h-[34px]">
                <div className="search-global-typeahead__search-icon-container absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <svg 
                    role="none" 
                    aria-hidden="true" 
                    className="search-global-typeahead__search-icon w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    data-supported-dps="16x16"
                    style={{ color: 'rgba(0,0,0,0.6)' }}
                  >
                    <path d="m13.5 11.5l2.5 2.5l-2 2l-2.5-2.5v-.79l-.27-.28C9.59 14.09 7.91 14.5 6 14.5A6.5 6.5 0 1 1 6 1.5a6.5 6.5 0 0 1 5.23 10.42l.28.27h.79zM6 12.5A5 5 0 1 0 6 2.5a5 5 0 0 0 0 10z" fill="currentColor"></path>
                  </svg>
                </div>
                <input
                  className="search-global-typeahead__input w-full h-full pl-10 pr-3 text-sm focus:outline-none"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  dir="auto"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-label="Search"
                  style={{
                    backgroundColor: 'white',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '1.42857',
                    color: 'rgba(0,0,0,0.9)',
                    border: '1px solid #000',
                    borderRadius: '20px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Spacer between search box and navigation - visible empty space */}
          <div className="flex-1 bg-white min-w-[100px]"></div>

          {/* Primary Navigation - Right aligned */}
          <nav className="global-nav__nav flex-shrink-0" aria-label="Primary Navigation">
            <ul className="global-nav__primary-items flex items-center">
              
              {/* Home */}
              <li className="global-nav__primary-item">
                <a 
                  className="global-nav__primary-link global-nav__primary-link--active flex flex-col items-center justify-center h-[52px] px-2 text-center no-underline relative cursor-pointer"
                  style={{ 
                    color: '#191919',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '1.33333'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                >
                  <div className="global-nav__icon-ivm mb-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      data-supported-dps="24x24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                      focusable="false"
                    >
                      <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"></path>
                    </svg>
                  </div>
                  <span className="global-nav__primary-link-text">Home</span>
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-current"
                    style={{ width: '100%' }}
                  ></div>
                </a>
              </li>

              {/* My Network */}
              <li className="global-nav__primary-item">
                <a 
                  className="global-nav__primary-link flex flex-col items-center justify-center h-[52px] px-2 text-center no-underline relative cursor-pointer hover:text-gray-900"
                  style={{ 
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '1.33333'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/network');
                  }}
                >
                  <div className="global-nav__icon-ivm mb-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      data-supported-dps="24x24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                      focusable="false"
                    >
                      <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
                    </svg>
                  </div>
                  <span className="global-nav__primary-link-text">My Network</span>
                </a>
              </li>

              {/* Hackathons */}
              <li className="global-nav__primary-item">
                <a 
                  className="global-nav__primary-link flex flex-col items-center justify-center h-[52px] px-2 text-center no-underline relative cursor-pointer hover:text-gray-900"
                  style={{ 
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '1.33333'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                    setTimeout(() => {
                      const element = document.querySelector('[data-section="hackathons"]');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                >
                  <div className="global-nav__icon-ivm mb-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      data-supported-dps="24x24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                      focusable="false"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <span className="global-nav__primary-link-text">Hackathons</span>
                </a>
              </li>

              {/* Jobs */}
              <li className="global-nav__primary-item">
                <a 
                  className="global-nav__primary-link flex flex-col items-center justify-center h-[52px] px-2 text-center no-underline relative cursor-pointer hover:text-gray-900"
                  style={{ 
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '1.33333'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/jobs');
                  }}
                >
                  <div className="global-nav__icon-ivm mb-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      data-supported-dps="24x24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                      focusable="false"
                    >
                      <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
                    </svg>
                  </div>
                  <span className="global-nav__primary-link-text">Jobs</span>
                </a>
              </li>

              {/* Messaging */}
              <li className="global-nav__primary-item">
                <a 
                  className="global-nav__primary-link flex flex-col items-center justify-center h-[52px] px-2 text-center no-underline relative cursor-pointer hover:text-gray-900"
                  style={{ 
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '1.33333'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/messaging');
                  }}
                >
                  <div className="global-nav__icon-ivm mb-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      data-supported-dps="24x24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                      focusable="false"
                    >
                      <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
                    </svg>
                  </div>
                  <span className="global-nav__primary-link-text">Messaging</span>
                </a>
              </li>

              {/* Notifications */}
              <li className="global-nav__primary-item">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <a 
                      className="global-nav__primary-link flex flex-col items-center justify-center h-[52px] px-2 text-center no-underline relative cursor-pointer hover:text-gray-900"
                      style={{ 
                        color: 'rgba(0,0,0,0.6)',
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '1.33333'
                      }}
                    >
                      <div className="global-nav__primary-link-notif relative mb-1">
                        {unreadCount > 0 && (
                          <span className="notification-badge notification-badge--show absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1" style={{ fontSize: '11px' }}>
                            <span aria-hidden="true" className="notification-badge__count">{unreadCount}</span>
                            <span className="sr-only">{unreadCount} new notification{unreadCount > 1 ? 's' : ''}</span>
                          </span>
                        )}
                        <div className="global-nav__icon-ivm">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            data-supported-dps="24x24" 
                            fill="currentColor" 
                            className="w-6 h-6"
                            focusable="false"
                          >
                            <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
                          </svg>
                        </div>
                      </div>
                      <span className="global-nav__primary-link-text">Notifications</span>
                    </a>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-0">
                    <div className="px-4 py-3 border-b border-border">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                      <p className="text-sm text-muted-foreground">{unreadCount} new notifications</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => {
                        const Icon = notification.icon;
                        return (
                          <DropdownMenuItem
                            key={notification.id}
                            className={`p-4 cursor-pointer transition-colors ${getNotificationStyles(notification.type)}`}
                            onClick={notification.action}
                          >
                            <div className="flex gap-3 w-full">
                              <div className={`flex-shrink-0 ${getIconStyles(notification.type)}`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <p className="font-medium text-sm text-foreground">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </DropdownMenuItem>
                        );
                      })}
                    </div>
                    <div className="px-4 py-3 border-t border-border">
                      <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-foreground" onClick={markAllAsRead}>
                        Mark all as read
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              {/* Me - User Profile */}
              <li className="global-nav__primary-item">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="global-nav__primary-link global-nav__primary-link-me-menu-trigger flex flex-col items-center justify-center h-[52px] px-2 text-center border-none bg-transparent cursor-pointer hover:text-gray-900"
                      style={{ 
                        color: 'rgba(0,0,0,0.6)',
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '1.33333'
                      }}
                      type="button"
                    >
                      <img 
                        width="24" 
                        height="24" 
                        alt={username}
                        className="global-nav__me-photo w-6 h-6 rounded-full mb-1 bg-gray-400"
                        style={{ 
                          background: 'linear-gradient(180deg, #cacaca 0%, #adadad 100%)',
                          border: 'none'
                        }}
                      />
                      <span className="global-nav__primary-link-text flex items-center">
                        Me
                        <svg 
                          role="none" 
                          aria-hidden="true" 
                          className="global-nav__icon global-nav__icon--small ml-1 w-3 h-3" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          data-supported-dps="16x16"
                        >
                          <path d="M8.8 10.66L14 5.12l-.8-.72L8 9.34 2.8 4.4l-.8.72z" fill="currentColor"></path>
                        </svg>
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={async () => {
                        await logOut();
                        setUser(null);
                        navigate("/auth-demo");
                      }}
                      className="text-red-600"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              {/* For Business */}
              <li className="global-nav__primary-item global-nav__primary-item--divider pl-2 ml-2" style={{ borderLeft: '1px solid rgba(0,0,0,0.15)' }}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="global-nav__primary-link global-nav__primary-link-app-launcher-menu-trigger flex flex-col items-center justify-center h-[52px] px-2 text-center border-none bg-transparent cursor-pointer hover:text-gray-900"
                      style={{ 
                        color: 'rgba(0,0,0,0.6)',
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '1.33333'
                      }}
                      type="button"
                    >
                      <div className="global-nav__icon-ivm mb-1">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          data-supported-dps="24x24" 
                          fill="currentColor" 
                          className="w-6 h-6"
                          focusable="false"
                        >
                          <path d="M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z"></path>
                        </svg>
                      </div>
                      <span className="global-nav__primary-link-text flex items-center">
                        For Business
                        <svg 
                          role="none" 
                          aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          data-supported-dps="16x16"
                          className="ml-1 w-3 h-3"
                        >
                          <path d="M8.8 10.66L14 5.12l-.8-.72L8 9.34 2.8 4.4l-.8.72z" fill="currentColor"></path>
                        </svg>
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      Business Solutions
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Advertise
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              {/* Learning */}
              <li className="global-nav__primary-item">
                <a 
                  className="global-nav__primary-link flex flex-col items-center justify-center h-[52px] px-2 text-center no-underline relative cursor-pointer hover:text-gray-900"
                  style={{ 
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '1.33333'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/learning');
                  }}
                >
                  <div className="global-nav__icon-ivm mb-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      data-supported-dps="24x24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                      focusable="false"
                    >
                      <path d="M22 5v14H2V5h20m1-2H1a1 1 0 00-1 1v16a1 1 0 001 1h22a1 1 0 001-1V4a1 1 0 00-1-1z"></path>
                      <path d="M2 5v14h10V5H2zm8 12H4v-2h6v2zm0-4H4v-2h6v2zm0-4H4V7h6v2z" style={{ isolation: 'isolate', opacity: '.25' }}></path>
                      <path style={{ isolation: 'isolate', opacity: '.6' }} d="M14 7h6v2h-6zM14 11h6v2h-6zM14 15h6v2h-6z"></path>
                      <path d="M10 7.53v8.93a.28.28 0 00.44.23l6.43-4.44a.33.33 0 00.06-.46l-.06-.06-6.43-4.43a.28.28 0 00-.44.23z"></path>
                    </svg>
                  </div>
                  <span className="global-nav__primary-link-text">Learning</span>
                </a>
              </li>

            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
