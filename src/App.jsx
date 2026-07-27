import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import ToolRoute from './pages/ToolRoute.jsx'
import NotFound from './pages/NotFound.jsx'
import { tools } from './config/tools.config.js'

/**
 * App / routing.
 *
 * Routes are generated from tools.config.js — the `tools` array is mapped into
 * one <Route> each. Adding a tool never requires touching this file: add an
 * entry to the config and its route appears here automatically.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        {tools.map((tool) => (
          <Route
            key={tool.path}
            path={tool.path}
            element={<ToolRoute tool={tool} />}
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
