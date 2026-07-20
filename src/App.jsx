import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AIChat from './components/AIChat/AIChat'
import Landing from './pages/Landing/Landing'
import Booking from './pages/Booking/Booking'
import Suites from './pages/Suites/Suites'
import Experiences from './pages/Experiences/Experiences'
import Cars from './pages/Cars/Cars'
import Restaurants from './pages/Restaurants/Restaurants'
import Spa from './pages/Spa/Spa'
import Events from './pages/Events/Events'
import Concierge from './pages/Concierge/Concierge'
import Dashboard from './pages/Dashboard/Dashboard'
import Loyalty from './pages/Loyalty/Loyalty'
import Reviews from './pages/Reviews/Reviews'
import Contact from './pages/Contact/Contact'
import Admin from './pages/Admin/Admin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const hideLayout = pathname === '/admin'

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/"            element={<Landing />} />
        <Route path="/booking"     element={<Booking />} />
        <Route path="/suites"      element={<Suites />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/cars"        element={<Cars />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/spa"         element={<Spa />} />
        <Route path="/events"      element={<Events />} />
        <Route path="/concierge"   element={<Concierge />} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/loyalty"     element={<Loyalty />} />
        <Route path="/reviews"     element={<Reviews />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/admin"       element={<Admin />} />
      </Routes>
      {!hideLayout && <Footer />}
      {!hideLayout && <AIChat />}
    </>
  )
}
