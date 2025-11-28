import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Parameters from "./pages/Parameters";
import Crops from "./pages/Crops";
import Technology from "./pages/Technology";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import DatasetCollection from "./pages/DatasetCollection";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/parameters" element={<Parameters />} />
      <Route path="/crops" element={<Crops />} />
      <Route path="/technology" element={<Technology />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/dataset-collection" element={<DatasetCollection />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
