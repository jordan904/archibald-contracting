/**
 * Sylvan Mini Home Sales - Home Page
 * Authorized Ironwood Dealer in Antigonish & Cape Breton
 */

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Shield,
  Wrench,
  TreePine,
  Users,
  Truck,
  Star,
  ArrowRight,
  Menu,
  X,
  HardHat,
  Hammer,
  CheckCircle,
} from "lucide-react";

/* --- Image URLs (Ironwood Homes) --- */
const HERO_IMG = "/Vista.webp";
const LOGO_IMG = "/logo.png";
const CRAFTSMAN_IMG =
  "https://images.squarespace-cdn.com/content/v1/65cbc20fd27c8c72d7692fa0/6d9ab074-aef7-4814-a8ea-b946de4c5f79/Craftsman+1.JPG";
const PORCH_IMG =
  "https://images.squarespace-cdn.com/content/v1/65cbc20fd27c8c72d7692fa0/d17bb33d-5d0f-49c6-927c-83acb081b262/IW2312+Front+Porch.jpg";
const VISTA_IMG =
  "https://images.squarespace-cdn.com/content/v1/65cbc20fd27c8c72d7692fa0/9ddc2fd8-4c3f-45d3-a455-ac5b0ee42d97/Vista+Front+Elevation+2.JPG";
const KITCHEN_IMG =
  "https://images.squarespace-cdn.com/content/v1/65cbc20fd27c8c72d7692fa0/7fcc9b3d-09be-4da5-b9b5-888c919551a6/IW2312+Kitchen+1.jpeg";
const LIVING_IMG =
  "https://images.squarespace-cdn.com/content/v1/65cbc20fd27c8c72d7692fa0/5c67797c-c45d-4278-8f84-e89b41256137/IW2235+Living+Area.jpg";
const VANITY_IMG =
  "https://images.squarespace-cdn.com/content/v1/65cbc20fd27c8c72d7692fa0/2c11a19e-5420-46c7-99cb-0104b1f11e40/Ensuite+Vanity.jpg";
const IRONWOOD_BRAND_IMG =
  "https://images.squarespace-cdn.com/content/v1/65cbc20fd27c8c72d7692fa0/401192e3-8946-41be-8c08-599530f6dae6/Ironwood.jpg";
const HERON_IMG =
  "https://images.squarespace-cdn.com/content/v1/65cbc20fd27c8c72d7692fa0/a8a0ed1f-79e4-4364-a9eb-469967b209d3/Heron_Black+Trim+-+Front+View.jpg";
const CARLETON_IMG =
  "https://images.squarespace-cdn.com/content/v1/65cbc20fd27c8c72d7692fa0/c3868b5c-29ba-4084-84c6-a478efbad63e/Carleton+Front+%28Dark+Green_Beige+Trim%29.jpg";
const KITCHEN2_IMG = "/newkitchen.jpg";
const HUSTON_LIVING_IMG =
  "https://images.squarespace-cdn.com/content/v1/65cbc20fd27c8c72d7692fa0/51365321-76d6-4228-b42e-51680478521f/IW2030+Huston+Great+Room.jpg";

/* ===================================================================
   HOOKS
   =================================================================== */

function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return { count, ref };
}

function useTilt(intensity = 8) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

/* ===================================================================
   ANIMATION WRAPPERS
   =================================================================== */

const springTransition = { type: "spring" as const, stiffness: 100, damping: 20 };

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...springTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({
  children,
  from = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === "left" ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...springTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===================================================================
   CARD COMPONENTS
   =================================================================== */

function WhyCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  index: number;
}) {
  const tilt = useTilt(6);

  return (
    <FadeUp delay={index * 0.08}>
      <motion.div
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformPerspective: 800,
          transformStyle: "preserve-3d",
        }}
        className="group relative p-8 bg-gradient-to-br from-white to-brand-cream border border-brand-sandstone/60 overflow-hidden
                   shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)]
                   transition-shadow duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <span
          className="absolute top-4 right-4 font-[family-name:var(--font-mono)] text-xs text-brand-forest/30 tracking-wider"
          style={{ transform: "translateZ(20px)" }}
        >
          0{index + 1}
        </span>

        <div
          className="w-14 h-14 bg-gradient-to-br from-brand-forest to-brand-forest-light flex items-center justify-center mb-6
                     shadow-[0_8px_24px_-4px_rgba(30,80,60,0.35)] group-hover:shadow-[0_12px_32px_-4px_rgba(30,80,60,0.5)]
                     transition-all duration-500 group-hover:scale-110"
          style={{ transform: "translateZ(30px)" }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3
          className="font-[family-name:var(--font-display)] text-xl text-brand-charcoal mb-3"
          style={{ transform: "translateZ(15px)" }}
        >
          {title}
        </h3>
        <p
          className="text-muted-foreground leading-relaxed text-[15px]"
          style={{ transform: "translateZ(10px)" }}
        >
          {desc}
        </p>

        <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-brand-forest to-brand-forest-light group-hover:w-full transition-all duration-700 shadow-[0_0_12px_rgba(30,80,60,0.4)]" />
      </motion.div>
    </FadeUp>
  );
}

function GalleryCard({
  src,
  alt,
  label,
  index,
}: {
  src: string;
  alt: string;
  label: string;
  index: number;
}) {
  const tilt = useTilt(4);

  return (
    <FadeUp delay={index * 0.12}>
      <motion.div
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformPerspective: 1000,
        }}
        className="group relative overflow-hidden aspect-[4/3]
                   shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)]
                   transition-shadow duration-500"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <span className="font-[family-name:var(--font-mono)] text-xs text-white tracking-widest uppercase">
              {label}
            </span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      </motion.div>
    </FadeUp>
  );
}

/* ===================================================================
   DATA
   =================================================================== */

const whyChooseUs = [
  {
    icon: Shield,
    title: "Authorized Ironwood Dealer",
    desc: "We proudly represent Ironwood Homes, known for superior build quality, modern designs, energy-efficient construction, and customization options to suit your lifestyle.",
  },
  {
    icon: MapPin,
    title: "Local Knowledge & Connections",
    desc: "Based in Antigonish, NS, with strong ties across Antigonish County, Guysborough County, and Cape Breton Island. We understand local regulations, land considerations, and community needs.",
  },
  {
    icon: Wrench,
    title: "Turnkey Solutions",
    desc: "More than just the home itself. Our services include site preparation coordination, delivery and setup, skirting, decks, finishing, utility hookups, and final walkthrough support.",
  },
  {
    icon: TreePine,
    title: "Built for Nova Scotia",
    desc: "Our mini and modular homes are designed for comfort and efficiency, modern aesthetics, long-term durability, and affordable ownership in Nova Scotia's climate.",
  },
];

const gallery = [
  { src: CRAFTSMAN_IMG, alt: "Craftsman style modular home exterior", label: "Craftsman" },
  { src: KITCHEN_IMG, alt: "Modern kitchen interior in modular home", label: "Kitchen" },
  { src: PORCH_IMG, alt: "Front porch detail on modular home", label: "Front Porch" },
  { src: LIVING_IMG, alt: "Open concept living area in modular home", label: "Living Area" },
  { src: VISTA_IMG, alt: "Vista model modular home exterior", label: "Vista" },
  { src: VANITY_IMG, alt: "Ensuite bathroom vanity in modular home", label: "Ensuite" },
  { src: CARLETON_IMG, alt: "Carleton chalet model with green siding", label: "Carleton Chalet" },
  { src: HUSTON_LIVING_IMG, alt: "Huston model great room with vaulted ceiling", label: "Great Room" },
];

const whoWeServe = [
  "First-time homebuyers",
  "Downsizers seeking a simpler lifestyle",
  "Rental and workforce housing investors",
  "Developers and community partners",
  "Employers seeking workforce housing",
];

const navLinks = [
  { href: "#homes", label: "Our Homes" },
  { href: "#why-us", label: "Why Us" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/* ===================================================================
   MAIN COMPONENT
   =================================================================== */

export default function SylvanHomes() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Intercept anchor links so they scroll instead of conflicting with hash router */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[href^='#']");
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(hash.substring(1));
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        target.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* --- NAVIGATION --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-brand-dark/80 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] border-b border-white/5"
            : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src={LOGO_IMG}
              alt="Sylvan Mini Home Sales logo"
              width="44"
              height="44"
              className="w-11 h-11 rounded-full bg-white p-0.5 shadow-[0_4px_16px_-2px_rgba(30,80,60,0.4)] group-hover:shadow-[0_8px_24px_-2px_rgba(30,80,60,0.6)] transition-shadow duration-300"
            />
            <div className="leading-tight">
              <span className="font-[family-name:var(--font-display)] text-white text-lg tracking-tight">
                Sylvan
              </span>
              <span className="hidden sm:block text-[11px] text-white/50 font-[family-name:var(--font-mono)] tracking-wider uppercase">
                Mini Home Sales
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm text-white/70 hover:text-white transition-colors font-medium tracking-wide uppercase group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-forest group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(30,80,60,0.4)]" />
              </a>
            ))}
            <a
              href="/archibald-contracting/#/contracting"
              className="relative text-sm text-brand-orange/80 hover:text-brand-orange transition-colors font-medium tracking-wide uppercase group flex items-center gap-1"
            >
              Contracting
              <ArrowRight className="w-3.5 h-3.5" />
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-orange group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="tel:9023381277"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-brand-forest to-brand-forest-light text-white text-sm font-semibold tracking-wide uppercase
                         shadow-[0_4px_20px_-4px_rgba(30,80,60,0.5)] hover:shadow-[0_8px_30px_-4px_rgba(30,80,60,0.7)]
                         hover:-translate-y-0.5 transition-all duration-300"
            >
              (902) 338-1277
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-brand-dark/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <nav className="container py-6 flex flex-col gap-4">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-white/80 hover:text-brand-forest transition-colors font-medium tracking-wide uppercase text-sm"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/archibald-contracting/#/contracting"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="text-brand-orange/80 hover:text-brand-orange transition-colors font-medium tracking-wide uppercase text-sm flex items-center gap-1"
                >
                  Archibald Contracting <ArrowRight className="w-3.5 h-3.5" />
                </motion.a>
                <a
                  href="tel:9023381277"
                  className="mt-2 px-5 py-3 bg-gradient-to-r from-brand-forest to-brand-forest-light text-white text-sm font-semibold tracking-wide uppercase text-center shadow-lg"
                >
                  Call (902) 338-1277
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO --- */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-end pb-16 lg:pb-24 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img
            src={HERO_IMG}
            alt="Vista model modular home exterior by Ironwood Homes"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 to-transparent" />

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        <motion.div className="container relative z-10" style={{ opacity: heroOpacity }}>
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                className="w-12 h-[2px] bg-brand-forest"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ originX: 0 }}
              />
              <span className="text-brand-forest-light font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase">
                Antigonish & Cape Breton, Nova Scotia
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-6"
            >
              <span className="inline-block">Your Trusted</span>
              <br />
              <motion.span
                className="inline-block text-brand-forest-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ textShadow: "0 4px 30px rgba(30,80,60,0.3)" }}
              >
                Ironwood Dealer
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-white/70 text-lg lg:text-xl max-w-xl mb-10 leading-relaxed"
            >
              High-quality, affordable mini and modular homes for individuals,
              families, and investors across Antigonish, Guysborough County,
              and all of Cape Breton.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="tel:9023381277"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-gradient-to-r from-brand-forest to-brand-forest-light text-white font-semibold tracking-wide uppercase text-sm
                           shadow-[0_8px_30px_-4px_rgba(30,80,60,0.5)] hover:shadow-[0_16px_50px_-4px_rgba(30,80,60,0.7)]
                           hover:-translate-y-1 transition-all duration-300"
              >
                <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Start Your Home Journey
              </a>
              <a
                href="#homes"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           border-2 border-white/20 text-white font-semibold tracking-wide uppercase text-sm
                           backdrop-blur-sm bg-white/5
                           hover:bg-white/10 hover:border-white/40 hover:-translate-y-1
                           transition-all duration-300"
              >
                Explore Homes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-8 h-12 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-brand-forest rounded-full shadow-[0_0_8px_rgba(30,80,60,0.6)]"
            />
          </div>
        </motion.div>
      </section>

      {/* --- STATS BAR --- */}
      <section
        className="relative bg-brand-dark py-10 lg:py-14"
        style={{ clipPath: "polygon(0 0, 100% 4%, 100% 100%, 0 96%)", marginTop: "-3rem", paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { end: 3, suffix: " Counties", label: "Service Area" },
              { end: 100, suffix: "%", label: "Turnkey Service" },
              { end: 4, suffix: " Styles", label: "Home Categories" },
              { end: 1, suffix: " Partner", label: "Ironwood Homes", prefix: "#" },
            ].map((stat, i) => {
              const counter = useCounter(stat.end, 1800);
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm
                                  shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_-4px_rgba(30,80,60,0.15)]
                                  hover:-translate-y-1 transition-all duration-500">
                    <span
                      ref={counter.ref}
                      className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl text-brand-forest-light"
                      style={{ textShadow: "0 2px 20px rgba(30,80,60,0.3)" }}
                    >
                      {stat.prefix ?? ""}
                      {counter.count}
                      {stat.suffix}
                    </span>
                    <p className="text-white/50 text-sm mt-2 font-[family-name:var(--font-mono)] tracking-wider uppercase">
                      {stat.label}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us" className="py-20 lg:py-32 dot-grid relative" style={{ marginTop: "-2rem", paddingTop: "5rem" }}>
        <div className="container">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-8 h-[2px] bg-brand-forest"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ originX: 0 }}
              />
              <span className="text-brand-forest font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
                Why Choose Us
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-brand-charcoal mb-4">
              Quality Homes. Local Expertise.
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg mb-16">
              We understand that buying a home is one of the most important
              decisions you'll make. That's why we offer more than just homes -
              we provide guidance, transparency, and full-service support from
              start to finish.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1200px" }}>
            {whyChooseUs.map((item, i) => (
              <WhyCard key={i} icon={item.icon} title={item.title} desc={item.desc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --- OUR HOMES GALLERY --- */}
      <section
        id="homes"
        className="py-20 lg:py-32 bg-brand-dark relative"
        style={{ clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <div className="container">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-8 h-[2px] bg-brand-forest-light"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ originX: 0 }}
              />
              <span className="text-brand-forest-light font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
                Our Homes
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-white mb-4">
              Ironwood Modular Homes
            </h2>
            <p className="text-white/50 max-w-2xl text-lg mb-16">
              Modern, energy-efficient mini and modular homes combining
              craftsmanship, durability, and thoughtful design. Explore some of
              the homes and features available through Ironwood.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1200px" }}>
            {gallery.map((img, i) => (
              <GalleryCard key={i} src={img.src} alt={img.alt} label={img.label} index={i} />
            ))}
          </div>

          <FadeUp delay={0.4}>
            <div className="mt-12 text-center">
              <a
                href="https://www.ironwoodhomesinc.ca/our-homes"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           border-2 border-brand-forest-light/40 text-white font-semibold tracking-wide uppercase text-sm
                           backdrop-blur-sm bg-white/5
                           hover:bg-brand-forest/20 hover:border-brand-forest-light/70 hover:-translate-y-1
                           transition-all duration-300"
              >
                View All Ironwood Models
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-20 lg:py-32 relative" style={{ marginTop: "-2rem", paddingTop: "5rem" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn from="left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-8 h-[2px] bg-brand-forest"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                  <span className="text-brand-forest font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
                    Full-Service
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-brand-charcoal mb-6">
                  Seamless Experience.
                  <br />
                  Start to Finish.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We offer more than just the home itself. Our turnkey solutions
                  cover everything you need to go from dream to move-in ready.
                </p>

                <div className="space-y-4">
                  {[
                    "Site preparation coordination",
                    "Delivery and setup",
                    "Skirting, decks, and finishing",
                    "Utility hookups (plumbing, electrical, heat pumps)",
                    "Final walkthrough and support",
                  ].map((service, i) => (
                    <FadeUp key={i} delay={i * 0.08}>
                      <div className="flex items-start gap-3 p-3 bg-brand-sandstone/50 border border-brand-sandstone/80 hover:border-brand-forest/30 transition-colors duration-300">
                        <CheckCircle className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
                        <span className="text-brand-charcoal font-medium">{service}</span>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.2}>
              <div className="relative">
                <img
                  src={KITCHEN2_IMG}
                  alt="Modern kitchen with white shaker cabinets, stainless appliances, and quartz island in a new mini home"
                  className="w-full aspect-[4/3] object-cover shadow-[0_16px_60px_-12px_rgba(0,0,0,0.25)]"
                />
                <div className="absolute -inset-3 border-2 border-brand-forest/20 -z-10" />
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* --- ABOUT / WHO WE SERVE --- */}
      <section id="about" className="py-20 lg:py-32 bg-brand-sandstone/50 dot-grid relative">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn from="left">
              <div className="relative">
                <img
                  src={IRONWOOD_BRAND_IMG}
                  alt="Ironwood modular home construction"
                  className="w-full aspect-[4/3] object-cover shadow-[0_16px_60px_-12px_rgba(0,0,0,0.25)]"
                />
                <div className="absolute -inset-3 border-2 border-brand-forest/20 -z-10" />

                <motion.a
                  href="https://www.ironwoodhomesinc.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...springTransition, delay: 0.4 }}
                  className="absolute -bottom-6 -right-4 lg:-right-8 bg-gradient-to-br from-brand-forest to-brand-forest-light p-6
                             shadow-[0_16px_40px_-8px_rgba(30,80,60,0.5)] hover:shadow-[0_20px_50px_-8px_rgba(30,80,60,0.6)]
                             hover:-translate-y-1 transition-all duration-300 block"
                >
                  <span className="font-[family-name:var(--font-display)] text-xl text-white block">
                    Ironwood
                  </span>
                  <span className="text-white/80 text-sm font-[family-name:var(--font-mono)] tracking-wider uppercase">
                    Authorized Dealer
                  </span>
                </motion.a>
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.2}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-8 h-[2px] bg-brand-forest"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                  <span className="text-brand-forest font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
                    About Sylvan
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-brand-charcoal mb-6">
                  Quality Homes.
                  <br />
                  Trusted Service.
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    At Sylvan Mini Home Sales, we specialize in helping
                    individuals, families, and investors find high-quality,
                    affordable housing solutions across Antigonish, Guysborough
                    County, and all of Cape Breton.
                  </p>
                  <p>
                    As an authorized dealer for Ironwood Modular Solutions, we
                    bring modern, energy-efficient mini and modular homes to
                    communities throughout Nova Scotia - combining craftsmanship,
                    durability, and thoughtful design to meet today's housing
                    needs.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-brand-charcoal mb-4">
                    Who We Serve
                  </h3>
                  <div className="space-y-2">
                    {whoWeServe.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-forest shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-brand-forest to-brand-forest-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
        <div className="container relative z-10 text-center">
          <FadeUp>
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-white mb-4">
              Ready to Find Your New Home?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Now is the perfect time to explore your options. Let's talk about
              your goals, your budget, and the best solution for your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:9023381277"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-white text-brand-forest font-semibold tracking-wide uppercase text-sm
                           shadow-[0_8px_30px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_50px_-4px_rgba(0,0,0,0.4)]
                           hover:-translate-y-1 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Call (902) 338-1277
              </a>
              <a
                href="mailto:Kim@sylvanminihomes.ca"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           border-2 border-white/30 text-white font-semibold tracking-wide uppercase text-sm
                           hover:bg-white/10 hover:border-white/60 hover:-translate-y-1
                           transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Email Kim
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section
        id="contact"
        className="py-20 lg:py-32 bg-brand-dark relative"
        style={{ paddingTop: "5rem" }}
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <FadeUp>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-8 h-[2px] bg-brand-forest-light"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                  <span className="text-brand-forest-light font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
                    Get In Touch
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-white mb-6">
                  Start Your Home Journey
                </h2>
                <p className="text-white/50 text-lg mb-10 leading-relaxed">
                  Considering a mini or modular home? Contact us today to learn
                  more about available models, pricing, and upcoming opportunities.
                </p>

                <div className="space-y-4">
                  {/* Phone */}
                  <a
                    href="tel:9023381277"
                    className="flex items-start gap-4 group p-4 bg-white/5 backdrop-blur-sm border border-white/10
                               hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_24px_-8px_rgba(30,80,60,0.2)]
                               transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-forest to-brand-forest-light flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(30,80,60,0.4)]">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-[family-name:var(--font-mono)] tracking-wider uppercase mb-1">
                        Phone
                      </p>
                      <p className="text-white text-lg font-[family-name:var(--font-mono)] group-hover:text-brand-forest-light transition-colors">
                        (902) 338-1277
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:Kim@sylvanminihomes.ca"
                    className="flex items-start gap-4 group p-4 bg-white/5 backdrop-blur-sm border border-white/10
                               hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_24px_-8px_rgba(30,80,60,0.2)]
                               transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-forest to-brand-forest-light flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(30,80,60,0.4)]">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-[family-name:var(--font-mono)] tracking-wider uppercase mb-1">
                        Email
                      </p>
                      <p className="text-white group-hover:text-brand-forest-light transition-colors">
                        Kim@sylvanminihomes.ca
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <a
                    href="https://maps.app.goo.gl/FJGk5njusN4hSEf6A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group p-4 bg-white/5 backdrop-blur-sm border border-white/10
                               hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_24px_-8px_rgba(30,80,60,0.2)]
                               transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-forest to-brand-forest-light flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(30,80,60,0.4)]">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-[family-name:var(--font-mono)] tracking-wider uppercase mb-1">
                        Office
                      </p>
                      <p className="text-white group-hover:text-brand-forest-light transition-colors">
                        54 St. Marys Street, Antigonish, NS B2G 2A5
                      </p>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-forest to-brand-forest-light flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(30,80,60,0.4)]">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-[family-name:var(--font-mono)] tracking-wider uppercase mb-1">
                        Business Hours
                      </p>
                      <p className="text-white">
                        Monday - Friday: 8:30 AM - 4:30 PM
                      </p>
                      <p className="text-white/40 text-sm">
                        Saturday &amp; Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Map */}
            <FadeUp delay={0.2}>
              <div className="w-full h-full min-h-[400px] relative shadow-[0_16px_60px_-12px_rgba(0,0,0,0.5)] border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.5!2d-61.9888587!3d45.6242327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5c450cf697dec3%3A0x5543a9d20b91c88e!2sArchibald%20Robert%20General%20Contracting%20Ltd!5e0!3m2!1sen!2sca!4v1711648000000!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sylvan Mini Home Sales Location"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-brand-dark border-t border-white/5 py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={LOGO_IMG}
                  alt="Sylvan Mini Home Sales logo"
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 rounded-full bg-white p-0.5 shadow-[0_4px_16px_-2px_rgba(30,80,60,0.4)]"
                />
                <div className="leading-tight">
                  <span className="font-[family-name:var(--font-display)] text-white text-lg tracking-tight">
                    Sylvan
                  </span>
                  <span className="block text-[11px] text-white/50 font-[family-name:var(--font-mono)] tracking-wider uppercase">
                    Mini Home Sales
                  </span>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Your trusted Ironwood dealer in Antigonish &amp; Cape Breton.
                Quality homes, trusted service, built for Nova Scotia living.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-[family-name:var(--font-mono)] text-xs text-white/40 tracking-widest uppercase mb-4">
                Quick Links
              </h4>
              <nav className="space-y-2">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="block text-white/60 hover:text-brand-forest-light transition-colors text-sm hover:translate-x-1 transform duration-200"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="/archibald-contracting/#/contracting"
                  className="block text-brand-orange/60 hover:text-brand-orange transition-colors text-sm hover:translate-x-1 transform duration-200"
                >
                  Archibald Contracting
                </a>
                <a
                  href="https://www.ironwoodhomesinc.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/60 hover:text-brand-forest-light transition-colors text-sm hover:translate-x-1 transform duration-200"
                >
                  Ironwood Homes
                </a>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-[family-name:var(--font-mono)] text-xs text-white/40 tracking-widest uppercase mb-4">
                Contact
              </h4>
              <div className="space-y-2 text-sm">
                <a href="tel:9023381277" className="block text-white/60 hover:text-brand-forest-light transition-colors font-[family-name:var(--font-mono)]">
                  (902) 338-1277
                </a>
                <a href="mailto:Kim@sylvanminihomes.ca" className="block text-white/60 hover:text-brand-forest-light transition-colors">
                  Kim@sylvanminihomes.ca
                </a>
                <p className="text-white/60">
                  54 St. Marys Street, Antigonish, NS B2G 2A5
                </p>
                <p className="text-white/60">
                  Mon-Fri: 8:30 AM - 4:30 PM
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs font-[family-name:var(--font-mono)]">
              &copy; {new Date().getFullYear()} Sylvan Mini Home Sales. All rights reserved.
            </p>
            <p className="text-white/20 text-xs">
              Antigonish, Nova Scotia, Canada
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
