import React from 'react';
import ProductList from './ProductList';

const CategoriesList = ({ categories, destroyCtg, createPrd, destroyPrd }) => {
  return (
    <ul className="list-group">
      {categories.map(category => {
        return (
          <li className="list-group-item" key={category.id}>
            <div className="d-flex justify-content-between py-3">
              {category.name}

              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => createPrd(category.id)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => destroyCtg(category.id)}
                >
                  -
                </button>
              </div>
            </div>

            {category.products ? (
              <ProductList products={category.products} destroyPrd={destroyPrd} />
            ) : (
              <span />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CategoriesList;
