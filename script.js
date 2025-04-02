document.addEventListener("DOMContentLoaded", function () {

    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector("nav ul");

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener("click", function (e) {
            navMenu.classList.toggle("show");
            e.stopPropagation(); // Mencegah event bubbling
        });

        document.addEventListener("click", function (e) {
            if (!e.target.closest("nav") && navMenu.classList.contains("show")) {
                navMenu.classList.remove("show");
            }
        });
    }


    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener("scroll", () => {
            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 70;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href").substring(1) === current) {
                    link.classList.add("active");
                }
            });
        });
    }


    let index = 0;
    const testimonials = document.querySelectorAll(".testimonial-box");
    const dotsContainer = document.querySelector(".dots");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (!testimonials.length || !dotsContainer || !nextBtn || !prevBtn) {
        console.error("Elemen testimoni tidak ditemukan.");
        return;
    }

    testimonials.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showTestimonial(i) {
        testimonials.forEach((t, j) => {
            t.classList.remove("active");
            dots[j].classList.remove("active");
        });
        testimonials[i].classList.add("active");
        dots[i].classList.add("active");
    }

    function nextSlide() {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    }

    function prevSlide() {
        index = (index - 1 + testimonials.length) % testimonials.length;
        showTestimonial(index);
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", function () {
            index = i;
            showTestimonial(i);
            resetAutoSlide();
        });
    });

    let autoSlide = setInterval(nextSlide, 3000);

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 3000);
    }

    showTestimonial(index);


    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
            }
        });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));
});
