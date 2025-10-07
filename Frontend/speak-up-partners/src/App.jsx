/*
Speak Up Partners - Frontend (React + Tailwind)
Single file with all pages, new color theme, and registration forms
*/

import React, { useState } from 'react';

// Main App Component with Routing
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'blog':
        return <BlogPage />;
      case 'course-preview':
        return <CoursePreviewPage 
          onDownloadClick={() => setShowDownloadForm(true)}
          onEnrollClick={(course) => {
            setSelectedCourse(course);
            setShowRegistrationForm(true);
          }}
        />;
      case 'courses':
        return <CoursesPage 
          onEnrollClick={(course) => {
            setSelectedCourse(course);
            setShowRegistrationForm(true);
          }}
        />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage 
          onEnrollClick={(course) => {
            setSelectedCourse(course);
            setShowRegistrationForm(true);
          }}
          onPreviewClick={() => setCurrentPage('course-preview')}
        />;
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      <style>{`
        :root{ 
          --primary: #014782; 
          --accent: #FDC412; 
        }
        .hero-gradient {
          background: linear-gradient(135deg, #014782 0%, #0268B4 50%, #038FE6 100%);
        }
        .course-card:hover {
          transform: translateY(-8px);
          transition: transform 0.3s ease;
        }
      `}</style>
      
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <RegistrationForm 
          course={selectedCourse}
          onClose={() => {
            setShowRegistrationForm(false);
            setSelectedCourse(null);
          }}
        />
      )}

      {/* Download Form Modal */}
      {showDownloadForm && (
        <DownloadForm 
          onClose={() => setShowDownloadForm(false)}
        />
      )}
    </div>
  );
};

// Navbar Component
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'courses', label: 'Kursus' },
    { id: 'course-preview', label: 'Preview Kursus' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'Tentang' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,var(--accent),var(--primary))' }}>
            <strong className="text-white">SUP</strong>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--primary)]">Speak Up Partners</h1>
            <p className="text-sm text-slate-500">Master Your Voice</p>
          </div>
        </div>

        <nav className="hidden lg:flex gap-8 items-center text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`transition-colors ${
                currentPage === item.id 
                  ? 'text-[var(--primary)] font-semibold' 
                  : 'text-slate-600 hover:text-[var(--primary)]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('courses')}
            className="px-6 py-2 rounded-full font-semibold text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Daftar Sekarang
          </button>
        </nav>

        <div className="lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2 border rounded-lg"
            style={{ borderColor: 'var(--primary)' }}
          >
            <div className="w-6 h-6 flex flex-col justify-center">
              <span className={`block h-0.5 w-full bg-[var(--primary)] transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-[var(--primary)] mt-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-[var(--primary)] mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 transition-colors ${
                  currentPage === item.id 
                    ? 'text-[var(--primary)] font-semibold' 
                    : 'text-slate-600 hover:text-[var(--primary)]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage('courses');
                setMobileMenuOpen(false);
              }}
              className="w-full px-6 py-2 rounded-full font-semibold text-white mt-4"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// Home Page Component
const HomePage = ({ onEnrollClick, onPreviewClick }) => {
  const courses = [
    {
      id: 1,
      title: 'Public Speaking Mastery',
      desc: 'Kuasai seni berbicara di depan umum dengan teknik teruji. Dari dasar hingga advanced.',
      price: 'Rp 1.299.000',
      duration: '6 Minggu',
      level: 'Semua Level',
      tag: 'Bestseller',
      features: ['Video Materi', 'Live Coaching', 'Sertifikat', 'Group Support'],
      image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Presentation Powerhouse',
      desc: 'Belajar membuat presentasi yang memukau dengan storytelling dan visual impact.',
      price: 'Rp 899.000',
      duration: '4 Minggu',
      level: 'Intermediate',
      tag: 'New',
      features: ['Template Slides', 'One-on-One Feedback', 'Portfolio Review'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop'
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Wijaya',
      role: 'Marketing Manager',
      text: 'Setelah ikut kursus ini, presentasi saya di kantor selalu mendapat apresiasi!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Budi Santoso',
      role: 'Fresh Graduate',
      text: 'Dari grogi sampai sekarang bisa presentasi dengan percaya diri. Recommended banget!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'
    },
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Personal Coaching',
      desc: 'Dapatkan feedback langsung dari coach profesional'
    },
    {
      icon: '📚',
      title: 'Materi Lengkap',
      desc: 'Akses seumur hidup ke semua materi dan update'
    },
    {
      icon: '👥',
      title: 'Komunitas Eksklusif',
      desc: 'Bergabung dengan komunitas pembelajar lainnya'
    },
    {
      icon: '📱',
      title: 'Flexible Learning',
      desc: 'Belajar kapan saja, di mana saja melalui platform kami'
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#038FE6] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#0268B4] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white">
            <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-6">
              🎉 Special Launch Discount - 50% Off
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Ubah <span style={{ color: 'var(--accent)' }}>Ketakutan</span> Menjadi Kekuatan
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Bergabunglah dengan 1,200+ alumni yang telah menguasai public speaking dan membangun karir gemilang.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={() => onEnrollClick(courses[0])}
                className="px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all text-center transform hover:scale-105"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--primary)' }}
              >
                Mulai Belajar Sekarang
              </button>
              <button 
                onClick={onPreviewClick}
                className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white text-white hover:bg-white/10 transition-all text-center transform hover:scale-105"
              >
                Lihat Preview Kursus
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <Stat label="Alumni" value="1.2k+" />
              <Stat label="Rating" value="4.9/5" />
              <Stat label="Success Rate" value="98%" />
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop" 
                alt="Public Speaking Mastery" 
                className="w-full rounded-xl h-80 object-cover"
              />
              <div className="mt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--primary)]">Public Speaking Mastery</h3>
                    <p className="text-slate-600 mt-2">Kursus paling komprehensif untuk menguasai public speaking</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>Rp 649.000</div>
                    <div className="text-sm text-slate-500 line-through">Rp 1.299.000</div>
                  </div>
                </div>
                <button 
                  onClick={() => onEnrollClick(courses[0])}
                  className="w-full py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg text-center transform hover:scale-105"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  Daftar dengan Diskon 50%
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>Mengapa Memilih Kami?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Metode pembelajaran yang telah terbukti efektif membantu ribuan peserta
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Kursus Populer</h2>
            <p className="text-xl text-slate-600">Investasi terbaik untuk masa depan karir Anda</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden course-card">
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold text-white" 
                       style={{ backgroundColor: 'var(--primary)' }}>
                    {course.tag}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--primary)' }}>{course.title}</h3>
                  <p className="text-slate-600 mb-4">{course.desc}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg" style={{ color: 'var(--primary)' }}>{course.price}</span>
                    <span className="text-sm text-slate-500">{course.duration}</span>
                  </div>

                  <button 
                    onClick={() => onEnrollClick(course)}
                    className="w-full py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg text-center"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    Lihat Detail Kursus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Kata Alumni Kami</h2>
            <p className="text-xl text-slate-600">Bukti nyata kesuksesan peserta kursus</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--primary)' }}>{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-700 italic">"{testimonial.text}"</p>
                <div className="flex mt-3" style={{ color: 'var(--accent)' }}>
                  {'★'.repeat(5)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

// Blog Page Component
const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: '5 Tips Mengatasi Anxiety Saat Presentasi',
      excerpt: 'Pelajari teknik sederhana untuk mengatasi nervous dan tampil percaya diri di depan audiens.',
      date: '2024-03-15',
      category: 'Tips & Trik',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Membangun Struktur Presentasi yang Kuat',
      excerpt: 'Rahasia membuat presentasi yang mudah diikuti dan memorable bagi audiens.',
      date: '2024-03-10',
      category: 'Presentation',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Storytelling dalam Public Speaking',
      excerpt: 'Gunakan kekuatan cerita untuk membuat presentasi Anda lebih berkesan.',
      date: '2024-03-05',
      category: 'Storytelling',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
      readTime: '6 min read'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--primary)' }}>Blog & Artikel</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tips, trik, dan insight terbaru tentang public speaking dan pengembangan diri
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-white" 
                        style={{ backgroundColor: 'var(--primary)' }}>
                    {post.category}
                  </span>
                  <span className="text-sm text-slate-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                  {post.title}
                </h2>
                <p className="text-slate-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">{post.date}</span>
                  <button className="text-sm font-medium hover:underline" style={{ color: 'var(--primary)' }}>
                    Baca Selengkapnya →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

// Course Preview Page Component
const CoursePreviewPage = ({ onDownloadClick, onEnrollClick }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--primary)' }}>Preview Kursus</h1>
          <p className="text-xl text-slate-600">
            Lihat sekilas materi dan metode pembelajaran yang akan Anda dapatkan
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                  Public Speaking Mastery - Preview
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>Apa yang akan Anda pelajari?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span style={{ color: 'var(--primary)' }} className="mr-2">✓ Teknik mengatasi nervous dan grogi</span>
                      </li>
                      <li className="flex items-center">
                        <span style={{ color: 'var(--primary)' }} className="mr-2">✓ Struktur presentasi yang efektif</span>
                      </li>
                      <li className="flex items-center">
                        <span style={{ color: 'var(--primary)' }} className="mr-2">✓ Seni storytelling dalam public speaking</span>
                      </li>
                      <li className="flex items-center">
                        <span style={{ color: 'var(--primary)' }} className="mr-2">✓ Body language dan vocal variety</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>Metode Pembelajaran</h3>
                    <ul style={{ color: 'var(--primary)' }} className="space-y-2">
                      <li>• Video pembelajaran interaktif</li>
                      <li>• Live coaching session</li>
                      <li>• Practice assignment</li>
                      <li>• Community support</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => onEnrollClick({
                      title: 'Public Speaking Mastery',
                      price: 'Rp 1.299.000',
                      discountedPrice: 'Rp 649.000'
                    })}
                    className="px-8 py-4 rounded-full font-bold text-lg text-white hover:shadow-xl transition-all"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    Daftar Kursus Lengkap
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Single Ebook Material */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>Materi Preview</h3>
              <p className="text-slate-600 mb-4">Download ebook preview gratis untuk melihat kualitas pembelajaran kami</p>
              
              {/* Single Ebook Card */}
              <div className="border-2 border-dashed border-[var(--primary)] rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
                <div className="text-6xl mb-4">📚</div>
                <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--primary)' }}>
                  Ebook Preview: Public Speaking Basics
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  15 halaman • PDF • 2.4 MB
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Pelajari dasar-dasar public speaking dan teknik mengatasi grogi
                </p>
                <button 
                  onClick={onDownloadClick}
                  className="w-full py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg text-center"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  Download Ebook Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Courses Page Component
const CoursesPage = ({ onEnrollClick }) => {
  const courses = [
    {
      id: 1,
      title: 'Public Speaking Mastery',
      desc: 'Kuasai seni berbicara di depan umum dengan teknik teruji. Dari dasar hingga advanced.',
      price: 'Rp 1.299.000',
      discountedPrice: 'Rp 649.000',
      duration: '6 Minggu',
      level: 'Semua Level',
      tag: 'Bestseller',
      features: ['Video Materi', 'Live Coaching', 'Sertifikat', 'Group Support'],
      image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Presentation Powerhouse',
      desc: 'Belajar membuat presentasi yang memukau dengan storytelling dan visual impact.',
      price: 'Rp 899.000',
      discountedPrice: 'Rp 449.000',
      duration: '4 Minggu',
      level: 'Intermediate',
      tag: 'New',
      features: ['Template Slides', 'One-on-One Feedback', 'Portfolio Review'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Confident Communication',
      desc: 'Tingkatkan kepercayaan diri dalam berkomunikasi untuk karir dan kehidupan sosial.',
      price: 'Rp 1.499.000',
      discountedPrice: 'Rp 749.000',
      duration: '8 Minggu',
      level: 'Pemula',
      tag: 'Most Popular',
      features: ['Role Playing', 'Real Practice', 'Personality Assessment', 'Lifetime Access'],
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--primary)' }}>Semua Kursus</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Pilih kursus yang sesuai dengan kebutuhan dan level Anda. Diskon 50% untuk pendaftaran pertama!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden course-card">
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold text-white" 
                     style={{ backgroundColor: 'var(--primary)' }}>
                  {course.tag}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--primary)' }}>{course.title}</h3>
                <p className="text-slate-600 mb-4">{course.desc}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Level:</span>
                    <span className="font-semibold">{course.level}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Durasi:</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Harga:</span>
                    <div className="text-right">
                      <span className="text-lg font-bold block" style={{ color: 'var(--primary)' }}>
                        {course.discountedPrice}
                      </span>
                      <span className="text-sm text-slate-500 line-through">{course.price}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>Yang Anda Dapatkan:</h4>
                  <div className="grid gap-1">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-600">
                        <span className="mr-2" style={{ color: 'var(--primary)' }}>✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => onEnrollClick(course)}
                    className="w-full py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// About Page Component
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--primary)' }}>Tentang Speak Up Partners</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Kami adalah platform pembelajaran public speaking terdepan yang telah membantu ribuan profesional 
            mengembangkan kemampuan berbicara di depan umum dengan percaya diri.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>Visi & Misi</h2>
            <div className="space-y-4">
              <p className="text-lg text-slate-700">
                <strong>Visi:</strong> Menjadi partner terpercaya dalam mengembangkan kemampuan komunikasi 
                publik yang efektif bagi setiap individu di Indonesia.
              </p>
              <p className="text-lg text-slate-700">
                <strong>Misi:</strong> Menyediakan program pembelajaran yang komprehensif, praktis, 
                dan mudah diakses untuk membantu peserta mengatasi ketakutan berbicara di depan umum 
                dan mengembangkan karir mereka.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop" 
              alt="Team Collaboration" 
              className="w-full rounded-lg h-64 object-cover"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--primary)' }}>
            Mengapa Memilih Kami?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                   style={{ backgroundColor: 'var(--accent)' }}>
                👨‍🏫
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>Coach Berpengalaman</h3>
              <p className="text-slate-600">Dibimbing oleh profesional dengan pengalaman lebih dari 10 tahun</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                   style={{ backgroundColor: 'var(--accent)' }}>
                📈
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>Metode Terbukti</h3>
              <p className="text-slate-600">Kurikulum yang telah membantu 1,200+ alumni sukses</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                   style={{ backgroundColor: 'var(--accent)' }}>
                🤝
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>Komunitas Supportif</h3>
              <p className="text-slate-600">Bergabung dengan komunitas pembelajar yang saling mendukung</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Speak Up Partners</h3>
            <p className="text-slate-400">Membantu Anda berbicara dengan percaya diri sejak 2020.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kursus</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setCurrentPage('courses')} className="hover:text-white transition-colors">Public Speaking</button></li>
              <li><button onClick={() => setCurrentPage('courses')} className="hover:text-white transition-colors">Presentation Skills</button></li>
              <li><button onClick={() => setCurrentPage('courses')} className="hover:text-white transition-colors">Confidence Building</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">Tentang Kami</button></li>
              <li><button onClick={() => setCurrentPage('blog')} className="hover:text-white transition-colors">Blog</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-slate-400">
              <li>hello@speakuppartners.id</li>
              <li>+62 21 1234 5678</li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Speak Up Partners. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Stat Component
const Stat = ({ label, value }) => {
  return (
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
};

// Registration Form Modal Component
const RegistrationForm = ({ course, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    experience: '',
    goals: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert(`Terima kasih ${formData.fullName}! Pendaftaran Anda untuk kursus ${course?.title} berhasil. Tim kami akan menghubungi Anda dalam 1x24 jam.`);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-[var(--primary)]">Form Pendaftaran Kursus</h3>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-700 text-xl">✕</button>
          </div>
          
          {course && (
            <div className="mt-4 bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[var(--primary)]">{course.title}</h4>
              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-500 line-through">{course.price}</span>
                <span className="text-lg font-bold text-[var(--primary)]">
                  {course.discountedPrice || 'Rp 649.000'}
                </span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="email@contoh.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="08123456789"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tujuan Mengikuti Kursus</label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="Apa yang ingin Anda capai setelah mengikuti kursus ini?"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              💡 <strong>Promo Spesial:</strong> Dapatkan diskon 50% untuk pendaftaran hari ini!
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-lg font-bold text-white transition-all hover:shadow-lg text-lg"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Daftar Sekarang dengan Diskon 50%
          </button>
          
          <p className="text-xs text-slate-500 text-center">
            Dengan mendaftar, Anda menyetujui syarat dan ketentuan kami. Tim kami akan menghubungi Anda untuk konfirmasi.
          </p>
        </form>
      </div>
    </div>
  );
};

// Download Form Modal Component
const DownloadForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert(`Terima kasih ${formData.fullName}! Ebook preview "Public Speaking Basics" telah dikirim ke email ${formData.email}. Silakan cek inbox atau folder spam.`);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-[var(--primary)]">Download Ebook Preview</h3>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-700 text-xl">✕</button>
          </div>
          <p className="text-slate-600 mt-2">Isi data diri untuk mengunduh ebook preview gratis</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="email@contoh.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WhatsApp *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="08123456789"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              📚 <strong>Ebook Preview:</strong> Public Speaking Basics
              <br/>• 15 halaman materi premium
              <br/>• Teknik dasar public speaking
              <br/>• Tips mengatasi grogi
              <br/>• Contoh struktur presentasi
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-lg font-bold text-white transition-all hover:shadow-lg text-lg"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Download Ebook Preview Gratis
          </button>
          
          <p className="text-xs text-slate-500 text-center">
            Ebook akan dikirim ke email Anda dalam beberapa menit.
          </p>
        </form>
      </div>
    </div>
  );
};

export default App;