// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 4px 20px rgba(15, 76, 117, 0.1)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("service-card")) {
        entry.target.classList.add("fade-in-up")
      } else if (entry.target.classList.contains("news-card")) {
        entry.target.classList.add("slide-in-left")
      } else if (entry.target.classList.contains("about-item")) {
        entry.target.classList.add("slide-in-right")
      } else {
        entry.target.classList.add("fade-in-up")
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-card, .news-card, .about-item, .resource-category, .contact-item").forEach((el) => {
  observer.observe(el)
})

// Contact form handling
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!firstName || !lastName || !email || !subject || !message) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".btn-primary")
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    showNotification("Thank you for your message! We will get back to you within 24 hours.", "success")
    contactForm.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    max-width: 400px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `

  notification.querySelector(".notification-content").style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `

  notification.querySelector(".notification-close").style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    margin-left: auto;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification)
  }, 5000)

  // Close button functionality
  notification.querySelector(".notification-close").addEventListener("click", () => {
    removeNotification(notification)
  })
}

function removeNotification(notification) {
  notification.style.transform = "translateX(100%)"
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 300)
}

// Add loading animation to elements as they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".service-card, .news-card, .about-item, .contact-item")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("fade-in-up")
    }
  })
}

window.addEventListener("scroll", animateOnScroll)

// Counter animation for hero stats
function animateCounters() {
  const counters = document.querySelectorAll(".hero-stats .stat-item h3")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/\D/g, ""))
    const suffix = counter.textContent.replace(/[0-9]/g, "")
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counter.textContent = target + suffix
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current) + suffix
      }
    }, 20)
  })
}

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll()

  // Animate counters when hero section is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        heroObserver.unobserve(entry.target)
      }
    })
  })

  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    heroObserver.observe(heroStats)
  }

  // Add stagger animation to service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Add stagger animation to news cards
  const newsCards = document.querySelectorAll(".news-card")
  newsCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })
})

// Scroll to top functionality
const createScrollToTopButton = () => {
  const button = document.createElement("button")
  button.innerHTML = '<i class="fas fa-arrow-up"></i>'
  button.className = "scroll-to-top"
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: var(--shadow-xl);
    transition: var(--transition);
    z-index: 1000;
  `

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  button.addEventListener("mouseenter", () => {
    button.style.background = "var(--secondary-color)"
    button.style.transform = "translateY(-3px) scale(1.1)"
  })

  button.addEventListener("mouseleave", () => {
    button.style.background = "var(--primary-color)"
    button.style.transform = "translateY(0) scale(1)"
  })

  document.body.appendChild(button)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      button.style.display = "flex"
    } else {
      button.style.display = "none"
    }
  })
}

// Initialize scroll to top button
createScrollToTopButton()

// Add hover effects to cards
document.querySelectorAll(".service-card, .news-card, .resource-category").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero-background")
  if (parallax) {
    const speed = scrolled * 0.5
    parallax.style.transform = `translateY(${speed}px)`
  }
})

// Search functionality (if search input exists)
const searchInput = document.querySelector("#search")
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const searchableElements = document.querySelectorAll(".service-card, .news-card, .resource-list a")

    searchableElements.forEach((element) => {
      const text = element.textContent.toLowerCase()
      if (text.includes(searchTerm)) {
        element.style.display = "block"
        element.parentElement.style.display = "block"
      } else {
        element.style.display = "none"
      }
    })
  })
}

// Print functionality
function printPage() {
  window.print()
}

// Add print styles
const printStyles = `
  @media print {
    .header, .footer, .scroll-to-top, .hero-buttons {
      display: none !important;
    }
    
    .hero {
      min-height: auto;
      padding: 2rem 0;
    }
    
    .section {
      padding: 1rem 0;
    }
    
    .service-card, .news-card {
      break-inside: avoid;
      margin-bottom: 1rem;
    }
  }
`

const styleSheet = document.createElement("style")
styleSheet.textContent = printStyles
document.head.appendChild(styleSheet)

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  console.log("Ghana Shippers' Authority website loaded successfully!")
})
