import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { baseRoutes, AppRoute } from '#src/router/routes';
interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

export default function Sidebar({ onToggle }: SidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const loadPreline = async () => {
      await import('preline/preline');
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
      }
    };
    loadPreline();
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-gray-100' : '';
  };

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };
  const renderMenu = (routes: AppRoute[], parentId = '') => {
    return routes
      .filter((r) => !r.meta?.hideInSidebar)
      .map((route, index) => {
        const accordionId = `${parentId}-${route.id || route.path || index}`;

        if (route.children?.length) {
          return (
            <li className="hs-accordion" id={accordionId} key={accordionId}>
              <button
                type="button"
                className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
              >
                {route.meta?.icon}
                {route.meta?.title}
                <svg
                  className="hs-accordion-active:block ms-auto hidden w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m18 15-6-6-6 6" />
                </svg>
                <svg
                  className="hs-accordion-active:hidden ms-auto block w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                <ul className="pt-2 ps-7 space-y-1 border-l-2 border-gray-200 ml-3">
                  {renderMenu(route.children, accordionId)}
                </ul>
              </div>
            </li>
          );
        }

        return (
          <li key={accordionId}>
            <Link
              to={`/${route.path}`}
              className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive(
                route.path || ''
              )}`}
            >
              {route.meta?.icon}
              {route.meta?.title}
            </Link>
          </li>
        );
      });
  };


  return (
    <>
      {/* Desktop Toggle Button - Fixed on the right edge of sidebar */}
      <button
        onClick={toggleSidebar}
        className={`hidden lg:flex fixed top-20 z-[70] items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300 ${isCollapsed ? 'left-4' : 'left-60'
          }`}
        aria-label="Toggle Sidebar"
      >
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-gray-950 focus:outline-none focus:bg-gray-900"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="app-sidebar"
          aria-label="Toggle navigation"
          data-hs-overlay="#app-sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Menu
        </button>
      </div>

      {/* Sidebar */}
      <div
        id="app-sidebar"
        className={`hs-overlay [--auto-close:lg] lg:block lg:end-auto lg:bottom-0 w-64 hs-overlay-open:translate-x-0 transition-all duration-300 transform h-full hidden fixed top-0 start-0 bottom-0 z-[60] bg-white border-e border-gray-200 ${isCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'
          } -translate-x-full`}
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex h-full max-h-full flex-col">
          {/* Sidebar Header */}
          <header className="p-4 flex justify-between items-center gap-x-2 border-b border-gray-200">
            <Link to="/" className="flex-none font-semibold text-xl text-black focus:outline-none">
              PLNDAILY
            </Link>

            <div className="lg:hidden">
              <button
                type="button"
                className="flex justify-center items-center size-7 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none focus:bg-gray-100"
                data-hs-overlay="#app-sidebar"
              >
                <svg className="shrink-0 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </header>

          {/* Sidebar Navigation */}
          <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="hs-accordion-group p-3 w-full flex flex-col" data-hs-accordion-always-open>
              <ul className="space-y-1.5">
                {renderMenu(baseRoutes)}
                {/* Home */}
                <li>
                  <Link
                    to="/"
                    className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 font-medium ${isActive('/')}`}
                  >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </Link>
                </li>

                {/* Blog Dropdown */}
                <li className="hs-accordion" id="blog-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Blog
                    <svg className="hs-accordion-active:block ms-auto hidden size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m18 15-6-6-6 6" />
                    </svg>
                    <svg className="hs-accordion-active:hidden ms-auto block size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                    <ul className="pt-2 ps-7 space-y-1">
                      <li>
                        <Link
                          to="/list-blog"
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/list-blog')}`}
                        >
                          Blog List
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/detail-blog"
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/detail-blog')}`}
                        >
                          Blog Detail
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Gallery */}
                <li>
                  <Link
                    to="/gallery"
                    className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/gallery')}`}
                  >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Gallery
                  </Link>
                </li>

                {/* Pages Dropdown */}
                <li className="hs-accordion" id="pages-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Pages
                    <svg className="hs-accordion-active:block ms-auto hidden size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m18 15-6-6-6 6" />
                    </svg>
                    <svg className="hs-accordion-active:hidden ms-auto block size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                    <ul className="pt-2 ps-7 space-y-1">
                      <li>
                        <Link
                          to="/about"
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/about')}`}
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/term-and-conditions"
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/term-and-conditions')}`}
                        >
                          Terms & Conditions
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Auth Dropdown */}
                <li className="hs-accordion" id="auth-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Auth
                    <svg className="hs-accordion-active:block ms-auto hidden size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m18 15-6-6-6 6" />
                    </svg>
                    <svg className="hs-accordion-active:hidden ms-auto block size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                    <ul className="pt-2 ps-7 space-y-1">
                      <li>
                        <Link
                          to="/sign-in"
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/sign-in')}`}
                        >
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/sign-up"
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/sign-up')}`}
                        >
                          Sign Up
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/forgot-password"
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/forgot-password')}`}
                        >
                          Forgot Password
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Errors Dropdown */}
                <li className="hs-accordion" id="errors-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Errors
                    <svg className="hs-accordion-active:block ms-auto hidden size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m18 15-6-6-6 6" />
                    </svg>
                    <svg className="hs-accordion-active:hidden ms-auto block size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                    <ul className="pt-2 ps-7 space-y-1">
                      <li>
                        <Link
                          to="/404"
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/404')}`}
                        >
                          404 Error
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/500"
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/500')}`}
                        >
                          500 Error
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/maintenance"
                          className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${isActive('/maintenance')}`}
                        >
                          Maintenance
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                PL
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">PLNDAILY</p>
                <p className="text-xs text-gray-500 truncate">admin@plndaily.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}