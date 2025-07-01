import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LiveChat from './components/Common/LiveChat';
import CookieConsent from './components/Common/CookieConsent';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Templates from './pages/Templates';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/Blog/BlogPost';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Support from './pages/Support';
import Help from './pages/Help';
import Tutorials from './pages/Tutorials';
import Community from './pages/Community';
import Status from './pages/Status';
import ApiDocs from './pages/ApiDocs';
import Privacy from './pages/Legal/Privacy';
import Terms from './pages/Legal/Terms';
import Cookies from './pages/Legal/Cookies';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                
                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Company */}
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Support */}
                <Route path="/support" element={<Support />} />
                <Route path="/help" element={<Help />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/community" element={<Community />} />
                <Route path="/status" element={<Status />} />
                
                {/* API */}
                <Route path="/api" element={<ApiDocs />} />
                
                {/* Legal */}
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
              </Routes>
            </main>
            <Footer />
            <LiveChat />
            <CookieConsent />
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;