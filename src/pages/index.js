import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiChevronUp, FiSearch, FiUser } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import Link from "next/link";

const SearchInterface = () => {
  const [expandedFilters, setExpandedFilters] = useState({
    career: false,
    type: false,
    subject: false,
    year: false,
    content: false
  });
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [selectedContent, setSelectedContent] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const careerScrollRef = useRef(null);
  const subjectScrollRef = useRef(null);

  const filters = {
    career: ["Engineering", "Medicine", "Business", "Arts"],
    type: ["Books", "Courses", "Tools", "Software"],
    subject: ["Mathematics", "Physics", "Chemistry", "Biology"],
    year: ["2024", "2023", "2022", "2021"],
    content: ["Digital", "Physical", "Hybrid", "Subscription"]
  };

  const products = [
    {
      id: 1,
      title: "Advanced Mathematics Textbook",
      price: 59.99,
      description: "Comprehensive guide for advanced mathematics concepts",
      image: "images.unsplash.com/photo-1543002588-bfa74002ed7e"
    },
    {
      id: 2,
      title: "Digital Physics Course",
      price: 129.99,
      description: "Interactive online physics learning experience",
      image: "images.unsplash.com/photo-1532094349884-543bc11b234d"
    },
    {
      id: 3,
      title: "Chemistry Lab Kit",
      price: 89.99,
      description: "Complete chemistry experimentation set",
      image: "images.unsplash.com/photo-1532187863486-abf9dbad1b69"
    },
    {
      id: 4,
      title: "Business Management Course",
      price: 199.99,
      description: "Professional business management certification",
      image: "images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    }
  ];

  useEffect(() => {
    let animationFrameId;
    const scrollSpeed = 0.5;

    const scroll = () => {
      if (!isPaused) {
        if (careerScrollRef.current) {
          careerScrollRef.current.scrollLeft += scrollSpeed;
          if (
            careerScrollRef.current.scrollLeft >=
            careerScrollRef.current.scrollWidth - careerScrollRef.current.clientWidth
          ) {
            careerScrollRef.current.scrollLeft = 0;
          }
        }

        if (subjectScrollRef.current) {
          subjectScrollRef.current.scrollLeft -= scrollSpeed;
          if (subjectScrollRef.current.scrollLeft <= 0) {
            subjectScrollRef.current.scrollLeft =
              subjectScrollRef.current.scrollWidth - subjectScrollRef.current.clientWidth;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleCareerClick = (career) => {
    setSelectedCareer(prev =>
      prev.includes(career)
        ? prev.filter(item => item !== career)
        : [...prev, career]
    );
    setExpandedFilters(prev => ({ ...prev, career: true }));
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(prev =>
      prev.includes(subject)
        ? prev.filter(item => item !== subject)
        : [...prev, subject]
    );
    setExpandedFilters(prev => ({ ...prev, subject: true }));
  };

  const handleFilterOptionChange = (filterName, option) => {
    switch (filterName) {
      case "career":
        setSelectedCareer(prev =>
          prev.includes(option)
            ? prev.filter(item => item !== option)
            : [...prev, option]
        );
        break;
      case "type":
        setSelectedType(prev =>
          prev.includes(option)
            ? prev.filter(item => item !== option)
            : [...prev, option]
        );
        break;
      case "subject":
        setSelectedSubject(prev =>
          prev.includes(option)
            ? prev.filter(item => item !== option)
            : [...prev, option]
        );
        break;
      case "year":
        setSelectedYear(prev =>
          prev.includes(option)
            ? prev.filter(item => item !== option)
            : [...prev, option]
        );
        break;
      case "content":
        setSelectedContent(prev =>
          prev.includes(option)
            ? prev.filter(item => item !== option)
            : [...prev, option]
        );
        break;
      default:
        break;
    }
  };

  const getSelectedValueForFilter = (filterName) => {
    switch (filterName) {
      case "career":
        return selectedCareer;
      case "type":
        return selectedType;
      case "subject":
        return selectedSubject;
      case "year":
        return selectedYear;
      case "content":
        return selectedContent;
      default:
        return [];
    }
  };

  const clearFilters = () => {
    setSelectedCareer([]);
    setSelectedSubject([]);
    setSelectedType([]);
    setSelectedYear([]);
    setSelectedContent([]);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <header className={`sticky top-0 z-50 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/"><h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Alterlearn</h1></Link>
            </div>

            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Search..."
                />
                <FiSearch className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleDarkModeToggle}
                className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <BsSun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <BsMoon className="h-5 w-5 text-gray-600" />
                )}
              </button>

              <div className="relative">
                <button
                  className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  aria-label="Shopping cart"
                >
                  <Link href="/cart">
                  <AiOutlineShoppingCart className={`h-5 w-5 ${darkMode ? "text-white" : "text-gray-600"}`} />
                  {cartItemCount > 0 && (
                    
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {cartItemCount}
                      </span>
                  )}
                  </Link>
                </button>
              </div>

              <button
                className={`p-2 rounded-lg ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                aria-label="User account"
              >
                <FiUser className={`h-5 w-5 ${darkMode ? "text-white" : "text-gray-600"}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 space-y-4">
            <div
              ref={careerScrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="scroll-left overflow-x-auto whitespace-nowrap pb-4 mask-gradient-x"
            >
              <div className="inline-flex space-x-4">
                {[...filters.career, ...filters.career].map((career, index) => (
                  <button
                    key={`${career}-${index}`}
                    onClick={() => handleCareerClick(career)}
                    className={`px-6 py-2 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"} 
                      ${selectedCareer.includes(career) ? "ring-2 ring-blue-500" : ""} shadow-sm transition-all duration-200`}
                  >
                    <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>{career}</span>
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={subjectScrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="scroll-right overflow-x-auto whitespace-nowrap pb-4 mask-gradient-x"
            >
              <div className="inline-flex space-x-4">
                {[...filters.subject, ...filters.subject].map((subject, index) => (
                  <button
                    key={`${subject}-${index}`}
                    onClick={() => handleSubjectClick(subject)}
                    className={`px-6 py-2 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"} 
                      ${selectedSubject.includes(subject) ? "ring-2 ring-blue-500" : ""} shadow-sm transition-all duration-200`}
                  >
                    <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>{subject}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 space-y-4">
              {Object.entries(filters).map(([filterName, options]) => (
                <div
                  key={filterName}
                  className={`rounded-lg shadow-sm overflow-hidden ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border`}
                >
                  <button
                    onClick={() => toggleFilter(filterName)}
                    className={`w-full px-4 py-3 flex justify-between items-center text-left focus:outline-none ${darkMode ? "hover:bg-gray-700 text-white" : "hover:bg-gray-50 text-black"}`}
                    aria-expanded={expandedFilters[filterName]}
                    aria-controls={`filter-${filterName}`}
                  >
                    <span className="font-medium capitalize">{filterName}</span>
                    {expandedFilters[filterName] ? (
                      <FiChevronUp className={darkMode ? "text-gray-400" : "text-gray-500"} />
                    ) : (
                      <FiChevronDown className={darkMode ? "text-gray-400" : "text-gray-500"} />
                    )}
                  </button>
                  {expandedFilters[filterName] && (
                    <div
                      id={`filter-${filterName}`}
                      className={`px-4 py-2 space-y-2 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
                    >
                      {options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={getSelectedValueForFilter(filterName).includes(option)}
                            onChange={() => handleFilterOptionChange(filterName, option)}
                            className="rounded text-blue-500 focus:ring-blue-500"
                          />
                          <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={clearFilters}
                className={`w-full py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 ${darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-white hover:bg-gray-100 text-gray-800"} 
                  border ${darkMode ? "border-gray-600" : "border-gray-200"}`}
              >
                Clear Filters
              </button>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`rounded-lg shadow-sm border overflow-hidden transition-transform hover:transform hover:scale-105 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
                  >
                    <img
                      src={`https://${product.image}`}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1560421683-6856ea585c78";
                      }}
                    />
                    <div className="p-4">
                      <h3 className={`font-semibold text-lg mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                        {product.title}
                      </h3>
                      <p className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-600">
                          ${product.price}
                        </span>
                        <button
                          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label="Add to cart"
                        >
                          <AiOutlineShoppingCart className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%);
        }
      `}</style>
    </div>
  );
};

export default SearchInterface;