import React, {useState, useEffect} from 'react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [state, handleSubmit] = useForm("xoqoekpj");
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);


  useEffect(() => {
    if (state.succeeded) {
      setSuccessfulSubmission(true);
      setTimeout(() => {
        window.location.href = "/"; // Redirect to home after 3 seconds
      }, 3000);
    }
  }, [state.succeeded]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl text-center font-bold mb-4">Contact me</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required  // Make email field mandatory
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your message"
              required  // Make message field mandatory
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={state.submitting}
            >
              {state.submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          {state.succeeded && (
            <p className="text-center text-xl text-bold text-green-500 mt-2">Thank you for your message!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
