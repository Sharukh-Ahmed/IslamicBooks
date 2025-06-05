import React from 'react'

const About = () => {
    return (
    
    <div className='mt-28'>
        {/* <div className='flex flex-col items-end w-max text-white'>
            <p className='text-2xl text-white font-medium'>About</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div> */}
        <div className="bg-gradient-to-br from-black via-primary/25 to-black text-white p-6 md:p-12 rounded-2xl shadow-xl max-w-5xl mx-auto space-y-8">
      {/* Section: Website Info */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">🕌 About Us – من نحن</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          Welcome to <span className="text-orange-300 font-semibold">IslamicBooks</span>, your trusted digital library for authentic <strong>Islamic books in both English and Arabic</strong>. Our mission is to make classical Islamic knowledge <strong>accessible, searchable, and beautifully organized</strong> for everyone—students, researchers, and seekers of truth.
        </p>
        <p className="text-lg leading-relaxed text-gray-300 mt-2">
          Whether you're looking for renowned works like <em>Fath al-Bari</em>, <em>Tafsir as-Sa'di</em>, <em>Bulugh al-Maram</em>, or foundational Arabic texts like <em>Al-Ajrumiyyah</em>, you’ll find high-quality <strong>eBooks, categorized by topic and scholar</strong>, all in one place.
        </p>
      </section>

      {/* Section: About Me */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">👤 About Me – عني</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          I’m <strong>Sharukh Ahmed</strong>, a passionate student of Islamic knowledge and a full-time <strong>MERN stack and Mobile App developer</strong>. Originally a mechanical engineer, my love for technology and deep interest in classical Islamic texts led me to create this platform.
        </p>
        <p className="text-lg leading-relaxed text-gray-300 mt-2">
          🌱 My goal is simple: <strong>To preserve and spread timeless Islamic knowledge</strong> using modern technology, ensuring it reaches the hearts and minds of Muslims around the world.
        </p>
      </section>

      {/* Section: Technical Skills */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">💻 Technical Background – خلفيتي التقنية</h2>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-1 pl-4">
          <li><strong>Frontend:</strong> JavaScript, React, React Native, Next, Tailwind</li>
          <li><strong>Backend:</strong> Node.js, Express.js, Python, Java</li>
          <li><strong>Database:</strong> MongoDB, MySQL</li>
          <li><strong>Tools:</strong> Git, GitHub, VS Code, Postman, </li>
          <li><strong>AI Tools:</strong>GitHub Co-Pilot, Google Studio, GPTs, Cursor</li>
          <li><strong>Special Interest:</strong>To help Ease real life problems using Tech</li>
        </ul>
      </section>

      {/* Section: Footer */}
      <footer className="pt-6 border-t border-gray-700">
        <p className="text-gray-400 italic text-lg">
          “And say: My Lord, increase me in knowledge.” — <strong>Qur’an 20:114</strong>
        </p>
        <div className="mt-4 text-gray-300">
          📧 <span className="font-semibold">Contact:</span> sharukhahmed0706@gmail.com <br />
          🌐 <span className="font-semibold">Follow:</span> Sharukh-Ahmed (GitHub)
        </div>
      </footer>
    </div>
    </div>
    )
}

export default About