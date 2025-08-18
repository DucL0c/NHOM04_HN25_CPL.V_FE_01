import "./index.css"
import AppRoutes from "./routes"
import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { CartCountProvider } from "./contexts/CartCountContext"


function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <CartCountProvider>
            <AppRoutes />
          </CartCountProvider>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App