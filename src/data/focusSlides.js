/**
 * Focus Notes 3-Slide Carousel Content
 * Matched to exact original FocusBoard Figma frames (15:2, 15:30, 15:58):
 * - Slide 1: Heading: "Make today count.", Description: "A little focus goes a long way.", Counter: "01 / 03"
 * - Slide 2: Heading: "Small steps, big progress.", Description: "Keep your priorities in view.", Counter: "02 / 03"
 * - Slide 3: Heading: "Celebrate the wins.", Description: "Every completed task moves you forward.", Counter: "03 / 03"
 */

export const FOCUS_SLIDES = [
  {
    id: "slide-1",
    counter: "01 / 03",
    tag: "FOCUS NOTES",
    title: "Make today count.",
    description: "A little focus goes a long way.",
    cardStatus: "NEXT UP",
    cardTask: "Design landing page",
    progress: 40,
  },
  {
    id: "slide-2",
    counter: "02 / 03",
    tag: "FOCUS NOTES",
    title: "Small steps, big progress.",
    description: "Keep your priorities in view.",
    cardStatus: "IN PROGRESS",
    cardTask: "Fix navigation",
    progress: 65,
  },
  {
    id: "slide-3",
    counter: "03 / 03",
    tag: "FOCUS NOTES",
    title: "Celebrate the wins.",
    description: "Every completed task moves you forward.",
    cardStatus: "COMPLETED",
    cardTask: "Onboarding copy",
    progress: 100,
  },
];
