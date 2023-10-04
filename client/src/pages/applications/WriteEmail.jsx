import React, { useState, useRef } from "react";
import {
  terminationFields,
  registrationFields,
  deregistrationFields,
  applicationFields,
  jobApplicationFields,
  customEmailFields,
} from "../../constant/ApplicationArray";
import { email } from "../../assets";

function WriteEmail() {
  const [selectedApplicationType, setSelectedApplicationType] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [generatingRes, setGeneratingRes] = useState(false);

  const emailRef = useRef(); // Create a ref for the email container

  const systemMessage = {
    role: "system",
    content: `you are an emails writer, your job is to write emails for users.`,
  };

  const handleApplicationChange = (event) => {
    const value = event.target.value;
    switch (value) {
      case "termination":
        setSelectedApplicationType("termination");
        setSelectedFields(terminationFields);
        break;
      case "registration":
        setSelectedApplicationType("registration");
        setSelectedFields(registrationFields);
        break;
      case "deregistration":
        setSelectedApplicationType("deregistration");
        setSelectedFields(deregistrationFields);
        break;
      case "application":
        setSelectedApplicationType("application");
        setSelectedFields(applicationFields);
        break;
      case "jobApplication":
        setSelectedApplicationType("jobApplication");
        setSelectedFields(jobApplicationFields);
        break;
      case "customEmail":
        setSelectedApplicationType("customEmail");
        setSelectedFields(customEmailFields);
        break;
      default:
        setSelectedApplicationType("");
        setSelectedFields([]);
    }
  };
  //  const handleFieldChange = (event) => {
  const generatePrompt = () => {
    let prompt = "";
    switch (selectedApplicationType) {
      case "jobApplication":
        prompt = `my name is:${selectedFields[0].value}, the company name is:${selectedFields[3].value}, the position is: ${selectedFields[2].value}, the reason is:${selectedFields[6].value}, my qualifications:${selectedFields[4].value}, my experience:${selectedFields[5].value}, based on these information write a job application Email `;
        break;

      case "registration":
        prompt = `my name is:${selectedFields[0].value}, the reason is:${selectedFields[6].value}, based on these information Write a registration email to :${selectedFields[3].value} `;
        break;

      case "deregistration":
        prompt = `my name is:${selectedFields[0].value}, the company name is:${selectedFields[3].value}, the position is: ${selectedFields[2].value}, the reason is:${selectedFields[6].value}, my qualifications:${selectedFields[4].value}, my experience:${selectedFields[5].value}, based on these information write a job application Email `;
        break;

      case "application":
        prompt = `my name is:${selectedFields[0].value}, the company name is:${selectedFields[3].value}, the position is: ${selectedFields[2].value}, the reason is:${selectedFields[6].value}, my qualifications:${selectedFields[4].value}, my experience:${selectedFields[5].value}, based on these information write a job application Email `;
        break;

      case "termination":
        prompt = `my name is:${selectedFields[0].value}, the company name is:${selectedFields[3].value}, the position is: ${selectedFields[2].value}, the reason is:${selectedFields[4].value}, Desired date of the last day of work:${selectedFields[5].value}, based on these information write a termination Email from my work place `;
        break;

      case "customEmail":
        prompt = `write a professional email based on the following information : ${selectedFields[0].value}`;
        break;

      // Add cases for other application types
      default:
        break;
    }

    return prompt;
  };
  const generateRes = async () => {
    if (selectedFields.length === 0) {
      alert("Please select an application type");
      return;
    }
    if (selectedFields.some((field) => field.value === "")) {
      alert("Please fill in all fields");
      return;
    }
    const prompt = generatePrompt();
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
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedFields);
  };
  const copyToClipboard = () => {
    const textToCopy = emailRef.current.textContent;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        console.log("Email copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy email: ", err);
      }
    );
  };

  return (
    <section className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <form className="mt-16 ml-1 mr-5" onSubmit={handleSubmit}>
        <img src={email} alt="email" className="h-20 w-20" />
        <div>
          <h1 className="mb-4 text-blue-900">
            With one click create your email
          </h1>
          <label htmlFor="applicationType"></label>
          <select
            className="inline-flex w-full justify-center mb-5 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="applicationType"
            onChange={handleApplicationChange}>
            <option value="">Select an application type</option>
            <option value="termination">Termination</option>
            <option value="registration">Registration</option>
            <option value="deregistration">Deregistration</option>
            <option value="application">Application</option>
            <option value="jobApplication">Job Application</option>
            <option value="customEmail">Custom Email</option>
          </select>
          {selectedFields.map((field, index) => (
            <div className="flex items-center gap-5 mb-2" key={index}>
              <label
                className="block text-sm font-medium clon text-gray-900 ml-1 mr-5 "
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
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-green-900">
            {generatingRes ? "Writing ..." : "Write Email"}
          </button>
        </div>
      </form>
      {responseData && (
        <div className="mt-5">
          <h3>The Email: </h3>
          <div
            ref={emailRef}
            className="bg-gray-100  max-w-full overflow-x-auto whitespace-pre-wrap scrollbar-none mb-2 text-sm p-2 rounded-lg w-max ">
            {responseData.answer}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={copyToClipboard}
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-green-900">
              Copy
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
export default WriteEmail;
