"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ResearcherWorkspace() {
  const [textData, setTextData] = useState("");
  const [analysisType, setAnalysisType] = useState("thematic");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const analyzeData = async () => {
    if (!textData) return;
    setIsLoading(true);
    setResult("");

    const response = await fetch("/api/analyze-research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textData, analysisType }),
    });

    const data = await response.json();
    setResult(data.result);
    setIsLoading(false);
  };

  return (
    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
      <h2 className="text-2xl font-semibold text-emerald-800 mb-2">Researcher Workspace</h2>
      <p className="text-gray-700 mb-4">Analyze qualitative transcripts or refine academic manuscripts.</p>
      
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer text-gray-800">
          <input 
            type="radio" 
            name="analysisType" 
            value="thematic" 
            checked={analysisType === "thematic"} 
            onChange={(e) => setAnalysisType(e.target.value)} 
          />
          Thematic Analysis (Transcripts)
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-gray-800">
          <input 
            type="radio" 
            name="analysisType" 
            value="refinement" 
            checked={analysisType === "refinement"} 
            onChange={(e) => setAnalysisType(e.target.value)} 
          />
          Academic English Refinement
        </label>
      </div>

      <textarea 
        value={textData}
        onChange={(e) => setTextData(e.target.value)}
        placeholder="Paste your interview transcript or manuscript draft here..." 
        className="w-full p-3 mb-4 border rounded shadow-sm text-black min-h-[150px]"
      />
      
      <button 
        onClick={analyzeData}
        disabled={isLoading}
        className="bg-emerald-600 text-white px-4 py-2 rounded shadow hover:bg-emerald-700 transition disabled:opacity-50"
      >
        {isLoading ? "Processing Data..." : "Run Analysis"}
      </button>

      {result && (
        <div className="mt-6 p-6 bg-white rounded shadow border text-gray-800 max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-emerald-800" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 mt-4 text-emerald-700" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 mt-3 text-gray-800" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 text-gray-700" {...props} />,
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