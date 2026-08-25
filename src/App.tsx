import { RouterProvider, useRouter } from '@/lib/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Programs from '@/pages/Programs';
import Faculty from '@/pages/Faculty';
import News, { NewsArticlePage } from '@/pages/News';
import Events, { EventDetailPage } from '@/pages/Events';
import Contact from '@/pages/Contact';

function Routes() {
  const { route } = useRouter();

  switch (route.path) {
    case '/':
      return <Home />;
    case '/about':
      return <About />;
    case '/programs':
      return <Programs />;
    case '/faculty':
      return <Faculty />;
    case '/news':
      return <News />;
    case '/news/:slug':
      return <NewsArticlePage slug={route.params.slug} />;
    case '/events':
      return <Events />;
    case '/events/:slug':
      return <EventDetailPage slug={route.params.slug} />;
    case '/contact':
      return <Contact />;
    default:
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <div className="text-8xl font-bold font-display gradient-text mb-4">404</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Page not found</h1>
          <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
          <a
            href="#/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 hover:-translate-y-0.5 transition-all"
          >
            Back to Home
          </a>
        </div>
      );
  }
}

function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1">
          <Routes />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  );
}

export default App;
