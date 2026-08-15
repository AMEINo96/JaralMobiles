'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { getAllProductsQuery, getAllCategoriesQuery } from '@/sanity/lib/queries';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          client.fetch(getAllProductsQuery),
          client.fetch(getAllCategoriesQuery)
        ]);
        
        const defaultCategories = [
          { _id: 'def-1', title: 'Chargers & Adapters', slug: { current: 'chargers' } },
          { _id: 'def-2', title: 'Cables & Hubs', slug: { current: 'cables' } },
          { _id: 'def-3', title: 'Power Banks', slug: { current: 'power-banks' } },
          { _id: 'def-4', title: 'Cases & Covers', slug: { current: 'cases' } },
          { _id: 'def-5', title: 'Screen Protectors', slug: { current: 'screen-protectors' } },
          { _id: 'def-6', title: 'Earbuds & Audio', slug: { current: 'earbuds' } },
          { _id: 'def-7', title: 'Smartwatches', slug: { current: 'smartwatches' } },
        ];

        const sanityCats = fetchedCategories || [];
        
        // Merge defaults if they don't exist in Sanity
        const mergedCategories = [
          ...defaultCategories.filter(def => 
            !sanityCats.some((cat: any) => cat.title.toLowerCase() === def.title.toLowerCase())
          ),
          ...sanityCats
        ];

        setProducts(fetchedProducts || []);
        setCategories(mergedCategories);
      } catch (error) {
        console.error('Error fetching shop data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category?._ref === activeCategory || product.category?._id === activeCategory;
    const matchesSearch = product.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Shop Accessories</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore our wide collection of premium accessories to elevate your style and functionality.
          </p>
        </div>
      </div>

      {/* Filter/Search Bar */}
      <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          
          <div className="flex overflow-x-auto w-full sm:w-auto hide-scrollbar gap-2 items-center flex-nowrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setActiveCategory(category._id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                  activeCategory === category._id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64 flex-shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl h-80 border border-slate-200"></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200 max-w-2xl mx-auto mt-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-600 mb-6">We couldn't find any products matching your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
