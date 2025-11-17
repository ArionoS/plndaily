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
    id: "home",
    Component: Home,
    path: "active-evaluation",
    meta: {
      title: "Home", icon: <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    },
  },
  {
    path: "list-blog",
    id: "list-blog",
    meta: { title: "List Blog", icon: <svg className="w-4 h-4" /> },
    children: [
      { path: "list", id: "blog-list", Component: BlogList, meta: { title: "Blog List" } },
      { path: "detail", id: "blog-detail", Component: BlogDetail, meta: { title: "Blog Detail", hideInSidebar: false } },
    ],
  },
  {
    path: "gallery",
    id: "gallery",
    Component: Gallery,
    meta: { title: "Gallery", icon: <svg className="w-4 h-4" /> },
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
