import React, { useState } from "react";
import { FiUser, FiBook, FiCalendar, FiFileText, FiCheckCircle, FiXCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Header from "../components/Header";
import AdminBackground from "../components/admin/AdminBackground";

const DocumentInterface = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [requests] = useState([
    {
      userId: 1,
      career: "Ingeniería Civil",
      subject: "Cálculo Diferencial",
      type: "Certamen (sin solución)",
      year: "2024",
      teacher: "Juan Pérez",
      contents: ["límites", "derivadas"],
      username: "john_doe",
      email: "john_doe@example.com",
      date: "2024-11-05",
      size: "4.1 MB",
      pages: 6
    },
    {
      userId: 2,
      career: "Medicina",
      subject: "Anatomía I",
      type: "Apuntes",
      year: "2024",
      teacher: "Ana López",
      contents: ["Huesos", "músculos", "órganos"],
      username: "jane_smith",
      email: "jane_smith@example.com",
      date: "2024-02-15",
      size: "2.5 MB",
      pages: 3
    },
    {
      userId: 3,
      career: "Ingeniería Civil",
      subject: "Física Mecánica",
      type: "Control (con solución)",
      year: "2024",
      teacher: "Oscar Aravena",
      contents: ["Cinemática", "Dinámica", "Estática"],
      username: "mike_wilson",
      email: "mike_wilson@example.com",
      date: "2024-08-11",
      size: "1.2 MB",
      pages: 1
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState({
    username: "John Doe",
    date: "2024-02-15",
    format: "PDF",
    size: "2.5 MB",
    pages: 12,
    currentPage: 1
  });

  const handleRowClick = (request) => {
    setSelectedDocument({
      career: request.career,
      subject: request.subject,
      type: request.type,
      year: request.year,
      teacher: request.teacher,
      contents: request.contents.join(", "),
      date: request.date,
      size: request.size,
      pages: request.pages,
      currentPage: 1
    });
  };

  const handlePreviousPage = () => {
    setSelectedDocument(prev => ({
      ...prev,
      currentPage: Math.max(1, prev.currentPage - 1)
    }));
  };

  const handleNextPage = () => {
    setSelectedDocument(prev => ({
      ...prev,
      currentPage: Math.min(prev.pages, prev.currentPage + 1)
    }));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <AdminBackground darkMode={darkMode} />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:w-7/12 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th scope="col" className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>ID Usuario</th>
                    <th scope="col" className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>Nombre de Usuario</th>
                    <th scope="col" className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.userId}
                      className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer border-b ${
                        darkMode ? 'border-gray-700' : 'border-gray-100'
                      } last:border-b-0`}
                      onClick={() => handleRowClick(request)}
                    >
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{request.userId}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{request.username}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{request.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:w-5/12">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 space-y-6`}>
              <button className={`w-full flex items-center justify-center gap-2 ${
                darkMode 
                  ? 'bg-transparent border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]' 
                  : 'bg-black hover:bg-gray-900 shadow-md hover:shadow-lg'
              } ${darkMode ? 'text-blue-400' : 'text-white'} py-3 px-6 rounded-lg transition-all duration-200 font-medium`}>
                <FiFileText className={`w-5 h-5 ${darkMode ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.9)]' : 'text-white'}`} />
                <span className={darkMode ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.9)]' : ''}>Descargar Archivo</span>
              </button>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Carrera", value: selectedDocument.career, icon: "🎓" },
                  { label: "Asignatura", value: selectedDocument.subject, icon: "📚" },
                  { label: "Tipo", value: selectedDocument.type, icon: "📄" },
                  { label: "Año", value: selectedDocument.year, icon: "📅" },
                  { label: "Profesor", value: selectedDocument.teacher, icon: "👨‍🏫" },
                  { label: "Contenidos", value: selectedDocument.contents, icon: "📝" },
                  { label: "Fecha", value: selectedDocument.date, icon: "📆" },
                  { label: "Tamaño", value: selectedDocument.size, icon: "💾" },
                  { label: "Páginas", value: selectedDocument.pages, icon: "📃" },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center p-4 ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    } rounded-lg transition-colors transform hover:scale-102 hover:shadow-md`}
                  >
                    <div className="flex items-center flex-1">
                      <span className="text-xl mr-3">{item.icon}</span>
                      <span className={`${
                        darkMode 
                          ? 'text-gray-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' 
                          : 'text-gray-600'
                      } font-medium`}>
                        {item.label}
                      </span>
                    </div>
                    <span className={`${
                      darkMode 
                        ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                        : 'text-gray-800'
                    }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <button className={`flex-1 flex items-center justify-center gap-2 ${
                  darkMode 
                    ? 'bg-transparent border-2 border-green-500 shadow-[0_0_15px_rgba(74,222,128,0.5)] hover:shadow-[0_0_20px_rgba(74,222,128,0.6)]' 
                    : 'bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg'
                } ${darkMode ? 'text-green-400' : 'text-white'} py-3 px-6 rounded-lg transition-all duration-200 font-medium`}>
                  <FiCheckCircle className={`w-5 h-5 ${darkMode ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.9)]' : ''}`} />
                  <span className={darkMode ? 'drop-shadow-[0_0_8px_rgba(74,222,128,0.9)]' : ''}>Aceptar</span>
                </button>
                <button className={`flex-1 flex items-center justify-center gap-2 ${
                  darkMode 
                    ? 'bg-transparent border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]' 
                    : 'bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg'
                } ${darkMode ? 'text-red-400' : 'text-white'} py-3 px-6 rounded-lg transition-all duration-200 font-medium`}>
                  <FiXCircle className={`w-5 h-5 ${darkMode ? 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]' : ''}`} />
                  <span className={darkMode ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]' : ''}>Rechazar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentInterface;