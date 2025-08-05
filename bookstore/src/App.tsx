import "./index.css"
import AppRoutes from "./routes"
import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"



function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App