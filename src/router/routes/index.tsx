import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import React from "react";

// Lazy pages
const Home = lazy(() => import("#src/pages/Home"));
const BlogList = lazy(() => import("#src/pages/BlogList"));
const BlogDetail = lazy(() => import("#src/pages/BlogDetail"));
const Gallery = lazy(() => import("#src/pages/Gallery"));
const About = lazy(() => import("#src/pages/About"));
const Login = lazy(() => import("#src/pages/auth/SignIn"));

// Extended route type with meta
export type AppRoute = Omit<RouteObject, "children"> & {
  id?: string;
  path?: string;
  meta?: {
    title?: string;
    icon?: React.ReactNode;
    hideInSidebar?: boolean;
  };
  children?: AppRoute[];
};

export const baseRoutes: AppRoute[] = [
  {
    id: "Dashboard",
    Component: Home,
    path: "",
    meta: {
      title: "Dashboard", icon: <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    },
  },
  {
    path: "Evaluasi",
    id: "list-blog",
    meta: {
      title: "Evaluasi", icon: <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    },
    children: [
      { path: "active-evaluation", id: "blog-list", Component: BlogList, meta: { title: "Evaluasi Aktif" } },
      { path: "detail", id: "blog-detail", Component: BlogDetail, meta: { title: "Approval Evaluasi", hideInSidebar: false } },
    ],
  },
  {
    path: "gallery",
    id: "gallery",
    Component: Gallery,
    meta: {
      title: "Perencanaan", icon: <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    },
  },
  {
    path: "about",
    id: "about",
    Component: About,
    meta: { title: "About" },
  },
  {
    path: "login",
    id: "login",
    Component: Login,
    meta: { title: "Login", hideInSidebar: false },
  },
];
