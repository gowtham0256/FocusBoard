import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Clock } from "lucide-react";
import { FOCUS_SLIDES } from "../data/focusSlides";

export default function FocusNotes() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % FOCUS_SLIDES.length);
  };

  const previousSlide = () => {
    setActiveSlide((prev) => (prev - 1 + FOCUS_SLIDES.length) % FOCUS_SLIDES.length);
  };

  const current = FOCUS_SLIDES[activeSlide];

  return (
    <section
      className="focus-carousel-container"
      aria-roledescription="carousel"
      aria-label="Focus Notes"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") previousSlide();
        if (e.key === "ArrowRight") nextSlide();
      }}
    >
      {/* Left Content Area */}
      <div className="focus-carousel-left">
        <div className="focus-slide-meta">
          <span className="focus-tag">{current.tag}</span>
          <span className="focus-slide-counter">{current.counter}</span>
        </div>

        <h2 className="focus-slide-title">{current.title}</h2>
        <p className="focus-slide-text">{current.description}</p>

        {/* Interactive Slide Progress Track */}
        <div
          className="focus-carousel-progress-track"
          role="tablist"
          aria-label="Carousel slide indicators"
        >
          <div
            className="focus-carousel-progress-fill"
            style={{ width: `${((activeSlide + 1) / FOCUS_SLIDES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Right Content Area: Floating Mini-Card + Arrow Buttons */}
      <div className="focus-carousel-right">
        {/* Floating Mini Task Card matching Figma nodes 15:2, 15:30, 15:58 */}
        <div className="carousel-mini-task-card" aria-hidden="true">
          <div className="mini-task-badge">
            {current.cardStatus === "COMPLETED" ? (
              <CheckCircle2 size={12} color="#10B981" />
            ) : (
              <Clock size={12} color="#5243E8" />
            )}
            <span>{current.cardStatus}</span>
          </div>

          <div className="mini-task-title">{current.cardTask}</div>

          <div className="mini-task-progress-wrap">
            <div className="mini-task-progress-bar">
              <div
                className="mini-task-progress-fill"
                style={{
                  width: `${current.progress}%`,
                  backgroundColor: current.progress === 100 ? "#10B981" : "#5243E8",
                }}
              />
            </div>
            <span className="mini-task-progress-num">{current.progress}%</span>
          </div>
        </div>

        {/* Carousel Arrow Buttons */}
        <div className="carousel-arrow-buttons">
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={previousSlide}
            aria-label="Previous focus note"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="carousel-arrow-btn next"
            onClick={nextSlide}
            aria-label="Next focus note"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
