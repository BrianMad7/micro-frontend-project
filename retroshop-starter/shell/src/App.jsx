import React, { useState, useEffect, Suspense, lazy } from "react";
import "./App.css";
import eventBus from "shared/eventBus";

const Product = React.lazy(() => import("mfeProduct/ProductList"));
const Cart = React.lazy(() => import("mfe_cart/Cart"));
const Reco = React.lazy(() => import("mfeReco/Reco"));
// TODO: importer les 3 MFEs avec React.lazy()

function LoadingFallback({ name }) {
  return <div className="loading-fallback">Chargement {name}...</div>;
}

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // TODO: ecouter les mises a jour du panier pour le badge
    const unsub = eventBus.on("cart:add", () => {
      setCartCount((prev) => prev + 1);
    });
    return () => unsub();
  }, []);

  return (
    <div className="shell">
      <header className="shell-header">
        <h1 className="logo">RetroShop</h1>
        <div className="cart-badge">Panier ({cartCount})</div>
      </header>
      <main className="shell-main">
        <section className="product-area">
          <Suspense fallback={<LoadingFallback name="Products" />}>
            <Product />
          </Suspense>
          {/* TODO: afficher mfe-product avec Suspense */}
          {/* <LoadingFallback name="Products" />*/}
        </section>
        <aside className="cart-area">
          <Suspense fallback={<LoadingFallback name="Cart" />}>
            <Cart />
          </Suspense>
          {/* TODO: afficher mfe-cart avec Suspense */}
          {/* <LoadingFallback name="Cart" />*/}
        </aside>
      </main>
      <section className="reco-area">
        <Suspense fallback={<LoadingFallback name="Recommendations" />}>
          <Reco />
        </Suspense>
        {/* TODO: afficher mfe-reco avec Suspense */}
        {/* <LoadingFallback name="Recommendations" />*/}
      </section>
    </div>
  );
}

export default App;
