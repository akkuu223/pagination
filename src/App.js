import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );

    const data = await res.json();
    if (data && data.products) setProducts(data.products);
    setTotalPages(data.total / 10);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);
  const onChangePage = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title}></img>
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          {totalPages > 1 && (
            <span
              onClick={() => {
                onChangePage(page - 1);
              }}
            >
              {"◀"}
            </span>
          )}
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => {
                  onChangePage(i + 1);
                }}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          {page < totalPages && (
            <span
              onClick={() => {
                onChangePage(page + 1);
              }}
            >
              {"▶"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
