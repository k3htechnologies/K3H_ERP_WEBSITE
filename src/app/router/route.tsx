import HomePage from '@/features/home/page';
import Layout from '@/app/layouts/Layout';
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/app/router/routePaths';
import AboutUsPage from '@/features/about/page';
import ProjectsPage from '@/features/projects/page';
import BlogsPage from '@/features/blogs/page';
import CareerPage from '@/features/career/page';
import { AnimatePresence } from 'framer-motion';
import ApplicationFormPage from '@/features/application-form/page';
import LoginPage from '@/features/login/page';
import JobSearchPage from '@/features/jobsearch/page';

const MainRouter: React.FC = () => {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    //   <AnimatePresence mode="wait">
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route
            index
            element={<Navigate to={`/${ROUTES.HOMEPAGE}`} replace />}
          />
          <Route path={ROUTES.HOMEPAGE} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
          <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
          <Route path={ROUTES.BLOGS} element={<BlogsPage />} />
          <Route path={ROUTES.CAREER} element={<CareerPage />} />
          <Route path={ROUTES.JOB_SEARCH} element={<JobSearchPage/>}/>
          <Route path={ROUTES.APPLICATION_FORM} element={<ApplicationFormPage/>} />
          <Route path={ROUTES.LOGIN} element={<LoginPage/>} />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    //   </AnimatePresence>
    // </Suspense>
  );
};

export default MainRouter;
