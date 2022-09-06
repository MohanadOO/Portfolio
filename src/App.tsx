import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import AllProjects from './pages/AllProjects'
import Blog from './pages/Blog'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home/Home'
import ProjectDetails from './pages/ProjectDetails'

export const ROUTE_PATHS = {
  Home: '/',
  AllProjects: '/projects',
  Blog: '/blog',
  ProjectDetails: '/projects/:id',
}

export const GOTO = {
  ProjectDetails: (id: string) => `/projects/${id}`,
}

export default function App() {
  return (
    <>
      <Nav />
      <div className='min-h-screen relative'>
        <Routes>
          <Route path={ROUTE_PATHS.Home} element={<Home />} />
          <Route path={ROUTE_PATHS.Blog} element={<Blog />} />
          <Route path={ROUTE_PATHS.AllProjects} element={<AllProjects />} />
          <Route
            path={ROUTE_PATHS.ProjectDetails}
            element={<ProjectDetails />}
          />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}
