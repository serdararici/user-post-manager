import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Logo / Brand */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-white tracking-tight">UserPostManager</h1>
          <p className="mt-2 text-gray-400 text-sm">Building better web experiences.</p>
        </div>

        {/* Linkler */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-white">Company</h2>
            <a href="/" className="hover:text-white transition-colors">About Us</a>
            <a href="/" className="hover:text-white transition-colors">Careers</a>
            <a href="/" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-white">Resources</h2>
            <a href="/" className="hover:text-white transition-colors">Blog</a>
            <a href="/" className="hover:text-white transition-colors">Help Center</a>
            <a href="/" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>

        {/* Sosyal Medya */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="/" className="hover:text-white transition-colors"><FaFacebookF /></a>
          <a href="/" className="hover:text-white transition-colors"><FaTwitter /></a>
          <a href="/" className="hover:text-white transition-colors"><FaInstagram /></a>
          <a href="/" className="hover:text-white transition-colors"><FaLinkedinIn /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; 2025 UserPostManager. All rights reserved.
      </div>
    </footer>
  )
}
