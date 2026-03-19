import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  ChevronRight,
  Clock,
  Heart,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Smile,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useBookAppointment } from "./hooks/useQueries";

// ---- Fade-in hook ----
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ---- Tooth Icon for logo ----
function ToothIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M100 10 C60 10 20 40 20 80 C20 100 30 120 30 140 C30 170 40 210 60 210 C75 210 80 180 100 180 C120 180 125 210 140 210 C160 210 170 170 170 140 C170 120 180 100 180 80 C180 40 140 10 100 10 Z"
        fill="oklch(0.70 0.11 72)"
      />
    </svg>
  );
}

// ---- Nav links ----
const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "GALLERY", href: "#gallery" },
  { label: "TESTIMONIALS", href: "#testimonials" },
  { label: "CONTACT", href: "#contact" },
  { label: "BOOKING", href: "#booking" },
];

// ---- Services data ----
const SERVICES = [
  {
    icon: <Sparkles size={28} />,
    title: "Teeth Cleaning",
    description:
      "Professional scaling and polishing to remove plaque, tartar, and surface stains for optimal oral health.",
  },
  {
    icon: <Smile size={28} />,
    title: "Teeth Whitening",
    description:
      "Advanced laser whitening treatments that brighten your smile by up to 8 shades in a single session.",
  },
  {
    icon: <Zap size={28} />,
    title: "Dental Braces",
    description:
      "Modern orthodontic solutions including traditional braces and clear aligners for perfectly straight teeth.",
  },
  {
    icon: <Shield size={28} />,
    title: "Dental Implants",
    description:
      "Permanent, natural-looking tooth replacement solutions using titanium implants for a lifetime of confidence.",
  },
  {
    icon: <Heart size={28} />,
    title: "Root Canal",
    description:
      "Gentle, pain-free root canal therapy to save damaged teeth using the latest endodontic techniques.",
  },
  {
    icon: <Award size={28} />,
    title: "Cosmetic Dentistry",
    description:
      "Veneers, bonding, contouring, and smile makeovers designed to give you a picture-perfect smile.",
  },
];

// ---- Testimonials data ----
const TESTIMONIALS = [
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Marketing Executive",
    text: "Dr. Carter and the team at SmileCraft transformed my smile completely. The veneers look incredibly natural and I couldn't be happier. Truly world-class dental care!",
    rating: 5,
  },
  {
    id: "james-rodriguez",
    name: "James Rodriguez",
    role: "Software Engineer",
    text: "I was terrified of dentists until I visited SmileCraft. Their gentle approach and modern techniques made the whole experience surprisingly comfortable. My implants are perfect!",
    rating: 5,
  },
  {
    id: "emily-chen",
    name: "Emily Chen",
    role: "Teacher",
    text: "The whitening treatment was incredible — my teeth are 7 shades brighter! The staff are so professional and caring. I recommend SmileCraft to everyone I know.",
    rating: 5,
  },
  {
    id: "michael-thompson",
    name: "Michael Thompson",
    role: "Business Owner",
    text: "After years of putting off my dental issues, SmileCraft made everything so easy. Dr. Carter's expertise and the clinic's atmosphere made me feel completely at ease.",
    rating: 5,
  },
];

// ---- Gallery images ----
const GALLERY_IMAGES = [
  {
    id: "reception",
    src: "/assets/generated/clinic-reception.dim_800x500.jpg",
    alt: "Modern clinic reception",
  },
  {
    id: "treatment",
    src: "/assets/generated/dentist-treatment.dim_800x500.jpg",
    alt: "Dental treatment in progress",
  },
  {
    id: "smile",
    src: "/assets/generated/perfect-smile.dim_800x500.jpg",
    alt: "Perfect smile result",
  },
  {
    id: "room",
    src: "/assets/generated/clinic-treatment-room.dim_800x500.jpg",
    alt: "Treatment room",
  },
  {
    id: "tools",
    src: "/assets/generated/dental-tools.dim_800x500.jpg",
    alt: "Precision dental tools",
  },
  {
    id: "portrait",
    src: "/assets/generated/dentist-portrait.dim_600x700.jpg",
    alt: "Dr. James Carter",
  },
];

const SERVICES_LIST = [
  "Teeth Cleaning",
  "Teeth Whitening",
  "Dental Braces",
  "Dental Implants",
  "Root Canal",
  "Cosmetic Dentistry",
  "Emergency Dental Care",
  "Pediatric Dentistry",
];

const CREDENTIALS = [
  "Fellow, American College of Dentists",
  "Harvard School of Dental Medicine Graduate",
  "Certified Invisalign® Diamond Provider",
];

const CONTACT_ITEMS = [
  {
    id: "address",
    icon: <MapPin size={16} />,
    text: "123 Dental Avenue, Beverly Hills, CA 90210",
  },
  { id: "phone", icon: <Phone size={16} />, text: "+1 (555) 123-4567" },
  { id: "email", icon: <Mail size={16} />, text: "info@smilecraftdental.com" },
  {
    id: "hours",
    icon: <Clock size={16} />,
    text: "Mon–Sat: 8:00 AM – 7:00 PM",
  },
];

const FOOTER_CONTACT = [
  {
    id: "address",
    icon: <MapPin size={14} />,
    text: "123 Dental Avenue,\nBeverly Hills, CA 90210",
  },
  { id: "phone", icon: <Phone size={14} />, text: "+1 (555) 123-4567" },
  {
    id: "email",
    icon: <Mail size={14} />,
    text: "info@smilecraftdental.com",
  },
  { id: "hours", icon: <Clock size={14} />, text: "Mon–Sat: 8 AM – 7 PM" },
];

const STATS = [
  { num: "5,000+", label: "Happy Patients" },
  { num: "20+", label: "Years Experience" },
  { num: "15+", label: "Expert Doctors" },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

// ---- Header ----
function Header({ activeSection }: { activeSection: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavClick("#home")}
          data-ocid="nav.link"
        >
          <ToothIcon size={32} />
          <div className="flex items-baseline gap-1">
            <span className="text-gold font-black text-xl tracking-widest">
              SMILECRAFT
            </span>
            <span className="text-white/80 font-light text-xs tracking-widest">
              DENTAL CLINIC
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold tracking-widest transition-colors duration-200 cursor-pointer ${
                activeSection === link.href.slice(1)
                  ? "text-gold"
                  : "text-white/70 hover:text-gold"
              }`}
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => handleNavClick("#booking")}
            className="bg-gold text-navy font-bold text-xs tracking-widest px-5 py-2 rounded-full hover:bg-gold-light transition-colors duration-200 shadow-gold"
            data-ocid="nav.primary_button"
          >
            BOOK APPOINTMENT
          </button>
        </div>

        {/* Mobile menu btn */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy border-t border-gold/20"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold tracking-widest text-white/80 hover:text-gold transition-colors"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => handleNavClick("#booking")}
                className="bg-gold text-navy font-bold text-xs tracking-widest px-5 py-2 rounded-full w-fit"
                data-ocid="nav.primary_button"
              >
                BOOK APPOINTMENT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---- Hero Section ----
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-navy overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-[oklch(0.18_0.030_250)] pointer-events-none" />

      {/* Tooth watermark */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 220"
          fill="none"
          aria-hidden="true"
          className="w-[600px] h-[600px]"
        >
          <path
            d="M100 10 C60 10 20 40 20 80 C20 100 30 120 30 140 C30 170 40 210 60 210 C75 210 80 180 100 180 C120 180 125 210 140 210 C160 210 170 170 170 140 C170 120 180 100 180 80 C180 40 140 10 100 10 Z"
            stroke="white"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Image collage */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-[480px]">
            {/* Main portrait */}
            <div className="rounded-2xl overflow-hidden border-2 border-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <img
                src="/assets/generated/dentist-portrait.dim_600x700.jpg"
                alt="Dr. James Carter"
                className="w-full h-[420px] object-cover"
              />
            </div>
            {/* Overlapping smile image */}
            <div className="absolute -bottom-6 -right-6 w-48 h-36 rounded-xl overflow-hidden border-2 border-gold shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
              <img
                src="/assets/generated/perfect-smile.dim_800x500.jpg"
                alt="Perfect smile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute -left-4 top-8 bg-gold text-navy px-4 py-2 rounded-lg shadow-gold">
              <div className="text-xs font-black tracking-widest">
                20+ YEARS
              </div>
              <div className="text-[10px] font-semibold">OF EXCELLENCE</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Headline */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.2em]">
              WELCOME TO SMILECRAFT
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight text-white">
            PREMIUM
            <br />
            <span className="text-gold">DENTAL CARE.</span>
            <br />
            RADIANT
            <br />
            SMILES.
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-md">
            Experience world-class dentistry with a gentle touch. At SmileCraft
            Dental Clinic, we combine cutting-edge technology with compassionate
            care to give you the smile you’ve always deserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollTo("#booking")}
              className="bg-gold text-navy font-bold text-sm tracking-widest px-8 py-3 rounded-full hover:bg-gold-light transition-all duration-200 shadow-gold hover:shadow-gold-lg"
              data-ocid="hero.primary_button"
            >
              BOOK ONLINE
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#services")}
              className="border border-gold/50 text-gold font-semibold text-sm tracking-widest px-8 py-3 rounded-full hover:bg-gold/10 transition-all duration-200"
              data-ocid="hero.secondary_button"
            >
              OUR SERVICES
            </button>
          </div>
          {/* Stats */}
          <div className="flex gap-8 mt-4 pt-6 border-t border-white/10">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-gold font-black text-xl">{stat.num}</div>
                <div className="text-white/50 text-xs tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---- About Section ----
function AboutSection() {
  const ref = useFadeIn();
  return (
    <section id="about" className="py-24 bg-navy-light">
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          ref={ref}
          className="fade-in grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.2em]">
                ABOUT US
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
              ABOUT
              <br />
              <span className="text-gold">DR. JAMES CARTER</span>
            </h2>
            <p className="text-white/60 leading-relaxed">
              Dr. James Carter is a board-certified prosthodontist with over 20
              years of experience transforming smiles. A graduate of Harvard
              School of Dental Medicine, he has dedicated his career to
              combining artistry with advanced dental science.
            </p>
            <p className="text-white/60 leading-relaxed">
              SmileCraft Dental Clinic is equipped with the latest 3D imaging,
              laser dentistry, and digital smile design technology. Our team of
              10 specialist dentists provides comprehensive care in a warm,
              welcoming environment.
            </p>
            <div className="flex flex-col gap-3">
              {CREDENTIALS.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <ChevronRight size={16} className="text-gold flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="w-fit border border-gold text-gold font-bold text-xs tracking-widest px-8 py-3 rounded-full hover:bg-gold hover:text-navy transition-all duration-200"
              data-ocid="about.secondary_button"
            >
              MEET OUR TEAM
            </button>
          </div>

          {/* Right: two image cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-gold/20 shadow-card">
              <img
                src="/assets/generated/clinic-reception.dim_800x500.jpg"
                alt="SmileCraft clinic reception"
                className="w-full h-56 object-cover"
              />
              <div className="bg-navy-card p-3">
                <p className="text-gold text-xs font-semibold tracking-wider">
                  Modern Clinic
                </p>
                <p className="text-white/50 text-xs mt-1">
                  State-of-the-art facility
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-gold/20 shadow-card mt-8">
              <img
                src="/assets/generated/clinic-treatment-room.dim_800x500.jpg"
                alt="Treatment room"
                className="w-full h-56 object-cover"
              />
              <div className="bg-navy-card p-3">
                <p className="text-gold text-xs font-semibold tracking-wider">
                  Treatment Rooms
                </p>
                <p className="text-white/50 text-xs mt-1">Advanced equipment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Services Section ----
function ServicesSection() {
  const ref = useFadeIn();
  return (
    <section id="services" className="py-24 bg-navy">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.2em]">
              WHAT WE OFFER
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
            OUR <span className="text-gold">SERVICES</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto">
            Comprehensive dental solutions delivered with precision, care, and
            the latest technology.
          </p>
        </div>
        <div
          ref={ref}
          className="fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-navy-card border border-gold/20 rounded-xl p-6 gold-top-border hover:border-gold/50 hover:shadow-gold transition-all duration-300 group"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-200 w-fit">
                {service.icon}
              </div>
              <h3 className="text-white font-bold text-base tracking-wide mb-2">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Gallery Section ----
function GallerySection() {
  const ref = useFadeIn();
  return (
    <section id="gallery" className="py-24 bg-navy-light">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.2em]">
              INSIDE SMILECRAFT
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
            PHOTO <span className="text-gold">GALLERY</span>
          </h2>
        </div>
        <div
          ref={ref}
          className="fade-in grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`overflow-hidden rounded-xl border border-gold/20 hover:border-gold/50 transition-all duration-300 group ${
                i === 0 ? "md:row-span-2" : ""
              }`}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                  i === 0 ? "h-64 md:h-full" : "h-44"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Testimonials Section ----
function TestimonialsSection() {
  const ref = useFadeIn();
  return (
    <section id="testimonials" className="py-24 bg-navy">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.2em]">
              PATIENT STORIES
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
            WHAT OUR PATIENTS <span className="text-gold">SAY</span>
          </h2>
        </div>
        <div
          ref={ref}
          className="fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-navy-card border border-gold/20 rounded-xl p-6 flex flex-col gap-4 hover:border-gold/40 hover:shadow-gold transition-all duration-300"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              {/* Gold quote mark */}
              <span className="text-gold text-5xl font-black leading-none opacity-40 -mt-2">
                &ldquo;
              </span>
              {/* Stars */}
              <div className="flex gap-1 -mt-4">
                {[1, 2, 3, 4, 5].slice(0, t.rating).map((star) => (
                  <Star key={star} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed flex-1">
                {t.text}
              </p>
              <div className="border-t border-white/10 pt-3">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gold text-xs tracking-wider mt-0.5">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Booking Form ----
function BookingSection() {
  const {
    mutate: bookAppointment,
    isPending,
    isSuccess,
  } = useBookAppointment();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    preferredDate: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.serviceType ||
      !form.preferredDate
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    bookAppointment(form, {
      onSuccess: () => {
        toast.success("Appointment booked! We’ll confirm within 24 hours.");
        setForm({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          preferredDate: "",
          message: "",
        });
      },
      onError: () => {
        toast.error("Booking failed. Please try again or call us directly.");
      },
    });
  };

  const ref = useFadeIn();

  return (
    <section id="booking" className="py-24 bg-navy-light">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact card */}
          <div ref={ref} className="fade-in flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.2em]">
                GET IN TOUCH
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
              BOOK AN
              <br />
              <span className="text-gold">APPOINTMENT</span>
            </h2>
            <p className="text-white/60 leading-relaxed">
              Ready to transform your smile? Schedule your consultation with Dr.
              Carter today. We offer flexible hours including evenings and
              weekends.
            </p>

            {/* Contact info */}
            <div
              id="contact"
              className="bg-navy-card border border-gold/20 rounded-xl p-6 flex flex-col gap-4"
            >
              <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-2">
                Contact Information
              </h3>
              {CONTACT_ITEMS.map(({ id, icon, text }) => (
                <div key={id} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5 flex-shrink-0">{icon}</span>
                  <span className="text-white/60 text-sm">{text}</span>
                </div>
              ))}

              {/* WhatsApp */}
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-3 bg-whatsapp text-white font-bold text-sm tracking-widest py-3 rounded-xl hover:opacity-90 transition-opacity duration-200 shadow-[0_4px_20px_oklch(0.72_0.19_145_/_0.3)]"
                data-ocid="contact.primary_button"
              >
                <MessageCircle size={20} />
                CHAT ON WHATSAPP
              </a>
            </div>
          </div>

          {/* Booking form */}
          <div className="bg-navy-card border border-gold/20 rounded-2xl p-8 shadow-card">
            <h3 className="text-white font-black text-lg tracking-widest uppercase mb-6">
              Request Appointment
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label className="text-white/70 text-xs tracking-widest uppercase mb-1.5 block">
                  Full Name *
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Dr. John Smith"
                  className="bg-navy border-gold/20 text-white placeholder:text-white/30 focus:border-gold"
                  data-ocid="booking.input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/70 text-xs tracking-widest uppercase mb-1.5 block">
                    Email *
                  </Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="john@email.com"
                    className="bg-navy border-gold/20 text-white placeholder:text-white/30 focus:border-gold"
                    data-ocid="booking.input"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-xs tracking-widest uppercase mb-1.5 block">
                    Phone *
                  </Label>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+1 (555) 000-0000"
                    className="bg-navy border-gold/20 text-white placeholder:text-white/30 focus:border-gold"
                    data-ocid="booking.input"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white/70 text-xs tracking-widest uppercase mb-1.5 block">
                  Service *
                </Label>
                <Select
                  value={form.serviceType}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, serviceType: v }))
                  }
                >
                  <SelectTrigger
                    className="bg-navy border-gold/20 text-white focus:border-gold"
                    data-ocid="booking.select"
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-card border-gold/20">
                    {SERVICES_LIST.map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="text-white hover:text-gold focus:text-gold focus:bg-gold/10"
                      >
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white/70 text-xs tracking-widest uppercase mb-1.5 block">
                  Preferred Date *
                </Label>
                <Input
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, preferredDate: e.target.value }))
                  }
                  className="bg-navy border-gold/20 text-white focus:border-gold [color-scheme:dark]"
                  data-ocid="booking.input"
                />
              </div>
              <div>
                <Label className="text-white/70 text-xs tracking-widest uppercase mb-1.5 block">
                  Message
                </Label>
                <Textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Any additional information about your visit..."
                  rows={3}
                  className="bg-navy border-gold/20 text-white placeholder:text-white/30 focus:border-gold resize-none"
                  data-ocid="booking.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={isPending || isSuccess}
                className="mt-2 bg-gold text-navy font-black text-xs tracking-widest py-3 rounded-full hover:bg-gold-light transition-all duration-200 shadow-gold hover:shadow-gold-lg h-auto"
                data-ocid="booking.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                    BOOKING...
                  </>
                ) : isSuccess ? (
                  "✓ APPOINTMENT BOOKED!"
                ) : (
                  "BOOK APPOINTMENT"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-[oklch(0.10_0.025_245)] border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <ToothIcon size={28} />
              <div>
                <div className="text-gold font-black text-base tracking-widest">
                  SMILECRAFT
                </div>
                <div className="text-white/50 text-[10px] tracking-widest">
                  DENTAL CLINIC
                </div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Premium dental care for the whole family. Your smile, our mission.
            </p>
            <div className="flex gap-3">
              {["FB", "IG", "TW"].map((s) => (
                <div
                  key={s}
                  className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold text-xs font-bold hover:bg-gold hover:text-navy transition-all duration-200 cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/40 text-sm hover:text-gold transition-colors tracking-wider"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {SERVICES_LIST.slice(0, 6).map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-white/40 text-sm hover:text-gold transition-colors tracking-wider"
                    data-ocid="footer.link"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_CONTACT.map(({ id, icon, text }) => (
                <li key={id} className="flex items-start gap-2">
                  <span className="text-gold mt-0.5 flex-shrink-0">{icon}</span>
                  <span className="text-white/40 text-sm whitespace-pre-line">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs tracking-wider">
            © {year} SmileCraft Dental Clinic. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 text-xs tracking-wider hover:text-gold transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ---- Main App ----
export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "services",
      "gallery",
      "testimonials",
      "booking",
      "contact",
    ];
    const observers: IntersectionObserver[] = [];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy font-montserrat">
      <Toaster position="top-right" />
      <Header activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
