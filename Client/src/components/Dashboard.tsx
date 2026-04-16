'use client'

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, X } from "lucide-react"

export default function UploadContract() {

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (e) => {

    const selected = e.target.files[0]
    if (!selected) return

    setFile(selected)

    if (selected.type.startsWith("image/")) {
      const url = URL.createObjectURL(selected)
      setPreview(url)
    } else {
      setPreview(null)
      setFile(null)
      alert('Only image accepeted')
    }

  }

  const removeFile = () => {

    setFile(null)
    setPreview(null)

    if (inputRef.current) inputRef.current.value = ""

  }

  const openFile = () => {
    inputRef.current?.click()
  }


const handleDragOver = (e) => {
  e.preventDefault()
  setDragging(true)
}

const handleDragLeave = () => {
  setDragging(false)
}

const handleDrop = (e) => {
  e.preventDefault()
  setDragging(false)

  const droppedFile = e.dataTransfer.files[0]
  if (!droppedFile) return

  setFile(droppedFile)

  if (droppedFile.type.startsWith("image/")) {
    setPreview(URL.createObjectURL(droppedFile))
  }
  else{
    setFile(null)
    alert('Only image accepeted')
  }
}

  return (

    <div className="min-h-screen flex items-center justify-center p-6">

      <div className="w-full max-w-xl">

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-white mb-3">
            Upload Your Contract
          </h1>

          <p className="text-gray-400 text-sm">
            Upload your contract to analyze risks and store it securely
            for future legal verification.
          </p>
        </div>

        {/* Upload Box */}
        <motion.div
  whileHover={{ scale: 1.02 }}
  onClick={openFile}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
  className={`relative cursor-pointer border-2 border-dashed rounded-xl p-10 transition
  ${dragging
    ? "border-blue-500"
    : "border-blue-500/30"
  }`}
>

          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFile}
          />

          {/* Remove Button */}
          {file && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
              className="absolute top-3 right-3 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-full p-1 transition"
            >
              <X size={16} />
            </button>
          )}

          {/* Preview */}
          {preview ? (

            <img
              src={preview}
              alt="contract preview"
              className="max-h-64 mx-auto rounded-lg object-contain"
            />

          ) : file ? (

            <div className="flex flex-col items-center gap-3">
              <div className="text-blue-400 text-3xl">📄</div>
              <p className="text-sm text-gray-200">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

          ) : (

            <div className="flex flex-col items-center gap-4">

              <Upload size={28} className="text-blue-400" />

              <p className="text-gray-300 text-sm">
                Drag & drop your contract here
              </p>

              <p className="text-gray-500 text-xs">
                or click to browse files
              </p>

            </div>

          )}

        </motion.div>

        {/* Verify Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition"
        >
          Verify Contract
        </motion.button>

      </div>

    </div>
  )
}