import React from 'react';

const ProductList = ({ products, destroyPrd }) => {
  return (
    <ul className="list-group">
      {products.map(product => {
        return (
          <li className="list-group-item" key={product.id}>
            <div className="d-flex justify-content-between">
              {product.name}

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => destroyPrd(product.id)}
              >
                -
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductList;
