document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = anchor.getAttribute("href").substring(1);
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerHeight = document.querySelector("header").offsetHeight;
    const sectionPosition =
      section.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      20;

    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });
  });
});




window.addEventListener("load", () => {
  document.body.classList.add("loaded"); // fade in body

  const sections = document.querySelectorAll(".glass");
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add("visible");

      // Reveal list items inside section
      const listItems = section.querySelectorAll("ul li");
      listItems.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add("fade-in");
        }, i * 200);
      });
    }, index * 800); 
  });
});


// Scroll-based Reveal (fallback for long pages)

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === "experience") {
          entry.target.classList.add("slide-left");
        } else if (entry.target.id === "honors") {
          entry.target.classList.add("slide-right");
        } else {
          entry.target.classList.add("visible");
        }

        const listItems = entry.target.querySelectorAll("ul li");
        listItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("fade-in");
          }, index * 200);
        });

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".glass").forEach((section) => {
  observer.observe(section);
});
