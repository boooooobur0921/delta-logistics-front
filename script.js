// Sticky navbar shadow on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".pinned-navbar")
  if (window.scrollY > 10) {
    navbar.style.boxShadow = "0 2px 16px 0 rgba(30,95,255,0.10)"
  } else {
    navbar.style.boxShadow = "0 2px 16px 0 rgba(0,0,0,0.04)"
  }
})

// Slider logic
const slides = document.querySelectorAll(".slide")
const prevBtn = document.querySelector(".slider-btn.prev")
const nextBtn = document.querySelector(".slider-btn.next")
const dots = document.querySelectorAll(".dot")
let currentSlide = 0
let sliderInterval
function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === idx)
  })
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === idx)
  })
  currentSlide = idx
}
function nextSlide() {
  const idx = (currentSlide + 1) % slides.length
  showSlide(idx)
}
function prevSlide() {
  const idx = (currentSlide - 1 + slides.length) % slides.length
  showSlide(idx)
}
function startSlider() {
  sliderInterval = setInterval(nextSlide, 4000)
}
function stopSlider() {
  clearInterval(sliderInterval)
}
if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    stopSlider()
    nextSlide()
    startSlider()
  })
  prevBtn.addEventListener("click", () => {
    stopSlider()
    prevSlide()
    startSlider()
  })
}
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    stopSlider()
    showSlide(i)
    startSlider()
  })
})
if (slides.length) {
  showSlide(0)
  startSlider()
}

// Animate slider elements on load
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slider-anim, .slider-anim-btn, .slider-anim-dot").forEach((el) => {
    el.classList.add("visible")
  })
})

// Scroll-triggered animations
function revealOnScroll() {
  document.querySelectorAll(".slide-up, .fade-in").forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight - 60) {
      el.classList.add("visible")
    }
  })
}
window.addEventListener("scroll", revealOnScroll)
window.addEventListener("DOMContentLoaded", revealOnScroll)

// Contact form animation and reset
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    contactForm.reset()
    contactForm.querySelector(".btn").textContent = "Yuborildi!"
    setTimeout(() => {
      contactForm.querySelector(".btn").textContent = "Yuborish"
    }, 1800)
  })
}

// // Google Sheetsga yuborish uchun
// document.addEventListener('DOMContentLoaded', function() {
//   const form = document.getElementById('lead-form');
//   if (form) {
//     form.addEventListener('submit', function(e) {
//       e.preventDefault();
//       const status = document.getElementById('form-status');
//       status.textContent = "Yuborilmoqda...";
//       const data = new FormData(form);
//       fetch('https://script.google.com/u/0/home/projects/1sXn1utsroEhJ8cxjBXJroVMRjwD674VtBREkzOBlv7fOJ-clcuzTy9rY/settings', {
//         method: 'POST',
//         body: data,
//       })
//       .then(res => {
//         if (res.ok) {
//           status.textContent = "Ma'lumot yuborildi!";
//           form.reset();
//         } else {
//           status.textContent = "Xatolik yuz berdi. Qayta urinib ko‘ring.";
//         }
//       })
//       .catch(() => {
//         status.textContent = "Xatolik yuz berdi. Qayta urinib ko‘ring.";
//       });
//     });
//   }
// });

function animateCurrencyValue(id, newValue) {
  const el = document.getElementById(id)
  if (!el) return
  el.classList.add("animated")
  el.textContent = newValue
  setTimeout(() => el.classList.remove("animated"), 700)
}

// Demo: random kurslarni har 5 soniyada yangilash
function updateCurrencyRates() {
  const usd = 12600 + Math.floor(Math.random() * 200) // 12600-12800
  const cny = 1700 + Math.floor(Math.random() * 80) // 1700-1780
  animateCurrencyValue("usd-rate", usd)
  animateCurrencyValue("cny-rate", cny)
}
setInterval(updateCurrencyRates, 5000)

// Modal ochish va yopish (kalkulyator)
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("calculator-modal")
  const openBtn = document.getElementById("open-calculator")
  const openBtnSidebar = document.getElementById("open-calculator-sidebar")
  const closeBtn = document.getElementById("close-calculator")

  // Headerdagi tugma
  if (modal && openBtn) {
    openBtn.onclick = () => {
      modal.style.display = "flex"
    }
  }
  // Sidebar tugmasi
  if (modal && openBtnSidebar) {
    openBtnSidebar.onclick = () => {
      modal.style.display = "flex"
      // Sidebarni yopish
      const sidebar = document.getElementById("sidebar")
      const sidebarOverlay = document.getElementById("sidebar-overlay")
      if (sidebar) sidebar.classList.remove("active")
      if (sidebarOverlay) sidebarOverlay.classList.remove("active")
      document.body.style.overflow = ""
    }
  }
  // Modalni yopish
  if (modal && closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = "none"
    }
    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none"
    }
  }
})
function getPricePerCube(weightPerCube) {
  if (weightPerCube <= 150) return 90
  if (weightPerCube <= 200) return 110
  if (weightPerCube <= 300) return 140
  if (weightPerCube <= 400) return 190
  if (weightPerCube <= 500) return 210
  if (weightPerCube <= 700) return 240
  if (weightPerCube <= 900) return 270
  if (weightPerCube <= 1000) return 300
  return 0.4 // per kg
}

function nexusFormula(weight, volume) {
  const weightPerCube = weight / volume
  let transportCost = 0

  if (weightPerCube > 1000) {
    transportCost = weight * 0.4
  } else {
    const pricePerCube = getPricePerCube(weightPerCube)
    transportCost = pricePerCube * volume
  }

  const realCub = Math.max(weight / 300, volume)
  let serviceFee = 0

  if (realCub <= 1) serviceFee = 100
  else if (realCub <= 2) serviceFee = 150
  else if (realCub >= 3 && realCub <= 6) serviceFee = 200 + (realCub - 3) * 33.33
  else if (realCub >= 7 && realCub <= 10) serviceFee = 350 + (realCub - 7) * 33.33
  else if (realCub >= 11 && realCub <= 25) serviceFee = 500 + (realCub - 11) * (500 / 14)
  else if (realCub > 25 && realCub <= 40) serviceFee = 800 + (realCub - 25) * 13.33
  else if (realCub > 40) serviceFee = 1000 + (realCub - 40) * 20

  return {
    total: transportCost + serviceFee,
    formula: "Nexus",
  }
}

function zhangFormula(weight, volume, packing) {
  const weightToCub = weight / 300
  const realCub = Math.max(weightToCub, volume)

  const unitPrice = packing === "wood" ? 130 : 105
  const packingCost = realCub * unitPrice

  let workFee = 0
  if (realCub <= 1) workFee = 100
  else if (realCub <= 2) workFee = 150
  else if (realCub >= 3 && realCub <= 6) workFee = 200 + (realCub - 3) * 33.33
  else if (realCub >= 7 && realCub <= 10) workFee = 350 + (realCub - 7) * 33.33
  else if (realCub >= 11 && realCub <= 25) workFee = 500 + (realCub - 11) * (500 / 14)
  else if (realCub > 25 && realCub <= 40) workFee = 800 + (realCub - 25) * 13.33
  else if (realCub > 40) workFee = 1000 + (realCub - 40) * 20

  return {
    total: packingCost + workFee,
    formula: "Zhang",
  }
}

function calculateBestPrice() {
  const weight = Number.parseFloat(document.getElementById("weight").value)
  const volume = Number.parseFloat(document.getElementById("volume").value)
  const packing = document.getElementById("packing").value
  const resultDiv = document.getElementById("result")

  if (isNaN(weight) || isNaN(volume) || weight <= 0 || volume <= 0) {
    resultDiv.innerHTML = "❗ Iltimos, og‘irlik va hajmni to‘g‘ri kiriting."
    return
  }

  const nexus = nexusFormula(weight, volume)
  const zhang = zhangFormula(weight, volume, packing)

  const cheaper = nexus.total < zhang.total ? nexus : zhang

  resultDiv.innerHTML = `
    <strong>Narx: $${cheaper.total.toFixed(2)}</strong><br>
     
    <em>💡 Bu narxlar taxminiy. Xavfli yoki o‘ziga xos yuklar uchun alohida hisob-kitob qilinadi.</em>
  `
}

// Loader
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("site-loader")
    if (loader) {
      loader.style.opacity = "0"
      setTimeout(() => (loader.style.display = "none"), 500)
    }
  }, 900)
})

const serviceData = {
  auto: {
    uz: {
      title: "Avto transporti (Fura)",
      img: "image/services/3.png",
      desc: "Xitoydan O'zbekistonga avto transporti orqali yuklarni tez, xavfsiz va ishonchli tarzda yetkazib beramiz.",
      details: [
        "Yetkazib berish muddati: 20–22 kun",
        "Yo'nalish: Qozog'iston va Qirg'iziston orqali",
        "Real vaqt kuzatuvi va to'liq sug'urta",
        "Fura o'lchami: 13.6m × 2.45m × 2.7m-3",
        "Hajmi: 90–105 m³",
      ],
    },
    en: {
      title: "Road Transport (Truck)",
      img: "image/services/3.png",
      desc: "We provide fast, safe, and reliable road transportation from China to Uzbekistan.",
      details: [
        "Delivery time: 20–22 days",
        "Route: via Kazakhstan and Kyrgyzstan",
        "Real-time tracking & full insurance",
        "Truck size: 13.6m × 2.45m × 2.7m-3",
        "Volume: 90–105 m³",
      ],
    },
  },

  rail: {
    uz: {
      title: "Temir yo'l transporti",
      img: "image/services/2.png",
      desc: "Xitoydan O'zbekistonga temir yo'l orqali iqtisodiy va ishonchli yuk tashish xizmatlarini taqdim etamiz.",
      details: [
        "Yetkazib berish muddati: 18–20 kun",
        "Yo'nalish: Markaziy Osiyo davlatlari orqali",
        "Katta hajmdagi yuklar uchun qulay narx",
        "Yuk hajmi: 1–27 tonna",
        "Sug'urta va bojxona rasmiylashtiruvi",
      ],
    },
    en: {
      title: "Rail Transport",
      img: "image/services/2.png",
      desc: "We provide cost-effective and reliable rail transportation from China to Uzbekistan.",
      details: [
        "Delivery time: 18–20 days",
        "Route: through Central Asian countries",
        "Affordable rates for large volumes",
        "Cargo weight: 1–27 tons",
        "Insurance & customs clearance",
      ],
    },
  },

  air: {
    uz: {
      title: "Havo transporti",
      img: "image/services/1.png",
      desc: "Yuklaringizni eng qisqa vaqtda havo transporti orqali xavfsiz va tezkor yetkazib beramiz.",
      details: [
        "Yetkazib berish muddati: 3–7 kun",
        "Yuk hajmi: 100kg – 30t",
        "Eng tez va ishonchli usul",
        "Har xil samolyot turlari bilan tashish",
        "Sug'urta va kuzatuv imkoniyati",
      ],
    },
    en: {
      title: "Air Transport",
      img: "image/services/1.png",
      desc: "We deliver your cargo quickly and safely by air transport in the shortest possible time.",
      details: [
        "Delivery time: 3–7 days",
        "Cargo weight: 100kg – 30t",
        "Fastest & most reliable option",
        "Various aircraft types available",
        "Insurance & tracking included",
      ],
    },
  },

  declaration: {
    uz: {
      title: "Deklaratsiya xizmatlari",
      img: "image/services/declaration.jpg",
      desc: "Barcha bojxona hujjatlari va rasmiylashtiruv jarayonlarini siz uchun tez va qulay tarzda amalga oshiramiz.",
      details: [
        "Eksport & import deklaratsiya",
        "Professional maslahat va hujjatlar tayyorlash",
        "Bojxona jarayonlarida to'liq ko'mak",
        "Xatoliklarni oldini olish",
        "O'z vaqtida va aniq xizmat",
      ],
    },
    en: {
      title: "Customs Declaration",
      img: "image/services/declaration.jpg",
      desc: "We handle all customs documentation and clearance processes quickly and efficiently for you.",
      details: [
        "Export & import declaration",
        "Professional consulting & paperwork",
        "Full support during customs procedures",
        "Avoiding mistakes in documentation",
        "Timely and accurate service",
      ],
    },
  },

  warehouse: {
    uz: {
      title: "Omborlar",
      img: "image/services/whdul.png",
      desc: "Xitoyning turli shaharlarida joylashgan omborlarimiz orqali yuklaringizni saqlash va jo'natishda qulay sharoit yaratamiz.",
      details: [
        "Yiwu — eng katta savdo markazi",
        "Guangzhou — janubiy Xitoy markazi",
        "Urumqi — Markaziy Osiyoga yaqin",
        "Tezkor yuk qabul qilish va jo'natish",
        "Xavfsiz saqlash sharoitlari",
      ],
    },
    en: {
      title: "Warehouses",
      img: "image/services/whdul.png",
      desc: "We provide convenient storage and shipping solutions through our warehouses located in various cities of China.",
      details: [
        "Yiwu — largest trade hub",
        "Guangzhou — southern China hub",
        "Urumqi — close to Central Asia",
        "Fast cargo handling & dispatch",
        "Safe and secure storage",
      ],
    },
  },
}

const modal = document.getElementById("serviceModal")
const modalTitle = document.getElementById("modalTitle")
const modalImg = document.getElementById("modalImg")
const modalDesc = document.getElementById("modalDesc")
const modalDetails = document.getElementById("modalDetails")
const closeModal = document.querySelector(".close")

const serviceCards = document.querySelectorAll(".service-card")

let currentLang = localStorage.getItem("selectedLang") || "uz"

serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    const serviceKey = card.getAttribute("data-service")
    const data = serviceData[serviceKey]

    modalTitle.textContent = data[currentLang].title
    modalTitle.setAttribute("data-uz", data.uz.title)
    modalTitle.setAttribute("data-en", data.en.title)

    modalImg.src = data[currentLang].img

    modalDesc.textContent = data[currentLang].desc
    modalDesc.setAttribute("data-uz", data.uz.desc)
    modalDesc.setAttribute("data-en", data.en.desc)

    modalDetails.innerHTML = ""
    data[currentLang].details.forEach((item, i) => {
      const li = document.createElement("li")
      li.textContent = data[currentLang].details[i]
      li.setAttribute("data-uz", data.uz.details[i])
      li.setAttribute("data-en", data.en.details[i])
      modalDetails.appendChild(li)
    })

    modal.style.display = "flex"
  })
})

// close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none"
})

// outside click close
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none"
})

function switchLanguage(lang) {
  currentLang = lang
  document.querySelectorAll("[data-uz]").forEach((el) => {
    const text = el.getAttribute(`data-${lang}`)
    if (text) el.textContent = text
  })

  if (modal.style.display === "flex") {
    const openServiceKey = document.querySelector(".service-card:hover")?.getAttribute("data-service")
    if (openServiceKey && serviceData[openServiceKey]) {
      const data = serviceData[openServiceKey]
      modalTitle.textContent = data[currentLang].title
      modalDesc.textContent = data[currentLang].desc

      modalDetails.innerHTML = ""
      data[currentLang].details.forEach((item) => {
        const li = document.createElement("li")
        li.textContent = item
        modalDetails.appendChild(li)
      })
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".lang-btn")
  const translatableElements = document.querySelectorAll("[data-uz][data-en]")

  function setLanguage(lang) {
    currentLang = lang

    translatableElements.forEach((el) => {
      const text = el.getAttribute(`data-${lang}`)
      if (text) el.innerHTML = text
    })

    // Aktiv tugmani belgilash
    langButtons.forEach((btn) => btn.classList.remove("active"))
    const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`)
    if (activeBtn) activeBtn.classList.add("active")

    // Tanlangan tilni saqlash
    localStorage.setItem("selectedLang", lang)

    if (modal && modal.style.display === "flex") {
      // Find which service modal is currently open by checking modal title
      const currentTitle = modalTitle.textContent
      let openServiceKey = null

      // Find the service key by matching the title
      Object.keys(serviceData).forEach((key) => {
        if (serviceData[key].uz.title === currentTitle || serviceData[key].en.title === currentTitle) {
          openServiceKey = key
        }
      })

      if (openServiceKey && serviceData[openServiceKey]) {
        const data = serviceData[openServiceKey]
        modalTitle.textContent = data[currentLang].title
        modalDesc.textContent = data[currentLang].desc

        modalDetails.innerHTML = ""
        data[currentLang].details.forEach((item) => {
          const li = document.createElement("li")
          li.textContent = item
          modalDetails.appendChild(li)
        })
      }
    }
  }

  // Tugma bosilganda tilni o'zgartirish
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang)
    })
  })

  const savedLang = localStorage.getItem("selectedLang") || "uz"
  setLanguage(savedLang)
})

// Yukni kuzatish statusi
async function checkStatus() {
  const container = document.getElementById("container").value.trim()
  const resultDiv = document.getElementById("result")
  try {
    const response = await fetch("http://localhost:5000/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ container }),
    })
    const data = await response.json()
    resultDiv.textContent = data.message || "❌ Ma’lumot topilmadi"
  } catch (err) {
    resultDiv.textContent = "❌ Server bilan aloqa bo‘lmadi"
  }
}

// About section animatsiyasi
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#about")
  const statCards = document.querySelectorAll(".about-why-stat-card")
  if (section && statCards.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("section-visible")
            section.classList.remove("section-hidden")
            statCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("visible")
              }, index * 150)
            })
            observer.unobserve(section)
          }
        })
      },
      { threshold: 0.3 },
    )
    observer.observe(section)
  }
})

// Process section cards animatsiyasi
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".process-card")
  if (cards.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.2 },
    )
    cards.forEach((card) => observer.observe(card))
  }
})

// SIDEBAR (burger menu) funksiyasi
const burger = document.getElementById("burger-menu")
const sidebar = document.getElementById("sidebar")
const sidebarClose = document.getElementById("sidebar-close")
const sidebarOverlay = document.getElementById("sidebar-overlay")

if (burger && sidebar && sidebarClose && sidebarOverlay) {
  burger.addEventListener("click", () => {
    sidebar.classList.add("active")
    sidebarOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
  })
  sidebarClose.addEventListener("click", closeSidebar)
  sidebarOverlay.addEventListener("click", closeSidebar)

  function closeSidebar() {
    sidebar.classList.remove("active")
    sidebarOverlay.classList.remove("active")
    document.body.style.overflow = ""
  }
}

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = {
    kubi: this.kubi.value,
    ogirlik: this.ogirlik.value,
    ism: this.ism.value,
    telefon: this.telefon.value,
  }

  fetch("http://127.0.0.1:5000/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("Ma'lumot yuborildi!")
        this.reset()
      } else {
        alert("Xatolik: " + data.message)
      }
    })
    .catch((err) => alert("Serverga ulanishda xatolik: " + err))
})

const API_KEY = "YOUR_API_KEY_HERE" // bu yerga Google API keyni yozing

async function translateText(text, targetLang) {
  const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      target: targetLang,
    }),
  })
  const data = await res.json()
  return data.data.translations[0].translatedText
}

async function translatePage(lang) {
  const elements = document.querySelectorAll("#title, #desc")

  for (const el of elements) {
    const original = el.getAttribute("data-original") || el.innerText
    el.setAttribute("data-original", original) // asl matnni saqlash

    const translated = await translateText(original, lang)
    el.innerText = translated
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".lang-btn")
  const translatableElements = document.querySelectorAll("[data-uz][data-en]")

  function setLanguage(lang) {
    translatableElements.forEach((el) => {
      const text = el.getAttribute(`data-${lang}`)
      if (text) el.innerHTML = text
    })

    // Aktiv tugmani belgilash
    langButtons.forEach((btn) => btn.classList.remove("active"))
    document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add("active")

    // Tanlangan tilni saqlash
    localStorage.setItem("selectedLang", lang)
  }

  // Tugma bosilganda tilni o‘zgartirish
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang)
    })
  })

  // Oxirgi tanlovni saqlash
  const savedLang = localStorage.getItem("selectedLang") || "uz"
  setLanguage(savedLang)
})

async function translateTexts(to, inputs, from = undefined) {
  const resp = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, from, texts: inputs }),
  })
  const data = await resp.json()
  return data.result.map((r) => r.translated)
}

async function translateHtml(to, htmlString, from = undefined) {
  const resp = await fetch("/api/translate/html", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, from, html: htmlString }),
  })
  const data = await resp.json()
  return data.translatedHtml
}
// Test qilish
;(async () => {
  const translated = await translateTexts("en", ["Salom", "Qalaysiz?"])
  console.log(translated) // ["Hello", "How are you?"]

  const uzHtml = "<h3>Avto transporti</h3><p>Tez yetkazib beramiz</p>"
  const enHtml = await translateHtml("en", uzHtml)
  console.log(enHtml)
})()
