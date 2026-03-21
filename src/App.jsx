import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SiteContentProvider } from "./context/SiteContentContext";

const Home = lazy(() => import("./pages/public/Home"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const DashboardOverview = lazy(() => import("./pages/admin/DashboardOverview"));
const BannerManager = lazy(() => import("./pages/admin/BannerManager"));
const ServicesManager = lazy(() => import("./pages/admin/ServicesManager"));
const BlogManager = lazy(() => import("./pages/admin/BlogManager"));
const CareerPortal = lazy(() => import("./pages/admin/CareerPortal"));
const MediaManager = lazy(() => import("./pages/admin/MediaManager"));
const Settings = lazy(() => import("./pages/admin/Settings"));

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm font-medium uppercase tracking-[0.28em] text-slate-400">
      Loading
    </div>
  );
}

function App() {
  return (
    <SiteContentProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="banners" element={<BannerManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="blog" element={<BlogManager />} />
              <Route path="careers" element={<CareerPortal />} />
              <Route path="media" element={<MediaManager />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SiteContentProvider>
  );
}

export default App;
