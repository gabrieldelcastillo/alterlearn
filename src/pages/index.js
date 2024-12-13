import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiChevronUp, FiSearch, FiUser } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Header from "../components/Header";
import IndexBackground from "../components/index/IndexBackground";

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
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const careerScrollRef = useRef(null);
  const subjectScrollRef = useRef(null);

  const filters = {
    type: ["Certamen (con solución)", "Certamen (sin solución)", "Control", "Tareas", "Apuntes"],
    career: ["Ingeniería", "Medicina", "Economía", "Derecho"],
    subject: ["Matemáticas", "Física", "Química", "Biología"],
    teacher: ["Gabriel Astudillo", "Benjamín Serrano", "Rodrigo Olivares"],
    year: ["2024", "2023", "2022", "2021"],
    content: ["Digital", "Physical", "Hybrid", "Subscription"]
  };

  const filtersNames = ["Tipo", "Carrera", "Asignatura", "Profesor", "Año", "Contenidos"];

  const products = [
    {
      id: 1,
      type: "Certamen (Con Solución)",
      price: 1000,
      year: 2019,
      career: "Ingeniería Civil Informática",
      subject: "Programación II",
      teacher: "Rodrigo Olivares",
      contents: ["Polimorfismo", "Herencia", "Abstracción", "Encapsulamiento"]
    }
  ];

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
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
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="absolute inset-0 z-0">
        <IndexBackground darkMode={darkMode} />
      </div>

      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 space-y-4">
            <div
              ref={careerScrollRef}
              className="flex space-x-4 overflow-hidden group whitespace-nowrap pb-4 pt-1 mask-gradient-x"
            >
              <div className="animate-loop-scroll-right flex space-x-4">
                {[...filters.career, ...filters.career].map((career, index) => (
                  <button
                    key={`${career}-${index}`}
                    onClick={() => handleCareerClick(career)}
                    className={`px-6 py-2 rounded-full max-w-none ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"} 
                      ${selectedCareer.includes(career) ? "ring-2 ring-blue-500" : ""} shadow-sm transition-all duration-200`}
                  >
                    <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>{career}</span>
                  </button>
                ))}
              </div>

              <div className="animate-loop-scroll-right flex space-x-4 aria-hidden">
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
              className="flex space-x-4 overflow-hidden whitespace-nowrap pb-4 pt-1 placeholder:mask-gradient-x"
            >
              <div className="animate-loop-scroll-left flex space-x-4">
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

              <div className="animate-loop-scroll-left flex space-x-4 aria-hidden:">
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
            <div className="w-full md:w-64 space-y-4 relative z-10">
              {Object.entries(filters).map(([filterName, options], index) => (
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
                    <span className="font-medium">{filtersNames[index]}</span>
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
                Limpiar filtros
              </button>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`w-72 h-72 rounded-lg shadow-sm border relative transition-transform ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
                  >
                    <div className="p-4">
                      <h3 className={`font-semibold text-lg mb-2 text-center ${darkMode ? "text-white" : "text-black"}`}>
                        {product.career}
                      </h3>
                      <h4 className={`mb-4 text-center ${darkMode ? "text-white" : "text-gray-600"}`}>
                        {product.subject}
                      </h4>
                      <h4 className={`mb-4 text-center ${darkMode ? "text-white" : "text-gray-600"}`}>
                        {product.type} {product.year}
                      </h4>
                      <h4 className={`mb-4 text-center ${darkMode ? "text-white" : "text-gray-600"}`}>
                        {product.teacher}
                      </h4>
                      <div className="relative">
                        <button
                          onClick={() => {
                            const dropdown = document.getElementById(`dropdown-${product.id}`);
                            dropdown.classList.toggle('hidden');
                          }}
                          className={`w-full text-center px-2 py-1 rounded ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          Contenidos
                        </button>
                        <ul
                          id={`dropdown-${product.id}`}
                          className={`hidden absolute z-50 w-full mt-1 py-1 rounded-lg shadow-lg transform translate-y-0 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                            }`}
                          style={{
                            maxHeight: '200px',
                            overflowY: 'auto',
                            position: 'absolute',
                            top: '100%',
                            left: '0',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }}
                        >
                          {product.contents.map((content, index) => (
                            <li
                              key={index}
                              className={`px-2 py-1 ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                              {content}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="inline-flex items-center mt-4 w-full">
                        <span className={`text-lg font-bold flex-grow text-center ml-10 ${darkMode ? "text-amber-400" : "text-blue-600"}`}>
                          CLP${product.price}
                        </span>
                        <button
                          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
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