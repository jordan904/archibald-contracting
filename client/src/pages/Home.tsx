/**
 * Home Page — Robert Archibald General Contracting LTD.
 *
 * PREMIUM 3D UPGRADE
 * - Parallax hero with layered depth
 * - Glassmorphism nav & cards
 * - 3D tilt hover on service cards
 * - Staggered reveal animations with spring physics
 * - Floating/elevated shadows on all interactive elements
 * - Smooth scroll-linked transforms
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
  MapPin,
  Clock,
  Facebook,
  ChevronDown,
  Hammer,
  Home as HomeIcon,
  Building2,
  Tractor,
  Truck,
  Mountain,
  HardHat,
  Star,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

/* ─── Image URLs ─── */
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031449034/37H85K3jGXhaow3QVGy8KL/hero-construction-a35GNN8vDDVJ2HLS48BBhy.webp";
const EXCAVATION_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031449034/37H85K3jGXhaow3QVGy8KL/excavation-work-aiWXmWM86VL44S2aWqoJsQ.webp";
const RESIDENTIAL_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031449034/37H85K3jGXhaow3QVGy8KL/residential-build-V4Q2Br8vkCPKJ6c6Z8txcR.webp";
const BARN_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031449034/37H85K3jGXhaow3QVGy8KL/barn-agricultural-CDw3AfkjYqjYb6WSrRABRa.webp";
const RENOVATION_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031449034/37H85K3jGXhaow3QVGy8KL/renovation-interior-4s6B6CP8U8PPVnwDGrGcUo.webp";

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════ */

/* Animated counter with spring feel */
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

/* 3D tilt hook for cards */
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

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION WRAPPERS
   ═══════════════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════════════
   3D SERVICE CARD
   ═══════════════════════════════════════════════════════════════════ */

function ServiceCard({
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
        {/* Glossy highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Number label */}
        <span
          className="absolute top-4 right-4 font-[family-name:var(--font-mono)] text-xs text-brand-orange/30 tracking-wider"
          style={{ transform: "translateZ(20px)" }}
        >
          0{index + 1}
        </span>

        {/* Icon with 3D pop */}
        <div
          className="w-14 h-14 bg-gradient-to-br from-brand-orange to-brand-orange/80 flex items-center justify-center mb-6
                     shadow-[0_8px_24px_-4px_rgba(180,80,20,0.35)] group-hover:shadow-[0_12px_32px_-4px_rgba(180,80,20,0.5)]
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

        {/* Bottom accent line with glow */}
        <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-brand-orange to-brand-orange/60 group-hover:w-full transition-all duration-700 shadow-[0_0_12px_rgba(180,80,20,0.4)]" />
      </motion.div>
    </FadeUp>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3D GALLERY CARD
   ═══════════════════════════════════════════════════════════════════ */

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
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Glassmorphism label */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <span className="font-[family-name:var(--font-mono)] text-xs text-white tracking-widest uppercase">
              {label}
            </span>
          </div>
        </div>

        {/* Shine sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      </motion.div>
    </FadeUp>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3D REVIEW CARD
   ═══════════════════════════════════════════════════════════════════ */

function ReviewCard({
  name,
  rating,
  text,
  time,
  index,
}: {
  name: string;
  rating: number;
  text: string;
  time: string;
  index: number;
}) {
  const tilt = useTilt(5);

  return (
    <FadeUp delay={index * 0.12}>
      <motion.div
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformPerspective: 800,
        }}
        className="bg-gradient-to-br from-white to-brand-cream border border-brand-sandstone/60 p-8 relative
                   shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)]
                   transition-shadow duration-500"
      >
        {/* Quote mark with depth */}
        <span className="absolute top-4 right-6 font-[family-name:var(--font-display)] text-7xl text-brand-orange/10 leading-none select-none">
          &ldquo;
        </span>

        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, j) => (
            <Star key={j} className="w-4 h-4 text-brand-orange fill-brand-orange drop-shadow-[0_1px_2px_rgba(180,80,20,0.3)]" />
          ))}
        </div>

        <p className="text-brand-charcoal leading-relaxed mb-6 italic relative z-10">
          &ldquo;{text}&rdquo;
        </p>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-brand-orange to-brand-orange/70 flex items-center justify-center font-[family-name:var(--font-display)] text-white text-lg shadow-[0_4px_12px_-2px_rgba(180,80,20,0.4)]">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-brand-charcoal text-sm">{name}</p>
            <p className="text-muted-foreground text-xs font-[family-name:var(--font-mono)]">{time}</p>
          </div>
        </div>
      </motion.div>
    </FadeUp>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const services = [
  {
    icon: HomeIcon,
    title: "Residential Construction",
    desc: "Custom homes built from the ground up. From foundations to finishing, we handle every phase of your new home build with precision and care.",
  },
  {
    icon: Building2,
    title: "Commercial Construction",
    desc: "Reliable commercial builds that meet your business needs. We deliver projects on time and within budget, from offices to retail spaces.",
  },
  {
    icon: Tractor,
    title: "Agricultural Buildings",
    desc: "Barns, equipment shelters, and farm structures built to withstand the Maritime climate. Engineered for function and durability.",
  },
  {
    icon: Truck,
    title: "Aggregate & Trucking",
    desc: "Gravel, fill, and aggregate supply with reliable trucking services. We deliver materials to your site on time, every time.",
  },
  {
    icon: Mountain,
    title: "Excavation",
    desc: "Site preparation, foundation digging, grading, and land clearing. Our heavy equipment operators bring over 18 years of experience.",
  },
  {
    icon: Hammer,
    title: "Foundations",
    desc: "Concrete foundations, form work, and structural base construction. Every great build starts with a solid foundation.",
  },
];

const gallery = [
  { src: RESIDENTIAL_IMG, alt: "Custom residential home build in Nova Scotia", label: "Residential" },
  { src: EXCAVATION_IMG, alt: "Foundation excavation with heavy equipment", label: "Excavation" },
  { src: BARN_IMG, alt: "Agricultural barn construction", label: "Agricultural" },
  { src: RENOVATION_IMG, alt: "Aggregate and trucking services in Nova Scotia", label: "Aggregate" },
];

const reviews = [
  { name: "Leslie Chisholm", rating: 5, text: "Very good people, very helpful.", time: "Google Review" },
  { name: "Alexander Delorey", rating: 5, text: "Excellent work and professional service. Highly recommend Archibald Contracting for any project.", time: "Google Review" },
  { name: "Christina Turay", rating: 5, text: "Quality craftsmanship and a team you can trust. They delivered exactly what was promised.", time: "Google Review" },
];

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Our Work" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Parallax for hero */
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
      {/* ─── NAVIGATION — Glassmorphism ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-brand-dark/80 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] border-b border-white/5"
            : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-orange/80 rounded-sm flex items-center justify-center shadow-[0_4px_16px_-2px_rgba(180,80,20,0.4)] group-hover:shadow-[0_8px_24px_-2px_rgba(180,80,20,0.6)] transition-shadow duration-300">
              <HardHat className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-[family-name:var(--font-display)] text-white text-lg tracking-tight">
                Robert Archibald
              </span>
              <span className="hidden sm:block text-[11px] text-white/50 font-[family-name:var(--font-mono)] tracking-wider uppercase">
                General Contracting
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="/archibald-contracting/#/"
              className="relative text-sm text-brand-forest-light/80 hover:text-brand-forest-light transition-colors font-medium tracking-wide uppercase group flex items-center gap-1"
            >
              Sylvan Homes
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-forest group-hover:w-full transition-all duration-300" />
            </a>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm text-white/70 hover:text-white transition-colors font-medium tracking-wide uppercase group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-orange group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(180,80,20,0.4)]" />
              </a>
            ))}
            <a
              href="tel:9028633935"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-brand-orange to-brand-orange/90 text-white text-sm font-semibold tracking-wide uppercase
                         shadow-[0_4px_20px_-4px_rgba(180,80,20,0.5)] hover:shadow-[0_8px_30px_-4px_rgba(180,80,20,0.7)]
                         hover:-translate-y-0.5 transition-all duration-300"
            >
              (902) 863-3935
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav — glassmorphism */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-brand-dark/90 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <nav className="container py-6 flex flex-col gap-4">
                <motion.a
                  href="/archibald-contracting/#/"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                  className="text-brand-forest-light/80 hover:text-brand-forest-light transition-colors font-medium tracking-wide uppercase text-sm"
                >
                  Sylvan Homes
                </motion.a>
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 1) * 0.05 }}
                    className="text-white/80 hover:text-brand-orange transition-colors font-medium tracking-wide uppercase text-sm"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <a
                  href="tel:9028633935"
                  className="mt-2 px-5 py-3 bg-gradient-to-r from-brand-orange to-brand-orange/90 text-white text-sm font-semibold tracking-wide uppercase text-center shadow-lg"
                >
                  Call (902) 863-3935
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO — Parallax + layered depth ─── */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-end pb-16 lg:pb-24 overflow-hidden">
        {/* Parallax background */}
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img
            src={HERO_IMG}
            alt="Aerial view of a home under construction in Nova Scotia"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 to-transparent" />

        {/* Animated grain overlay for texture */}
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
                className="w-12 h-[2px] bg-brand-orange"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ originX: 0 }}
              />
              <span className="text-brand-orange font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase">
                Antigonish, Nova Scotia
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-6"
            >
              <span className="inline-block">Building Nova Scotia</span>
              <br />
              <motion.span
                className="inline-block text-brand-orange"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ textShadow: "0 4px 30px rgba(180,80,20,0.3)" }}
              >
                Since 1968
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-white/70 text-lg lg:text-xl max-w-xl mb-10 leading-relaxed"
            >
              Specializing in residential, commercial, and agricultural
              construction, excavation, and aggregate services. Quality
              craftsmanship rooted in our community.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="tel:9028633935"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-gradient-to-r from-brand-orange to-brand-orange/90 text-white font-semibold tracking-wide uppercase text-sm
                           shadow-[0_8px_30px_-4px_rgba(180,80,20,0.5)] hover:shadow-[0_16px_50px_-4px_rgba(180,80,20,0.7)]
                           hover:-translate-y-1 transition-all duration-300"
              >
                <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Get a Free Estimate
              </a>
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4
                           border-2 border-white/20 text-white font-semibold tracking-wide uppercase text-sm
                           backdrop-blur-sm bg-white/5
                           hover:bg-white/10 hover:border-white/40 hover:-translate-y-1
                           transition-all duration-300"
              >
                Our Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator with pulse */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-8 h-12 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-brand-orange rounded-full shadow-[0_0_8px_rgba(180,80,20,0.6)]"
            />
          </div>
        </motion.div>
      </section>

      {/* ─── STATS BAR — Elevated glass panels ─── */}
      <section
        className="relative bg-brand-dark py-10 lg:py-14"
        style={{ clipPath: "polygon(0 0, 100% 4%, 100% 100%, 0 96%)", marginTop: "-3rem", paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { end: 55, suffix: "+", label: "Years Experience" },
              { end: 4, suffix: ".4", label: "Google Rating", prefix: "" },
              { end: 100, suffix: "%", label: "Free Estimates" },
              { end: 579, suffix: "+", label: "Facebook Followers" },
            ].map((stat, i) => {
              const counter = useCounter(stat.end, 1800);
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm
                                  shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_-4px_rgba(180,80,20,0.15)]
                                  hover:-translate-y-1 transition-all duration-500">
                    <span
                      ref={counter.ref}
                      className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl text-brand-orange"
                      style={{ textShadow: "0 2px 20px rgba(180,80,20,0.3)" }}
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

      {/* ─── SERVICES — 3D tilt cards ─── */}
      <section id="services" className="py-20 lg:py-32 dot-grid relative" style={{ marginTop: "-2rem", paddingTop: "5rem" }}>
        <div className="container">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-8 h-[2px] bg-brand-orange"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ originX: 0 }}
              />
              <span className="text-brand-orange font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
                What We Do
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-brand-charcoal mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg mb-16">
              From foundations to finishing touches, we provide comprehensive
              construction services across Antigonish and surrounding communities
              in Nova Scotia.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {services.map((s, i) => (
              <ServiceCard key={i} icon={s.icon} title={s.title} desc={s.desc} index={i} />
            ))}
          </div>

          {/* Additional services — elevated callout */}
          <FadeUp delay={0.3}>
            <div className="mt-12 p-6 border-l-4 border-brand-orange bg-gradient-to-r from-brand-sandstone/80 to-brand-cream/60 backdrop-blur-sm
                            shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
              <p className="text-brand-charcoal font-medium">
                We also offer{" "}
                <strong>demolition services</strong>,{" "}
                <strong>steel roofing &amp; siding</strong>, and{" "}
                <strong>mini home sales through Sylvan Homes</strong>.{" "}
                Call us for a free estimate on any project.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── OUR WORK / GALLERY — 3D tilt images ─── */}
      <section
        id="work"
        className="py-20 lg:py-32 bg-brand-dark relative"
        style={{ clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)", paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <div className="container">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-8 h-[2px] bg-brand-orange"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ originX: 0 }}
              />
              <span className="text-brand-orange font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
                Portfolio
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-white mb-4">
              Our Work
            </h2>
            <p className="text-white/50 max-w-2xl text-lg mb-16">
              A selection of projects showcasing our range - from custom homes
              and agricultural buildings to excavation and aggregate services.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6" style={{ perspective: "1200px" }}>
            {gallery.map((img, i) => (
              <GalleryCard key={i} src={img.src} alt={img.alt} label={img.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT — Slide-in with floating elements ─── */}
      <section id="about" className="py-20 lg:py-32 relative overflow-hidden" style={{ marginTop: "-2rem", paddingTop: "5rem" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn from="left">
              <div className="relative">
                <img
                  src={HERO_IMG}
                  alt="Archibald Contracting construction site"
                  className="w-full aspect-[4/3] object-cover shadow-[0_16px_60px_-12px_rgba(0,0,0,0.25)]"
                />
                {/* Decorative border frame */}
                <div className="absolute -inset-3 border-2 border-brand-orange/20 -z-10" />

                {/* Floating stat card with 3D shadow */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...springTransition, delay: 0.4 }}
                  className="absolute -bottom-6 -right-4 lg:-right-8 bg-gradient-to-br from-brand-orange to-brand-orange/85 p-6
                             shadow-[0_16px_40px_-8px_rgba(180,80,20,0.5)]"
                >
                  <span className="font-[family-name:var(--font-display)] text-3xl text-white block">
                    55+
                  </span>
                  <span className="text-white/80 text-sm font-[family-name:var(--font-mono)] tracking-wider uppercase">
                    Years of Experience
                  </span>
                </motion.div>
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.2}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-8 h-[2px] bg-brand-orange"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                  <span className="text-brand-orange font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
                    About Us
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-brand-charcoal mb-6">
                  Family-Owned.
                  <br />
                  Community-Rooted.
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Robert Archibald's General Contracting Limited is a
                    family-owned construction company based in Antigonish, Nova
                    Scotia. In business since 1968, we've built our reputation on
                    quality craftsmanship, honest service, and a deep commitment
                    to our community.
                  </p>
                  <p>
                    From custom homes and agricultural buildings to commercial
                    projects and aggregate services, our team brings expertise
                    in every phase of construction - including excavation,
                    foundations, framing, and finishing. We operate our own heavy
                    equipment and manage projects from start to finish.
                  </p>
                  <p>
                    As proud members of the Antigonish Chamber of Commerce, we're
                    invested in building not just structures, but lasting
                    relationships with our clients and neighbours across Nova
                    Scotia.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:9028633935"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3
                               bg-gradient-to-r from-brand-orange to-brand-orange/90 text-white font-semibold tracking-wide uppercase text-sm
                               shadow-[0_6px_24px_-4px_rgba(180,80,20,0.4)] hover:shadow-[0_12px_36px_-4px_rgba(180,80,20,0.6)]
                               hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    Call Us Today
                  </a>
                  <a
                    href="https://www.facebook.com/ArchibaldContracting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3
                               border-2 border-brand-charcoal/20 text-brand-charcoal font-semibold tracking-wide uppercase text-sm
                               hover:border-brand-charcoal/40 hover:bg-brand-charcoal/5 hover:-translate-y-0.5
                               transition-all duration-300"
                  >
                    <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    Follow on Facebook
                  </a>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS — 3D tilt cards ─── */}
      <section id="reviews" className="py-20 lg:py-32 bg-brand-sandstone/50 dot-grid relative">
        <div className="container">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-8 h-[2px] bg-brand-orange"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ originX: 0 }}
              />
              <span className="text-brand-orange font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
                Testimonials
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-brand-charcoal mb-4">
              What Our Clients Say
            </h2>
            <div className="flex items-center gap-2 mb-16">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? "text-brand-orange fill-brand-orange drop-shadow-[0_1px_2px_rgba(180,80,20,0.3)]" : "text-brand-orange/40 fill-brand-orange/40"}`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm font-[family-name:var(--font-mono)]">
                4.4 / 5 on Google
              </span>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
            {reviews.map((r, i) => (
              <ReviewCard key={i} {...r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT / MAP — Glassmorphism contact cards ─── */}
      <section
        id="contact"
        className="py-20 lg:py-32 bg-brand-dark relative"
        style={{ clipPath: "polygon(0 4%, 100% 0, 100% 100%, 0 100%)", paddingTop: "6rem" }}
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <FadeUp>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-8 h-[2px] bg-brand-orange"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                  <span className="text-brand-orange font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
                    Get In Touch
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-5xl text-white mb-6">
                  Ready to Build?
                </h2>
                <p className="text-white/50 text-lg mb-10 leading-relaxed">
                  Whether you're planning a new home, need excavation work
                  done, or require aggregate and trucking services, we'd love
                  to hear from you. Free estimates on all projects.
                </p>

                <div className="space-y-4">
                  {/* Phone */}
                  <a
                    href="tel:9028633935"
                    className="flex items-start gap-4 group p-4 bg-white/5 backdrop-blur-sm border border-white/10
                               hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_24px_-8px_rgba(180,80,20,0.2)]
                               transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-brand-orange/70 flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(180,80,20,0.4)]">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-[family-name:var(--font-mono)] tracking-wider uppercase mb-1">
                        Phone
                      </p>
                      <p className="text-white text-lg font-[family-name:var(--font-mono)] group-hover:text-brand-orange transition-colors">
                        (902) 863-3935
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <a
                    href="https://maps.app.goo.gl/FJGk5njusN4hSEf6A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group p-4 bg-white/5 backdrop-blur-sm border border-white/10
                               hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_24px_-8px_rgba(180,80,20,0.2)]
                               transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-brand-orange/70 flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(180,80,20,0.4)]">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-[family-name:var(--font-mono)] tracking-wider uppercase mb-1">
                        Address
                      </p>
                      <p className="text-white group-hover:text-brand-orange transition-colors">
                        54 St Marys St, Antigonish, NS B2G 2A5
                      </p>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-brand-orange/70 flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(180,80,20,0.4)]">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-[family-name:var(--font-mono)] tracking-wider uppercase mb-1">
                        Business Hours
                      </p>
                      <p className="text-white">
                        Monday &ndash; Friday: 8:30 AM &ndash; 4:30 PM
                      </p>
                      <p className="text-white/40 text-sm">
                        Saturday &amp; Sunday: Closed
                      </p>
                    </div>
                  </div>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/ArchibaldContracting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group p-4 bg-white/5 backdrop-blur-sm border border-white/10
                               hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_24px_-8px_rgba(180,80,20,0.2)]
                               transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-brand-orange/70 flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(180,80,20,0.4)]">
                      <Facebook className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-[family-name:var(--font-mono)] tracking-wider uppercase mb-1">
                        Social
                      </p>
                      <p className="text-white group-hover:text-brand-orange transition-colors">
                        Follow us on Facebook
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </FadeUp>

            {/* Map embed with elevated frame */}
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
                  title="Archibald Contracting Location"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-brand-dark border-t border-white/5 py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-orange/80 rounded-sm flex items-center justify-center shadow-[0_4px_16px_-2px_rgba(180,80,20,0.4)]">
                  <HardHat className="w-5 h-5 text-white" />
                </div>
                <div className="leading-tight">
                  <span className="font-[family-name:var(--font-display)] text-white text-lg tracking-tight">
                    Robert Archibald
                  </span>
                  <span className="block text-[11px] text-white/50 font-[family-name:var(--font-mono)] tracking-wider uppercase">
                    General Contracting
                  </span>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Specializing in residential, commercial, and agricultural
                construction, excavation, and aggregate services in Antigonish, Nova Scotia.
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
                    className="block text-white/60 hover:text-brand-orange transition-colors text-sm hover:translate-x-1 transform duration-200"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="/archibald-contracting/#/"
                  className="block text-brand-forest-light/60 hover:text-brand-forest-light transition-colors text-sm hover:translate-x-1 transform duration-200"
                >
                  Sylvan Mini Home Sales
                </a>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-[family-name:var(--font-mono)] text-xs text-white/40 tracking-widest uppercase mb-4">
                Contact
              </h4>
              <div className="space-y-2 text-sm">
                <a href="tel:9028633935" className="block text-white/60 hover:text-brand-orange transition-colors font-[family-name:var(--font-mono)]">
                  (902) 863-3935
                </a>
                <p className="text-white/60">
                  54 St Marys St, Antigonish, NS B2G 2A5
                </p>
                <p className="text-white/60">
                  Mon&ndash;Fri: 8:30 AM &ndash; 4:30 PM
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs font-[family-name:var(--font-mono)]">
              &copy; {new Date().getFullYear()} Robert Archibald's General Contracting Limited. All rights reserved.
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
