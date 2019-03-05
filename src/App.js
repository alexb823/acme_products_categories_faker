import React, { Component } from 'react';
import axios from 'axios';
import CategoriesList from './CategoriesList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
    this.getCategories = this.getCategories.bind(this);
    this.destroyCtg = this.destroyCtg.bind(this);
    this.createCtg = this.createCtg.bind(this);
    this.createPrd = this.createPrd.bind(this);
    this.destroyPrd = this.destroyPrd.bind(this);
  }

  getCategories() {
    axios
      .get('/api/categories')
      .then(response => response.data)
      .then(categories => this.setState({ categories }));
  }

  componentDidMount() {
    this.getCategories();
  }

  createCtg() {
    axios
    .post('/api/categories')
    .then(() => this.getCategories());
  }

  destroyCtg(id) {
    axios
    .delete(`api/categories/${id}`)
    .then(() => this.getCategories());
  }

  createPrd(id) {
    axios
      .post(`/api/categories/${id}/products`)
      .then(() => this.getCategories());
  }

  destroyPrd(id) {
    axios
    .delete(`/api/products/${id}`)
    .then(() => this.getCategories());
  }

  render() {
    const { categories } = this.state;
    const { createCtg, destroyCtg, createPrd, destroyPrd } = this;

    return (
      <div className="container my-4">
        <h1 className="my-3">
          Acme Categories and Products <em>by faker</em>
        </h1>

        <button
          type="button"
          className="btn btn-primary my-3"
          onClick={createCtg}
        >
          Create Category
        </button>

        <CategoriesList
          categories={categories}
          destroyCtg={destroyCtg}
          createPrd={createPrd}
          destroyPrd={destroyPrd}
        />
      </div>
    );
  }
}

export default App;
