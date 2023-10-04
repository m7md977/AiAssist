import React, { useState } from "react";
import { messagecloud } from "../../assets";
import {
  globalField,
  EnglishField,
  FrenchField,
  GermanField,
  SpanishField,
  ItalianField,
} from "../../constant/LanguagesArray";

function CorrectMyLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [generatingRes, setGeneratingRes] = useState(false);
  const [copy, setCopy] = useState(false);

  const systemMessage = {
    role: "system",
    content: `you are a language teacher, your job is to correct the user sentences.`,
  };

  const handleLanguageChange = (event) => {
    const value = event.target.value;
    switch (value) {
      case "english":
        setSelectedLanguage("english");
        setSelectedFields(EnglishField);
        break;
      case "french":
        setSelectedLanguage("french");
        setSelectedFields(FrenchField);
        break;
      case "german":
        setSelectedLanguage("german");
        setSelectedFields(GermanField);
        break;
      case "spanish":
        setSelectedLanguage("spanish");
        setSelectedFields(SpanishField);
        break;
      case "italian":
        setSelectedLanguage("italian");
        setSelectedFields(ItalianField);
        break;
      case "global":
        setSelectedLanguage("global");
        setSelectedFields(globalField);
        break;
      default:
        setSelectedLanguage("");
        setSelectedFields([]);
    }
  };
  //  const handleFieldChange = (event) => {
  const generatePrompt = () => {
    let prompt = "";
    switch (selectedLanguage) {
      case "global":
        prompt = `I want you to act as a global Language teacher an correct the following sentence in the same language : ${selectedFields[0].value} `;
        break;

      case "english":
        prompt = ` I want you to act as an english Language teacher an correct the following sentence: ${selectedFields[0].value} `;
        break;

      case "french":
        prompt = ` je veux que vous agissiez comme un professeur de langue française et que vous corrigiez la phrase suivante: ${selectedFields[0].value} `;
        break;

      case "german":
        prompt = ` Ich möchte, dass Sie als deutscher Sprachlehrer auftreten und den folgenden Satz korrigieren: ${selectedFields[0].value} `;
        break;

      case "spanish":
        prompt = ` Quiero que actúes como un profesor de idiomas español y que corrijas la siguiente frase: ${selectedFields[0].value} `;
        break;

      case "italian":
        prompt = ` Vorrei che tu agissi come un insegnante di lingua italiana e correggi la seguente frase: ${selectedFields[0].value}`;
        break;

      // Add cases for other application types
      default:
        break;
    }

    return prompt;
  };
  const generateRes = async () => {
    if (selectedFields.length === 0) {
      alert("Please select a Language");
      return;
    }
    if (selectedFields.some((field) => field.value === "")) {
      alert("Please fill in all fields");
      return;
    }
    const prompt = generatePrompt();
    setPrompt(prompt);
    try {
      setGeneratingRes(true);
      const response = await fetch("http://localhost:3080/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [systemMessage, { role: "user", content: prompt }],
        }),
      });
      console.log(prompt);
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setGeneratingRes(false);
    }
  };
  const copyResponseDataToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(responseData.answer));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedFields);
  };

  return (
    <section className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <form className="mt-16 ml-1 mr-5" onSubmit={handleSubmit}>
        <div>
          <img src={messagecloud} alt="email" className="h-20 w-20" />
          <h1 className="mb-4 text-blue-900">
            Enter your Sentence and get the correct One
          </h1>
          <label htmlFor="CorrectMyLanguage"></label>
          <select
            className="inline-flex w-full justify-center mb-5 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="CorrectMyLanguage"
            onChange={handleLanguageChange}>
            <option value="">Select a Language</option>
            <option value="global">Global</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="spanish">Spanish</option>
            <option value="italian">Italian</option>
          </select>
          {selectedFields.map((field, index) => (
            <div className="flex items-center gap-5 mb-2" key={index}>
              <label
                className="block text-sm font-medium text-gray-900 ml-1 mr-5 "
                htmlFor={field.label}>
                {field.label}:
              </label>
              <input
                placeholder={field.placeholder}
                className=" bg-gray-50 border border-gray-300 text-gray-900 items-center text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 shadow-inner"
                type="text"
                id={field.label}
                value={field.value}
                onChange={(event) => {
                  const updatedFields = [...selectedFields];
                  updatedFields[index].value = event.target.value;
                  setSelectedFields(updatedFields);
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateRes}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {generatingRes ? "Correcting ..." : "Correct it"}
          </button>
        </div>
      </form>
      {responseData && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            the Corrected Sentence is:
          </h2>
          <div className="bg-gray-100 p-4 rounded-md justify-center items-center overflow-x: auto">
            {JSON.stringify(responseData.answer, null, 2)}
          </div>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={copyResponseDataToClipboard}>
            {copy ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </section>
  );
}
export default CorrectMyLanguage;
