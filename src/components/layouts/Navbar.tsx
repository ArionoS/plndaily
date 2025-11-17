import { Component } from "react";
import { FiMenu, FiBell } from "react-icons/fi";

interface NavbarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

class Navbar extends Component<NavbarProps> {
  render() {
    const { onToggleSidebar } = this.props;

    return (
      <header className="w-full bg-white border-b border-gray-200 max-w-full overflow-x-hidden">
        <nav className="w-full flex items-center justify-between px-6 py-3">

          {/* LEFT — HAMBURGER */}
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={onToggleSidebar}
          >
            <FiMenu className="w-6 h-6 text-teal-600" />
          </button>

          {/* RIGHT — NOTIF + AVATAR */}
          <div className="flex items-center gap-4">

            {/* NOTIFICATION BADGE */}
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                1
              </span>
              <FiBell className="w-6 h-6 text-gray-700" />
            </div>

            {/* AVATAR + NAME */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
                TS
              </div>

              <span className="font-semibold text-teal-600 text-sm">
                TEST
              </span>
            </div>

          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
