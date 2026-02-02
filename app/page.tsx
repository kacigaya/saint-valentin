"use client";

import { useState, useCallback, useRef } from "react";

// Pre-computed static values for floating hearts (avoids hydration mismatch)
const FLOATING_HEARTS = [
  { id: 0, delay: 0, duration: 15, left: 5, size: 24 },
  { id: 1, delay: 1.2, duration: 18, left: 15, size: 32 },
  { id: 2, delay: 2.4, duration: 14, left: 25, size: 20 },
  { id: 3, delay: 3.6, duration: 16, left: 35, size: 28 },
  { id: 4, delay: 4.8, duration: 19, left: 45, size: 36 },
  { id: 5, delay: 6, duration: 13, left: 55, size: 22 },
  { id: 6, delay: 7.2, duration: 17, left: 65, size: 30 },
  { id: 7, delay: 8.4, duration: 15, left: 75, size: 26 },
  { id: 8, delay: 9.6, duration: 18, left: 85, size: 34 },
  { id: 9, delay: 10.8, duration: 14, left: 95, size: 18 },
  { id: 10, delay: 12, duration: 16, left: 10, size: 40 },
  { id: 11, delay: 13.2, duration: 19, left: 30, size: 24 },
  { id: 12, delay: 14.4, duration: 13, left: 50, size: 38 },
  { id: 13, delay: 15.6, duration: 17, left: 70, size: 20 },
  { id: 14, delay: 16.8, duration: 15, left: 90, size: 32 },
] as const;

// Pre-computed static confetti values
const CONFETTI_COLORS = ["#e11d48", "#fda4af", "#ffe4e6", "#fff1f2", "#fecdd3"];
const CONFETTI_PIECES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % 5],
  left: (i * 17) % 100,
  delay: (i % 10) * 0.05,
  duration: 2 + (i % 5) * 0.4,
  size: 8 + (i % 8) * 1.5,
  isCircle: i % 2 === 0,
}));

// Animated SVG Heart Component
function Heart({
  className = "",
  size = 24,
  filled = true,
  color = "currentColor",
  style,
}: {
  className?: string;
  size?: number;
  filled?: boolean;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth={filled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// Floating Heart Background Element
function FloatingHeart({
  delay,
  duration,
  left,
  size,
}: {
  delay: number;
  duration: number;
  left: number;
  size: number;
}) {
  return (
    <div
      className="absolute animate-float-up pointer-events-none"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <Heart
        size={size}
        color="rgba(225, 29, 72, 0.3)"
        className="animate-float-sway"
      />
    </div>
  );
}

// Celebration Confetti
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {CONFETTI_PIECES.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: "-20px",
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.isCircle ? "50%" : "2px",
            animation: `confetti-fall ${piece.duration}s linear ${piece.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

// Big Celebration Heart
function CelebrationHeart() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      <div
        className="text-rose-500"
        style={{ animation: "celebration-burst 1s ease-out forwards" }}
      >
        <Heart size={200} color="#e11d48" />
      </div>
    </div>
  );
}

export default function ValentinePage() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Playful messages based on escape count
  const getEscapeMessage = () => {
    const messages = [
      "",
      "Nice try...",
      "You can't escape!",
      "Getting warmer...",
      "Just say yes!",
      "I'll keep moving!",
      "Persistence is key...",
      "Almost got me!",
      "Not today!",
      "Say yes already!",
    ];
    return messages[Math.min(escapeCount, messages.length - 1)];
  };

  // Move No button to random position
  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe boundaries (keep button fully visible)
    const padding = 20;
    const maxX = container.width - button.width - padding * 2;
    const maxY = container.height - button.height - padding * 2;

    // Generate random position with some minimum distance from current
    let newX, newY;
    const minDistance = 100;

    do {
      newX = padding + Math.random() * maxX;
      newY = padding + Math.random() * maxY;
    } while (
      hasMovedNo &&
      Math.hypot(newX - noButtonPosition.x, newY - noButtonPosition.y) <
        minDistance
    );

    setNoButtonPosition({ x: newX, y: newY });
    setHasMovedNo(true);
    setEscapeCount((prev) => prev + 1);
  }, [hasMovedNo, noButtonPosition]);

  // Handle Yes button click
  const handleYes = () => {
    setAccepted(true);
    setShowConfetti(true);

    // Stop confetti after a few seconds
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Reset state
  const handleReset = () => {
    setAccepted(false);
    setHasMovedNo(false);
    setNoButtonPosition({ x: 0, y: 0 });
    setEscapeCount(0);
  };

  return (
    <div
      ref={containerRef}
      className="grain relative min-h-screen w-full overflow-hidden"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(159, 18, 57, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(225, 29, 72, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(253, 164, 175, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, #0d0208 0%, #1a0510 50%, #0d0208 100%)
          `,
          backgroundSize: "400% 400%",
        }}
      />

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {FLOATING_HEARTS.map((heart) => (
          <FloatingHeart key={heart.id} {...heart} />
        ))}
      </div>

      {/* Celebration effects */}
      {showConfetti && (
        <>
          <Confetti />
          <CelebrationHeart />
        </>
      )}

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        {!accepted ? (
          // Question State
          <div className="flex flex-col items-center text-center">
            {/* Decorative top heart */}
            <div className="mb-8 animate-pulse-glow">
              <Heart size={80} color="#e11d48" className="animate-heartbeat" />
            </div>

            {/* Main heading */}
            <h1
              className="animate-text-reveal mb-4 text-4xl font-bold tracking-tight text-rose-50 sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                textShadow: "0 0 40px rgba(225, 29, 72, 0.5)",
                animationDelay: "0.1s",
              }}
            >
              Will you be my
            </h1>
            <h1
              className="animate-text-reveal mb-8 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                animationDelay: "0.3s",
              }}
            >
              Valentine?
            </h1>

            {/* Escape message */}
            <div className="h-8 mb-8">
              {escapeCount > 0 && (
                <p
                  className="text-rose-300/80 text-lg italic animate-text-reveal"
                  style={{ animationDelay: "0s" }}
                >
                  {getEscapeMessage()}
                </p>
              )}
            </div>

            {/* Buttons container */}
            <div
              className="animate-text-reveal flex flex-col gap-4 sm:flex-row sm:gap-6"
              style={{ animationDelay: "0.5s" }}
            >
              {/* Yes Button - Static */}
              <button
                onClick={handleYes}
                className="btn-romantic group relative min-w-[140px] rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 px-10 py-4 text-xl font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-rose-500/50 focus:outline-none focus:ring-4 focus:ring-rose-400/50 active:scale-105 sm:min-w-[160px] sm:px-12 sm:py-5 sm:text-2xl"
                aria-label="Yes, I will be your Valentine"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Yes
                  <Heart
                    size={20}
                    className="transition-transform group-hover:scale-125"
                  />
                </span>
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

              {/* No Button - Moves on hover/touch (only in default position) */}
              {!hasMovedNo && (
                <button
                  ref={noButtonRef}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={moveNoButton}
                  className="btn-romantic min-w-[140px] rounded-full border-2 border-rose-400/40 bg-transparent px-10 py-4 text-xl font-semibold text-rose-300 backdrop-blur-sm transition-all duration-300 hover:border-rose-400/60 hover:bg-rose-950/30 focus:outline-none focus:ring-4 focus:ring-rose-400/30 sm:min-w-[160px] sm:px-12 sm:py-5 sm:text-2xl"
                  aria-label="No button - but it will escape!"
                >
                  No
                </button>
              )}
            </div>
          </div>
        ) : (
          // Accepted State
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 animate-pulse-glow">
              <Heart size={100} color="#e11d48" className="animate-heartbeat" />
            </div>

            <h1
              className="animate-text-reveal mb-6 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Yay!
            </h1>

            <p
              className="animate-text-reveal mb-4 text-2xl text-rose-200 sm:text-3xl"
              style={{ animationDelay: "0.2s" }}
            >
              I knew you&apos;d say yes!
            </p>

            <p
              className="animate-text-reveal mb-8 text-lg text-rose-300/70 sm:text-xl"
              style={{ animationDelay: "0.4s" }}
            >
              Happy Valentine&apos;s Day, my love
            </p>

            {/* Decorative hearts */}
            <div
              className="animate-text-reveal flex gap-4 mb-10"
              style={{ animationDelay: "0.6s" }}
            >
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  size={24 + i * 4}
                  color="#fda4af"
                  className="animate-float-sway"
                  style={
                    { animationDelay: `${i * 0.2}s` } as React.CSSProperties
                  }
                />
              ))}
            </div>

            <button
              onClick={handleReset}
              className="animate-text-reveal text-rose-400/60 text-sm underline underline-offset-4 hover:text-rose-300 transition-colors"
              style={{ animationDelay: "0.8s" }}
            >
              Ask me again
            </button>
          </div>
        )}
      </main>

      {/* Escaped No Button - Absolute positioned */}
      {hasMovedNo && !accepted && (
        <button
          ref={noButtonRef}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          onClick={moveNoButton}
          className="btn-romantic absolute z-20 min-w-[140px] rounded-full border-2 border-rose-400/40 bg-rose-950/80 px-10 py-4 text-xl font-semibold text-rose-300 backdrop-blur-sm transition-all duration-500 ease-out hover:border-rose-400/60 focus:outline-none focus:ring-4 focus:ring-rose-400/30 sm:min-w-[160px] sm:px-12 sm:py-5 sm:text-2xl"
          style={{
            left: noButtonPosition.x,
            top: noButtonPosition.y,
            transform: "translate(0, 0)",
          }}
          aria-label="No button - keeps escaping!"
        >
          No
        </button>
      )}

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 opacity-20">
        <Heart size={40} color="#fda4af" className="animate-float-sway" />
      </div>
      <div
        className="absolute top-8 right-8 opacity-20"
        style={{ animationDelay: "1s" }}
      >
        <Heart size={32} color="#fda4af" className="animate-float-sway" />
      </div>
      <div
        className="absolute bottom-8 left-8 opacity-20"
        style={{ animationDelay: "2s" }}
      >
        <Heart size={36} color="#fda4af" className="animate-float-sway" />
      </div>
      <div
        className="absolute bottom-8 right-8 opacity-20"
        style={{ animationDelay: "1.5s" }}
      >
        <Heart size={44} color="#fda4af" className="animate-float-sway" />
      </div>

      {/* Bottom signature */}
      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-rose-400/30 text-xs tracking-widest uppercase">
          Made with love
        </p>
      </footer>
    </div>
  );
}
