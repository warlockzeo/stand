import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader, SearchBar, Footer } from '../../components';
import ProductList from '../../containers/productList';
import { getAllProducts } from '../../features/products/productsSlice';

import { LojaStyled } from './styles';

const Loja = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  const [productsFiltered, setProductsFiltered] = useState([]);
  const [filters, setFilters] = useState([]);

  const handleChangeFilter = (field, value) => {
    if (value) {
      setFilters([
        ...filters.filter((filter) => filter.field !== field),
        { field, value },
      ]);
    } else {
      setFilters(filters.filter((filter) => filter.field !== field));
    }
  };

  useEffect(() => {
    if (products.length) {
      let newProducts = products;
      filters.forEach((filt) => {
        if (filt.field === 'preco') {
          newProducts = newProducts.filter(
            (car) => Number(car[filt.field]) >= Number(filt.value)
          );
        } else {
          newProducts = newProducts.filter(
            (car) => car[filt.field] === filt.value
          );
        }
      });
      setProductsFiltered(newProducts);
    }
  }, [products, filters]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productsFiltered.length < 1 && filters.length === 0) {
      setProductsFiltered(products);
    }
  }, [products, productsFiltered, filters]);

  return (
    <LojaStyled>
      <SearchBar list={products} onChange={handleChangeFilter} />
      {isLoading ? <Loader /> : <ProductList data={productsFiltered} />}
      <Footer />
    </LojaStyled>
  );
};

export default Loja;
