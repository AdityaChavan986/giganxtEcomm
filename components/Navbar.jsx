"use client";
import React, { useState, useEffect } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { isSeller, router, user, products } = useAppContext();
  const { openSignIn } = useClerk();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/all-products" },
    { name: "About Us", path: "/aboutus" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Filter products based on search query
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // Limit to 5 results

    setSearchResults(filteredProducts);
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
    toggleSearch();
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      toggleSearch();
    }
  };

  if (!mounted) {
    return null; // or a loading state
  }

  return (
    <div className="relative">
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 bg-white">
        {/* Logo */}
        <Image
          className="cursor-pointer w-28 md:w-32"
          onClick={() => router.push("/")}
          src={assets.logo}
          alt="logo"
          priority
        />

        {/* Navigation Links */}
        <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path} 
              className="flex flex-col items-center gap-1"
            >
              <p className={`hover:text-gray-900 transition ${pathname === item.path ? " text-gray-900" : "text-gray-700"}`}>
                {item.name}
              </p>
              <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 transition-all duration-300 ${pathname === item.path ? "block" : "hidden"}`} />
            </Link>
          ))}
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* User Section */}
        <ul className="hidden md:flex items-center gap-4">
          <button onClick={toggleSearch} className="hover:text-gray-900 transition">
            <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" priority />
          </button>
          {user ? (
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
                <UserButton.Action label="My Order" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" priority />
              Account
            </button>
          )}
        </ul>

        {/* Mobile Menu */}
        <div className="flex items-center md:hidden gap-3">
          <button onClick={toggleSearch} className="hover:text-gray-900 transition">
            <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" priority />
          </button>
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
          {user ? (
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push("/")} />
                <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push("/all-products")} />
                <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
                <UserButton.Action label="My Order" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" priority />
              Account
            </button>
          )}
        </div>
      </nav>

      {/* Search Bar */}
      <div 
        className={`
          absolute w-full bg-white border-b border-gray-300 px-6 md:px-16 lg:px-32 py-4 z-40
          transform transition-all duration-300 ease-in-out
          ${isSearchVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          />
          <Image 
            src={assets.search_icon} 
            alt="search" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            priority
          />
          <button 
            onClick={toggleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
              {searchResults.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <Image
                      src={product.image[0]}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{product.description}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ₹{product.offerprice}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
