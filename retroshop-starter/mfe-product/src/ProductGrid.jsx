import eventBus from 'shared/eventBus';

const ProductGrid = ({ products = [] }) => {
  const addToCart = (product) => {
    eventBus.emit('cart:add-item', console.log('oui'));
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.price} €</p>
          <button onClick={() => addToCart(product)}>Ajouter au panier</button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;