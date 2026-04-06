import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Legislation from "./pages/Legislation";
import Transparency from "./pages/Transparency";
import Contact from "./pages/Contact";
import Units from "./pages/Units";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import SearchResults from "./pages/SearchResults";
import InstitutionalPage from "./pages/InstitutionalPage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Documents from "./pages/Documents";
import Page from "./pages/Page";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminPages from "./pages/admin/AdminPages";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminVideos from "./pages/admin/AdminVideos";
import AdminServices from "./pages/admin/AdminServices";
import AdminServiceAnalytics from "./pages/admin/AdminServiceAnalytics";
import AdminUnits from "./pages/admin/AdminUnits";
import AdminTransparency from "./pages/admin/AdminTransparency";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminDocumentStats from "./pages/admin/AdminDocumentStats";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminMenuAccess from "./pages/admin/AdminMenuAccess";
import { ResetPassword } from "./pages/ResetPassword";
import { AdminAudit } from "./pages/admin/AdminAudit";
import AdminLogin from "./pages/AdminLogin";
import Intranet from "./pages/Intranet";
import AdminIntranet from "./pages/admin/AdminIntranet";

// Layout components
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import CookieBanner from "./components/CookieBanner";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

function PublicPage({ component: Component }: { component: React.ComponentType }) {
  return (
    <PublicLayout>
      <Component />
    </PublicLayout>
  );
}

function AdminPage({ component: Component }: { component: React.ComponentType }) {
  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
}

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/">{() => <PublicPage component={Home} />}</Route>
      <Route path="/sobre">{() => <PublicPage component={About} />}</Route>
      <Route path="/servicos">{() => <PublicPage component={Services} />}</Route>
      <Route path="/legislacao">{() => <PublicPage component={Legislation} />}</Route>
      <Route path="/transparencia">{() => <PublicPage component={Transparency} />}</Route>
      <Route path="/contato">{() => <PublicPage component={Contact} />}</Route>
      <Route path="/unidades">{() => <PublicPage component={Units} />}</Route>
      <Route path="/noticias">{() => <PublicPage component={NewsList} />}</Route>
      <Route path="/noticias/:slug">{() => <PublicPage component={NewsDetail} />}</Route>
      <Route path="/busca">{() => <PublicPage component={SearchResults} />}</Route>
      <Route path="/privacidade">{() => <PublicPage component={Privacy} />}</Route>
      <Route path="/termos">{() => <PublicPage component={Terms} />}</Route>
      <Route path="/pagina/:slug">{() => <PublicPage component={Page} />}</Route>
      <Route path="/documentos">{() => <PublicPage component={Documents} />}</Route>

      {/* Intranet routes */}
      <Route path="/intranet">{() => <Intranet />}</Route>

      {/* Admin routes - SEM proteção em /admin/login */}
      <Route path="/admin/login">{() => <AdminLogin />}</Route>

      {/* Admin routes - COM proteção */}
      <Route path="/admin">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminDashboard} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/posts">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminPosts} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/categorias">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminCategories} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/paginas">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminPages} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/banners">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminBanners} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/videos">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminVideos} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/servicos">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminServices} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/servicos/analytics">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminServiceAnalytics} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/unidades">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminUnits} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/transparencia">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminTransparency} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/usuarios">
        {() => (
          <ProtectedRoute requiredRole={["admin"]}>
            <AdminPage component={AdminUsers} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/configuracoes">
        {() => (
          <ProtectedRoute requiredRole={["admin"]}>
            <AdminPage component={AdminSettings} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/documentos">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminDocuments} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/documentos/estatisticas">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminDocumentStats} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/documents">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminDocuments} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/documents/stats">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminDocumentStats} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/menu">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminMenu} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/permissoes">
        {() => (
          <ProtectedRoute requiredRole={["admin"]}>
            <AdminPage component={AdminMenuAccess} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/auditoria">
        {() => (
          <ProtectedRoute requiredRole={["admin"]}>
            <AdminPage component={AdminAudit} />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/intranet">
        {() => (
          <ProtectedRoute requiredRole={["admin", "contributor"]}>
            <AdminPage component={AdminIntranet} />
          </ProtectedRoute>
        )}
      </Route>

      {/* Public routes - continued */}
      <Route path="/reset-senha">{() => <PublicLayout><ResetPassword /></PublicLayout>}</Route>

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AccessibilityProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
