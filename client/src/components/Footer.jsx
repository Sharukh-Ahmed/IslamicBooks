import React from 'react'

const Footer = () => {
    const linkSections = [
        {
            title: "Quick Links",
            links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
        },
        {
            title: "Need Help?",
            links: ["Where to Start?", "Obligatory Knowledge", "Gems for Student of Knowledge", "Must Read", "Talk to Us"]
        },
        {
            title: "Follow Us",
            links: ["Instagram", "LinkedIn", "Facebook", "YouTube"]
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

                    <p className="max-w-[510px] mt-6">Classical Islamic books, freely accessible.
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
                                        <a href="#" className="hover:underline transition">{link}</a>
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
}

export default Footer