"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function EducatorWorkspace() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateLesson = async () => {
    if (!topic) return;
    setIsLoading(true);
    setResult("");

    const response = await fetch("/api/generate-lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();
    setResult(data.result);
    setIsLoading(false);
  };

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
      <h2 className="text-2xl font-semibold text-blue-800 mb-2">Educator Workspace</h2>
      <p className="text-gray-700 mb-4">Generate localized Modul Ajar aligned with current frameworks.</p>
      
      <input 
        type="text" 
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter subject and topic (e.g., Bahasa Inggris - Narrative Text)" 
        className="w-full p-2 mb-4 border rounded shadow-sm text-black"
      />
      
      <button 
        onClick={generateLesson}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? "Generating..." : "Generate Modul Ajar"}
      </button>

      {result && (
        <div className="mt-6 p-6 bg-white rounded shadow border text-gray-800 max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-blue-800" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 mt-4 text-blue-700" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 mt-3 text-gray-800" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 text-gray-700" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 text-gray-700" {...props} />,
              table: ({node, ...props}) => <div className="overflow-x-auto mb-4"><table className="min-w-full border-collapse border border-gray-300" {...props} /></div>,
              th: ({node, ...props}) => <th className="border border-gray-300 bg-blue-50 px-4 py-2 font-semibold text-left" {...props} />,
              td: ({node, ...props}) => <td className="border border-gray-300 px-4 py-2" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
            }}
          >
            {result}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}