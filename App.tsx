import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell, FeedbackProvider } from './components'
import { ArchivesPage, ARPage, HeritageDetailPage, HomePage, MapPage, MissionsPage, ProductDetailPage, ProfilePage, RoutePlanPage, ShopPage, SplashPage, UndergroundPage } from './pages'
import { StoreProvider } from './store'

export default function App() {
  return <StoreProvider><FeedbackProvider><HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><AppShell><Routes>
    <Route path="/" element={<SplashPage />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/map" element={<MapPage />} />
    <Route path="/ar" element={<ARPage />} />
    <Route path="/archives" element={<ArchivesPage />} />
    <Route path="/heritage/:id" element={<HeritageDetailPage />} />
    <Route path="/immersive/:id" element={<UndergroundPage />} />
    <Route path="/shop" element={<ShopPage />} />
    <Route path="/product/:id" element={<ProductDetailPage />} />
    <Route path="/missions" element={<MissionsPage />} />
    <Route path="/route/:id" element={<RoutePlanPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="*" element={<Navigate to="/home" replace />} />
  </Routes></AppShell></HashRouter></FeedbackProvider></StoreProvider>
}
