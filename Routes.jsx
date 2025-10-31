import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VideoUploadDashboard from './pages/video-upload-dashboard';
import ResultsSummary from './pages/results-summary';
import ProcessingHistory from './pages/processing-history';
import ProcessingCenter from './pages/processing-center';
import MetadataEditor from './pages/metadata-editor';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<VideoUploadDashboard />} />
        <Route path="/video-upload-dashboard" element={<VideoUploadDashboard />} />
        <Route path="/results-summary" element={<ResultsSummary />} />
        <Route path="/processing-history" element={<ProcessingHistory />} />
        <Route path="/processing-center" element={<ProcessingCenter />} />
        <Route path="/metadata-editor" element={<MetadataEditor />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
