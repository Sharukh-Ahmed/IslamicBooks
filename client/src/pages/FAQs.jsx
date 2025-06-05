import React, { useState } from "react";

const FAQs = () => {
  const faqCategories = [
    {
      category: "General Questions",
      faqs: [
        {
          question: "Are all books free?",
          answer:
            "Yes, every book listed on Islamic Books is freely accessible for personal study and benefit.",
        },
        {
          question: "Can I contribute content?",
          answer:
            "Absolutely! We welcome authentic, classical works. Please contact us via the Contact page to discuss your contribution.",
        },
        {
          question: "Do I need to register to access the books?",
          answer:
            "No, currently no registration is required to read or download books.",
        },
        {
          question: "Are there any advertisements on the site?",
          answer:
            "No, the website is kept clean and free of ads to provide a distraction-free experience.",
        },
      ],
    },
    {
      category: "Related to Islamic Knowledge",
      faqs: [
        {
          question: "Are these books authentic?",
          answer:
            "Yes, we only showcase works from renowned scholars of the Salaf or those following the same rigorous methodology, ensuring reliability and authenticity.",
        },
        {
          question: "Do you verify the sources?",
          answer:
            "Each book is carefully curated and cross-verified with trusted scholarly resources to maintain high accuracy and relevance.",
        },
        {
          question: "Can I request a specific book to be added?",
          answer:
            "Yes, you can suggest any classical book that fits our principles by contacting us through the site.",
        },
        {
          question: "Are translations also available?",
          answer:
            "Yes, wherever possible, both Arabic and English versions are made available. We prioritize reliable translations of classical works.",
        },
        {
          question: "Do you follow any particular madhhab?",
          answer:
            "The platform follows the methodology of the Salaf, relying on Qur'an and authentic Sunnah with the understanding of the early righteous generations.",
        },
      ],
    },
    {
      category: "Personal Information",
      faqs: [
        {
          question: "What experience do you have in web development?",
          answer:
            "I transitioned from mechanical engineering to full-stack development and have built several projects—most notably, Islamic Books, which leverages the MERN stack.",
        },
        {
          question: "What technical skills do you possess?",
          answer:
            "I work with React, Node.js, MongoDB, Express.js, and tools like Tailwind CSS, Vite, Redux, Stripe API integration, authentication systems, and more.",
        },
        {
          question: "Are you open to remote or freelance opportunities?",
          answer:
            "Yes, I am actively open to both full-time and freelance remote roles in web/app development.",
        },
        {
          question: "What future improvements are you working on for the site?",
          answer:
            "I'm currently working on backend integration (Node.js & MongoDB), secure login with JWT, seller dashboard, Stripe payments, and cart/order systems.",
        },
        {
          question: "Do you have experience working in a team or with version control?",
          answer:
            "Yes, I use Git & GitHub for all projects and am comfortable working in collaborative environments using version control, feature branches, and pull requests.",
        },
        {
          question: "How do you ensure code quality and maintainability?",
          answer:
            "I follow component-based architecture, reuse logic, maintain clean folder structures, and aim for scalability. I also write comments and readable code."
        },
      ],
    },
  ];

  const [openIndices, setOpenIndices] = useState(faqCategories.map(() => null));

  const toggleOpen = (catIndex, faqIndex) => {
    setOpenIndices((prev) => {
      const newIndices = [...prev];
      newIndices[catIndex] = newIndices[catIndex] === faqIndex ? null : faqIndex;
      return newIndices;
    });
  };

  return (
    <div className="max-w-4xl mt-12 mx-auto px-4 py-16 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">
        Frequently Asked Questions
      </h1>
      {faqCategories.map((group, catIndex) => (
        <div key={catIndex} className="mb-10">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">
            {group.category}
          </h2>
          <div className="space-y-4">
            {group.faqs.map((faq, faqIndex) => (
              <div
                key={faqIndex}
                className="bg-zinc-900 border border-zinc-700 rounded-xl p-5"
              >
                <button
                  onClick={() => toggleOpen(catIndex, faqIndex)}
                  className="w-full text-left text-lg font-semibold text-white cursor-pointer focus:outline-none"
                >
                  {faq.question}
                </button>
                {openIndices[catIndex] === faqIndex && (
                  <p className="mt-3 text-primary leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
