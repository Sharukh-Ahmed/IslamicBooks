import React from "react";
import { Mail, Linkedin, Github } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="max-w-4xl mt-12 mx-auto px-4 py-16 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">Contact Us</h1>

      <p className="text-lg text-zinc-300 mb-8 text-center">
        We'd love to hear from you! Whether you have a question about books, need help, or want to collaborate, reach out anytime.
      </p>

      <div className="bg-zinc-900 p-6 rounded-2xl shadow border border-zinc-700">
        <form className="space-y-6">
          <div>
            <label className="block mb-1 text-zinc-400">Your Name</label>
            <input type="text" className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white" required />
          </div>
          <div>
            <label className="block mb-1 text-zinc-400">Email Address</label>
            <input type="email" className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white" required />
          </div>
          <div>
            <label className="block mb-1 text-zinc-400">Message</label>
            <textarea rows="5" className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white" required />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Socials and Emails */}
      <div className="mt-12 border-t border-zinc-700 pt-8 text-center space-y-4">
        <p className="text-xl font-semibold text-primary">You can also reach me at:</p>

        <div className="flex justify-center gap-6 flex-wrap text-zinc-300 text-sm">
          <a href="mailto:rahhatalqalb@gmail.com" className="flex items-center gap-2 hover:text-orange-400">
            <Mail size={18} /> rahhatalqalb@gmail.com
          </a>
          <a href="mailto:sharukhahmed0706@gmail.com" className="flex items-center gap-2 hover:text-orange-400">
            <Mail size={18} /> sharukhahmed0706@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/sharukh-ahmed/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-400">
            <Linkedin size={18} /> LinkedIn
          </a>
          <a href="https://github.com/Sharukh-Ahmed" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-400">
            <Github size={18} /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
