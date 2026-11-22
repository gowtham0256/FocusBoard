import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Target, Award } from "lucide-react";
import { FOCUS_SLIDES } from "../data/focusSlides";

const ICONS = {
  Target,
  Sparkles,
  Award,
};

export default function FocusNotes() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % FOCUS_SLIDES.length);
  };

  const previousSlide = () => {
    setActiveSlide((prev) => (prev - 1 + FOCUS_SLIDES.length) % FOCUS_SLIDES.length);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      previousSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  const current = FOCUS_SLIDES[activeSlide];
  const Icon = ICONS[current.iconName] || Sparkles;

  return (
    <section
      className="focus-carousel-container"
      aria-roledescription="carousel"
      aria-label="Focus & Productivity Insights"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="focus-carousel-slide"
        role="group"
        aria-roledescription="slide"
        aria-label={`Slide ${activeSlide + 1} of ${FOCUS_SLIDES.length}: ${current.title}`}
      >
        <div className="focus-slide-meta">
          <span className="focus-tag">{current.tag}</span>
        </div>

        <h2 className="focus-slide-title">
          <Icon size={22} aria-hidden="true" />
          <span>{current.title}</span>
        </h2>

        <p className="focus-slide-text">{current.content}</p>
      </div>

      <div className="focus-carousel-controls">
        <div
          className="focus-carousel-indicators"
          role="tablist"
          aria-label="Focus Notes slides"
        >
          {FOCUS_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={activeSlide === index}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              className={`carousel-indicator-btn ${
                activeSlide === index ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <div className="carousel-arrow-buttons">
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={previousSlide}
            aria-label="Previous focus note"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={nextSlide}
            aria-label="Next focus note"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
