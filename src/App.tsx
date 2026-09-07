import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { AdminPage } from './pages/AdminPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { GuidePage } from './pages/GuidePage'
import { GuidesIndexPage } from './pages/GuidesIndexPage'
import { HomePage } from './pages/HomePage'
import { ModulePage } from './pages/ModulePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PricingPage } from './pages/PricingPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { ProductPage } from './pages/ProductPage'
import { TermsPage } from './pages/TermsPage'

function MarketingRoutes() {
  return (
    <>
      <Route index element={<HomePage />} />
      <Route path="hims-software" element={<ProductPage />} />
      <Route path="modules/:slug" element={<ModulePage />} />
      <Route path="guides" element={<GuidesIndexPage />} />
      <Route path="guides/:slug" element={<GuidePage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="faq" element={<FaqPage />} />
      <Route path="privacy" element={<PrivacyPage />} />
      <Route path="terms" element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/hi" element={<Layout />}>
        {MarketingRoutes()}
      </Route>
      <Route element={<Layout />}>{MarketingRoutes()}</Route>
    </Routes>
  )
}
