// lang-switch.js
async function translateTexts(to, inputs, from = "uz") {
  const resp = await fetch("http://localhost:8080/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, from, texts: inputs }),
  })
  const data = await resp.json()
  return data.translations
}

async function switchLanguage(lang) {
  // Barcha tarjima qilinadigan elementlarni topamiz
  const elements = document.querySelectorAll("[data-uz], [data-en]")

  for (const el of elements) {
    const sourceText = el.getAttribute(`data-uz`)
    const targetText = el.getAttribute(`data-${lang}`)

    // Agar data-lang bor bo'lsa uni ishlatamiz
    if (targetText) {
      el.innerText = targetText
    } else {
      // Agar tayyor tarjima yo'q bo'lsa, backend orqali tarjima qilamiz
      const translated = await translateTexts(lang, [sourceText])
      el.innerText = translated[0]
      el.setAttribute(`data-${lang}`, translated[0]) // keyingi safar saqlab qo'yamiz
    }
  }
}

// Tugmalarga listener qo‘shamiz
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang
    switchLanguage(lang)
  })
})
