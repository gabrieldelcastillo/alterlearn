import React, { useState, useRef } from "react";
import { FiUpload, FiPlus, FiMinus } from "react-icons/fi";

const PublishComponent = ({ darkMode }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [contentFields, setContentFields] = useState([{ id: 1, value: "" }]);
  const [formData, setFormData] = useState({
    career: "",
    subject: "",
    teacher: "",
    year: "",
    type: ""
  });

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileSelect = (file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setSelectedPreview("Document Preview Not Available");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (id, value) => {
    setContentFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const addContentField = () => {
    const newId = contentFields[contentFields.length - 1].id + 1;
    setContentFields((prev) => [...prev, { id: newId, value: "" }]);
  };

  const removeContentField = (id) => {
    setContentFields((prev) => prev.filter((field) => field.id !== id));
  };

  const infoLabels = ["carrera", "asignatura", "profesor", "año", "tipo"];

  return (
    <div className={`h-screen overflow-hidden ${darkMode ? 'bg-transparent' : 'bg-transparent'} p-6`}>
      <div className="h-[85vh] max-w-7xl mx-auto grid grid-cols-12 gap-6 place-items-center">
        <div className={`col-span-4 col-start-5 bg-transparent backdrop-blur-sm bg-opacity-30 rounded-lg shadow-md p-4 overflow-y-auto relative 
          animate-slide-in-left
          ${darkMode 
            ? 'border-2 border-green-500 shadow-[0_0_15px_rgba(74,222,128,0.5)] glow-green-500' 
            : 'border-2 border-black shadow-[0_0_15px_rgba(0,0,0,0.3)] glow-black'
          }
          hover:shadow-lg transition-all duration-300 ease-in-out
          ${darkMode ? 'hover:shadow-green-500/30' : 'hover:shadow-black/20'}
          [box-shadow:0_0_15px_rgba(74,222,128,0.3)]
        `}>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" 
               style={{
                 height: `${Math.min(80, Math.max(20, (selectedFiles.length + Object.keys(formData).length + contentFields.length) * 8))}px`,
                 opacity: (selectedFiles.length + Object.keys(formData).length + contentFields.length) > 4 ? 0.1 : 0.05
               }}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className={`w-full ${
              darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-black hover:bg-gray-900'
            } text-white px-4 py-2 rounded-lg transition-all duration-300 
            hover:scale-[1.02] active:scale-95
            animate-bounce-in
            flex items-center justify-center gap-2`}
          >
            <FiUpload className="text-xl" />
            Subir archivo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
          />
          
          <div className="mt-4 space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                onClick={() => handleFileSelect(file)}
                className={`p-3 border rounded-lg cursor-pointer 
                  animate-fade-in
                  hover:scale-[1.01] active:scale-[0.99] transition-all duration-200
                  ${darkMode 
                    ? 'border-gray-700 hover:bg-gray-700/50' 
                    : 'border-gray-200 hover:bg-gray-50'
                  } ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {file.name}
              </div>
            ))}
          </div>

          {Object.entries(formData).map(([key, value], index) => (
            <div key={key} className="mt-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleInputChange}
                placeholder={infoLabels[index].charAt(0).toUpperCase() + infoLabels[index].slice(1)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 
                  hover:shadow-sm transition-all duration-200
                  ${darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500 focus:border-green-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                  } outline-none`}
                aria-label={infoLabels[index]}
              />
            </div>
          ))}

          {contentFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mt-4 animate-fade-in" 
                 style={{ animationDelay: `${(index + Object.keys(formData).length) * 100}ms` }}>
              <div className="flex-1">
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => handleContentChange(field.id, e.target.value)}
                  placeholder={`Contenido ${index + 1}`}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500 focus:border-green-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                  } outline-none transition-shadow`}
                  aria-label={`Content ${index + 1}`}
                />
              </div>
              {contentFields.length < 10 && index === contentFields.length - 1 && (
                <button
                  onClick={addContentField}
                  className={`self-end p-2 ${
                    darkMode 
                      ? 'text-green-400 hover:bg-gray-700' 
                      : 'text-blue-600 hover:bg-blue-50'
                  } rounded-lg transition-colors`}
                  aria-label="Add content field"
                >
                  <FiPlus className="text-xl" />
                </button>
              )}
              {contentFields.length > 1 && (
                <button
                  onClick={() => removeContentField(field.id)}
                  className={`self-end p-2 ${
                    darkMode 
                      ? 'text-red-400 hover:bg-gray-700' 
                      : 'text-red-600 hover:bg-red-50'
                  } rounded-lg transition-colors`}
                  aria-label="Remove content field"
                >
                  <FiMinus className="text-xl" />
                </button>
              )}
            </div>
          ))}

          <button className={`w-full ${
            darkMode 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-black hover:bg-gray-900'
          } text-white px-4 py-2 rounded-lg 
          transition-all duration-300 
          hover:scale-[1.02] active:scale-95
          animate-pop
          mt-6`}>
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishComponent;