import React, { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import PRODUCTS from 'shared/products';
import './Recommendations.css';

function Recommendations() {
  const [recos, setRecos] = useState(PRODUCTS.slice(0, 3));
  useEffect(() => {
    // Adapter les recommandations en fonction du contenu du panier
    const unsubscribe = eventBus.on('cart:updated', (cart) => {
      const inCartIds = new Set((cart.items || []).map(i => i.id));
      setRecos(PRODUCTS.filter(p => !inCartIds.has(p.id)).slice(0, 3));
    }, 'Recommendations');

    return () => unsubscribe();
  }, []);

  const handleAddReco = (product) => {
    // Ajouter le produit au panier en réutilisant le même événement que ProductGrid
    eventBus.emit('cart:add', product);
  };

  return (
    <div className="recommendations">
      <h2>Les joueurs achetent aussi</h2>
      <div className="reco-list">
        {recos.map(p => (
          <div key={p.id} className="reco-card" onClick={() => handleAddReco(p)}>
            <div className="reco-image" data-category={p.category}>{p.category}</div>
            <span className="reco-name">{p.name}</span>
            <span className="reco-price">{p.price} EUR</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
