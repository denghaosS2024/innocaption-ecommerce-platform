import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/apis';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import SearchBar from '../SearchBar/SearchBar';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        fetchProducts().then(response => {
          console.log('Fetched products:', response.data.products);
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
        });
      }, []);

    const handleSearch = (searchTerm) => {
      if (!searchTerm.trim()) {
        setFilteredProducts(products);
        setCurrentPage(1); // Reset to the first page on search
        return;
      }

      const searchLower = searchTerm.toLowerCase();
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );

      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to the first page on search
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <div>
        <SearchBar onSearch={handleSearch} />
        <div className="productList">
          {currentItems.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => currentPage > 1 && paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => currentPage < totalPages && paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    );
};

export default ProductList;
