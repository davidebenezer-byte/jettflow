import { Link } from "@tanstack/react-router";
import { Phone, Mail, Linkedin, Instagram, Facebook, Youtube, MapPin } from "lucide-react";
import logo from "@/assets/jetflo-logo.png";

export function Footer() {
  const handleCalendlyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("https://calendly.com/vivek-venugopal-claroenergy/30min", "_blank");
  };

  return (
    <footer className="mt-24 bg-[#0a1120] text-slate-200 border-t border-slate-800 pt-16 pb-12">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr]">
          {/* Column 1: Brand & Contact */}
          <div>
            <div className="mb-6">
              <img src={logo} alt="JetFlo by Claro Energy" className="h-10 w-auto invert" />
            </div>
            
            <div className="space-y-3.5 text-[12.5px] text-slate-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="size-4 shrink-0 text-slate-500 mt-0.5" />
                <span>
                  <strong className="text-slate-300">Hyderabad Hub:</strong> Awfis Ohris Tech Park, Ground, 1st and 2nd floor, Plot no 13, Survey 64/2, Madhapur, HITEC City, Hyderabad, Telangana 500081
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-slate-500" />
                <a href="tel:+919310191135" className="hover:text-white transition-colors">+91 9310191135</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-slate-500" />
                <a href="mailto:info@claroenergy.in" className="hover:text-white transition-colors">info@claroenergy.in</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-slate-500" />
                <a href="mailto:sales@claroenergy.in" className="hover:text-white transition-colors">sales@claroenergy.in</a>
              </p>
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div>
            <h3 className="font-display text-[14px] font-bold text-slate-400 uppercase tracking-wider mb-6">Sitemap</h3>
            <ul className="space-y-3 text-[13px] text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Actions */}
          <div>
            <h3 className="font-display text-[14px] font-bold text-slate-400 uppercase tracking-wider mb-6">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://calendly.com/vivek-venugopal-claroenergy/30min"
                onClick={handleCalendlyClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 font-display text-[12.5px] font-bold text-slate-300 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-600 text-center"
              >
                <Phone className="size-3.5" /> Call Us
              </a>
              <a
                href="https://calendly.com/vivek-venugopal-claroenergy/30min"
                onClick={handleCalendlyClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 font-display text-[12.5px] font-bold text-slate-300 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-600 text-center"
              >
                <Mail className="size-3.5" /> Request a Quote
              </a>
            </div>
          </div>

          {/* Column 4: Connect With Us */}
          <div>
            <h3 className="font-display text-[14px] font-bold text-slate-400 uppercase tracking-wider mb-6">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/claro-energy-limited"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid size-9 place-items-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-700"
              >
                <Linkedin className="size-4.5" />
              </a>
              <a
                href="https://www.instagram.com/claroenergy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-9 place-items-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-700"
              >
                <Instagram className="size-4.5" />
              </a>
              <a
                href="https://www.facebook.com/claroenergy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid size-9 place-items-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-700"
              >
                <Facebook className="size-4.5" />
              </a>
              <a
                href="https://www.youtube.com/user/claroenergy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="grid size-9 place-items-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-700"
              >
                <Youtube className="size-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-500">
          <p>© 2026 JetFlo Solar. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://claroenergy.in/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="https://claroenergy.in/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="https://claroenergy.in/app-privacy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">App Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
