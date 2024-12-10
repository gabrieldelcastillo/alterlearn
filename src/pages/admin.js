import React, { useState } from "react";
import { FiUser, FiBook, FiCalendar, FiFileText, FiCheckCircle, FiXCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DocumentInterface = () => {
  const [requests] = useState([
    {
      id: 1,
      career: "Ingeniería Civil",
      subject: "Cálculo Diferencial",
      type: "Certamen (sin solución)",
      year: "2024",
      username: "john_doe"
    },
    {
      id: 2,
      career: "Medicina",
      subject: "Anatomía I",
      type: "Apuntes",
      year: "2024",
      username: "jane_smith"
    },
    {
      id: 3,
      career: "Ingeniería Civil",
      subject: "Física Mecánica",
      type: "Control",
      year: "2024",
      username: "mike_wilson"
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState({
    title: "Advanced Data Structures Implementation",
    author: "John Doe",
    date: "2024-02-15",
    format: "PDF",
    size: "2.5 MB",
    pages: 12,
    currentPage: 1
  });

  const handleRowClick = (request) => {
    setSelectedDocument({
      title: `${request.subject} ${request.type}`,
      author: request.username,
      date: new Date().toISOString().split("T")[0],
      format: "PDF",
      size: "2.5 MB",
      pages: Math.floor(Math.random() * 20) + 1,
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
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/3 p-4 bg-white shadow-lg overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de usuario</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrera</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignatura</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr 
                  key={request.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  onClick={() => handleRowClick(request)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.career}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full md:w-1/3 p-4 bg-gray-50 border-x border-gray-200">
        <div className="h-full flex flex-col">
          <div className="flex-grow">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>
          <div className="mt-auto pt-4 flex items-center justify-center gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={selectedDocument.currentPage === 1}
              className="flex items-center justify-center p-2 rounded-full bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
              aria-label="Previous page"
            >
              <FiChevronLeft size={24} />
            </button>
            <span className="text-gray-700 font-medium">
              Página {selectedDocument.currentPage} of {selectedDocument.pages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={selectedDocument.currentPage === selectedDocument.pages}
              className="flex items-center justify-center p-2 rounded-full bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
              aria-label="Next page"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 p-4 bg-white shadow-lg flex flex-col justify-center">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Información del Archivo</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Fecha</span>
              <span className="font-medium">{selectedDocument.date}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Formato</span>
              <span className="font-medium">{selectedDocument.format}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Tamaño</span>
              <span className="font-medium">{selectedDocument.size}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Páginas</span>
              <span className="font-medium">{selectedDocument.pages}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Información del recurso</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Nombre de usuario</span>
              <span className="font-medium">{selectedDocument.author}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Carrera</span>
              <span className="font-medium">{requests.find(r => r.username === selectedDocument.author)?.career || ""}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Asignatura</span>
              <span className="font-medium">{requests.find(r => r.username === selectedDocument.author)?.subject || ""}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Año</span>
              <span className="font-medium">{requests.find(r => r.username === selectedDocument.author)?.year || ""}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Tipo</span>
              <span className="font-medium">{requests.find(r => r.username === selectedDocument.author)?.type || ""}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
              aria-label="Accept document"
            >
              <FiCheckCircle />
              Aceptar
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
              aria-label="Reject document"
            >
              <FiXCircle />
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentInterface;