<<<<<<< duccode
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown, FiLogOut } from 'react-icons/fi';
import CategoryList from '../categories/CategoryList';
import { fetchCurrentUser, logout } from '@/app/services/api';

const Header = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Temporary mock data - will be replaced with API call
  const categories = [
    { id: 1, name: 'Electronics', slug: 'electronics' },
    { id: 2, name: 'Fashion', slug: 'fashion' },
    { id: 3, name: 'Home & Living', slug: 'home-living' },
    { id: 4, name: 'Books', slug: 'books' },
    { id: 5, name: 'Sports', slug: 'sports' },
  ];

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetchCurrentUser();
        setUser(response.data);
      } catch (err) {
        setUser(null);
      }
    };

    if (localStorage.getItem('token')) {
      loadUser();
    }
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFB629]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            LazyShop
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-gray-900 hover:text-gray-700 font-medium"
                onClick={() => setShowCategories(!showCategories)}
              >
                <span>Categories</span>
                <FiChevronDown className={`transition-transform duration-200 ${showCategories ? 'rotate-180' : ''}`} />
              </button>
              {showCategories && <CategoryList categories={categories} />}
            </div>
            <Link href="/products" className="text-gray-900 hover:text-gray-700 font-medium">
              Products
            </Link>
            <Link href="/deals" className="text-gray-900 hover:text-gray-700 font-medium">
              Deals
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-medium">
                  {user.username}
                </span>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-900 hover:bg-gray-900/10 rounded-full"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="p-2 text-gray-900 hover:bg-gray-900/10 rounded-full">
                <FiUser size={20} />
              </Link>
            )}
            <Link href="/cart" className="p-2 text-gray-900 hover:bg-gray-900/10 rounded-full relative">
              <FiShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
=======
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { fetchCurrentUser } from '@/app/services/api';

const Header = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetchCurrentUser();
        setUser(response.data);
      } catch (err) {
        setUser(null);
      }
    };

    loadUser();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#FFB629]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            LazyShop
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/categories" className="text-gray-900 hover:text-gray-700 font-medium">
              Categories
            </Link>
            <Link href="/product" className="text-gray-900 hover:text-gray-700 font-medium">
              Products
            </Link>
            <Link href="/deals" className="text-gray-900 hover:text-gray-700 font-medium">
              Deals
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <span className="text-gray-900 font-medium">
                Hello, {user.username}
              </span>
            ) : (
              <Link href="/login" className="p-2 text-gray-900 hover:bg-gray-900/10 rounded-full">
                <FiUser size={20} />
              </Link>
            )}

            <Link href="cart" className="p-2 text-gray-900 hover:bg-gray-900/10 rounded-full relative">
              <FiShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
>>>>>>> main
