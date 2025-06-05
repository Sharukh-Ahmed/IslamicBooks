import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", scrollTo: "hero" },
        { label: "Best Sellers", scrollTo: "best-sellers" },
        { label: "Offers & Deals", to: "/books" },
        { label: "Contact Us", to: "/contact" },
        { label: "FAQs", to: "/faqs" }
      ]
    },
    {
      title: "Need Help?",
      links: [
        { label: "Where to Start?", to: "/need-help"  },
        { label: "Obligatory Knowledge", to: "/need-help" },
        { label: "Gems for Student of Knowledge", to: "/need-help" },
        { label: "Must Read", to: "/need-help" },
        { label: "Talk to Us", to: "/need-help" }
      ]
    },
    {
      title: "Follow Us",
      links: [
        { label: "GitHub", external: "https://github.com/Sharukh-Ahmed" },
        { label: "LinkedIn", external: "https://www.linkedin.com/in/sharukh-ahmed/" },
        // { label: "", external: "https://facebook.com/yourpage" },
        { label: "YouTube", external: "https://www.youtube.com/@rahhatalqalb9689" }
      ]
    }
  ];

  return (
    <div className="mt-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/5">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <div className='flex items-center gap-2'>
            <img className="w-15 md:w-15" src="/Site Logo.png" alt="Logo" />
            <p className='text-3xl text-primary'>ISLAMIC BOOKS</p>
          </div>

          <p className="max-w-[510px] mt-6">
            Classical Islamic books, freely accessible.
            Browse a growing library of authentic works by the Salaf and leading scholars — in Arabic and English. Deepen your understanding of the Deen through well-sourced, timeless knowledge.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-primary md:mb-5 mb-2">{section.title}</h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link.scrollTo ? (
                      <ScrollLink
                        to={link.scrollTo}
                        smooth={true}
                        duration={600}
                        offset={-100}
                        className="cursor-pointer hover:underline transition"
                      >
                        {link.label}
                      </ScrollLink>
                    ) : link.external ? (
                      <a
                        href={link.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a href={link.to} className="hover:underline transition">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright {new Date().getFullYear()} © IslamicBooks All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
