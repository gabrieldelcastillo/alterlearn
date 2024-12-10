import React, { useState, useRef } from "react";
import { FiUpload, FiPlus, FiMinus } from "react-icons/fi";

const FileUploadComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [contentFields, setContentFields] = useState([{ id: 1, value: "" }]);
  const [formData, setFormData] = useState({
    carrera: "",
    asignatura: "",
    profesor: "",
    anio: "",
    tipo: ""
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <button
            onClick={() => fileInputRef.current.click()}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiUpload className="text-xl" />
            Subir archivo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            multiple
          />
          <div className="mt-4 space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                onClick={() => handleFileSelect(file)}
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {file.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          {selectedPreview ? (
            typeof selectedPreview === "string" && selectedPreview.startsWith("data:image") ? (
              <img
                src={selectedPreview}
                alt="Preview"
                className="max-w-full max-h-[500px] object-contain"
              />
            ) : (
              <div className="text-gray-500">{selectedPreview}</div>
            )
          ) : (
            <div className="text-gray-400">No hay un archivo seleccionado</div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                aria-label={key}
              />
            </div>
          ))}

          {contentFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1 space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Contenido {index + 1}
                </label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => handleContentChange(field.id, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  aria-label={`Content ${index + 1}`}
                />
              </div>
              {index === contentFields.length - 1 && (
                <button
                  onClick={addContentField}
                  className="self-end p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Add content field"
                >
                  <FiPlus className="text-xl" />
                </button>
              )}
              {contentFields.length > 1 && (
                <button
                  onClick={() => removeContentField(field.id)}
                  className="self-end p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove content field"
                >
                  <FiMinus className="text-xl" />
                </button>
              )}
            </div>
          ))}

          <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-6">
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;