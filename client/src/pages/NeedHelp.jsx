import React from "react";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

const helpTopics = [
  {
    // id:"starter",
    question: "Where to Start?",
    answer: `Begin with learning the core beliefs (Aqeedah), especially Tawheed (Oneness of Allah). Imam Al-Barbahari in "Sharh us-Sunnah" emphasizes starting with belief before action. Recommended books: "The Three Fundamental Principles" by Shaykh Muhammad ibn Abdul-Wahhab.`
  },
  {
    // id:"obligatory",
    question: "Obligatory Knowledge",
    answer: `Obligatory knowledge includes matters every Muslim must know: beliefs, purification, prayer, and avoiding major sins. Imam al-Shafi'i said: "It is obligatory upon every Muslim to seek knowledge that rectifies his deen." Recommended books: Kitab ut Tawheed and Umdatul AHkaam`
  },
  {
    // id:"gems",
    question: "Gems for Student of Knowledge",
    answer: `Ibn al-Qayyim advised: “The more sincere the seeker, the more he is granted success.” Focus on Ikhlaas (sincerity), adopt discipline in learning, and follow scholars upon Sunnah. Recommended: "FatHul Baari" by Ibn Hajr.`
  },
  {
    // id:"mustread",
    question: "Must Read",
    answer: `Core texts every serious learner should read include:
    - "Usool ath-Thalaatha" (Three Fundamental Principles)
    - "Kitab at-Tawheed"
    - "Aqeedah Al Wasitiyyah"
    - "40 Hadith Nawawi"
    - "Riyadh as-Saaliheen"`},
  {
    // id:"talk",
    question: "Talk to Us",
    answer: `We welcome questions about books, beliefs, and practices. If you want to connect for clarification or guidance, please use the Contact Us page or email us at rahhatalqalb@gmail.com`
  }
];

const NeedHelp = () => {

//       const location = useLocation();

//   useEffect(() => {
//     const hash = location.hash?.substring(1);
//     if (hash) {
//       const el = document.getElementById(hash);
//       if (el) {
//         setTimeout(() => {
//           el.scrollIntoView({ behavior: "smooth" });
//         }, 100); // delay to ensure DOM is ready
//       }
//     }
//   }, [location]);

  return (
    <div className="max-w-5xl mt-12 mx-auto px-4 py-16 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">Need Help?</h1>
      <div className="space-y-10">
        {helpTopics.map((topic, index) => (
          <div key={index} className="bg-zinc-900 rounded-2xl p-6 shadow border border-zinc-700">
            <h2 className="text-xl font-semibold text-orange-400 mb-2">{topic.question}</h2>
            <p className="text-zinc-300 leading-relaxed">{topic.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeedHelp;
