// ── CROP DATA ──────────────────────────────────────────────────────────────
const CROPS = [
    { name: "Bok Choy",        category: "Leafy Greens", water: "1–1.5 in/wk",  ph: "6.0–7.5", sunlight: "6 hrs partial",    temp: "55–75°F" },
    { name: "Brussel Sprouts", category: "Leafy Greens", water: "1–2 in/wk",    ph: "6.0–7.5", sunlight: "6–8 hrs",          temp: "50–70°F" },
    { name: "Cabbage",         category: "Leafy Greens", water: "1–2 in/wk",    ph: "6.0–7.0", sunlight: "6–8 hrs",          temp: "60–65°F" },
    { name: "Celery",          category: "Leafy Greens", water: "1–2 in/wk",    ph: "6.0–6.5", sunlight: "6–8 hrs",          temp: "60–70°F" },
    { name: "Collard Greens",  category: "Leafy Greens", water: "1–1.5 in/wk",  ph: "5.5–6.8", sunlight: "6–8 hrs",          temp: "60–70°F" },
    { name: "Endives",         category: "Leafy Greens", water: "1–1.5 in/wk",  ph: "6.5–7.8", sunlight: "6 hrs",            temp: "45–75°F" },
    { name: "Green Onions",    category: "Leafy Greens", water: "1 in/wk",      ph: "5.5–6.8", sunlight: "6–8 hrs",          temp: "55–75°F" },
    { name: "Kale",            category: "Leafy Greens", water: "1–1.5 in/wk",  ph: "6.0–7.5", sunlight: "6–8 hrs partial",  temp: "25–75°F" },
    { name: "Leek",            category: "Leafy Greens", water: "1 in/wk",      ph: "6.0–7.0", sunlight: "6 hrs partial",    temp: "55–75°F" },
    { name: "Lettuce",         category: "Leafy Greens", water: "1 in/wk",      ph: "6.0–7.0", sunlight: "4–6 hrs full",     temp: "30–90°F" },
    { name: "Mustard",         category: "Leafy Greens", water: "1 in/wk",      ph: "7.2–7.6", sunlight: "8 hrs",            temp: "50–75°F" },
    { name: "Spinach",         category: "Leafy Greens", water: "1–2 in/wk",    ph: "6.0–7.5", sunlight: "4–6 hrs",          temp: "45–75°F" },
    { name: "Swiss Chard",     category: "Leafy Greens", water: "1–2 in/wk",    ph: "7.5–8.0", sunlight: "6 hrs full",       temp: "30–90°F" },
    { name: "Bell Peppers",    category: "Vegetables",   water: "1–2 in/wk",    ph: "6.0–6.8", sunlight: "6–8 hrs",          temp: "70–85°F" },
    { name: "Broccoli",        category: "Vegetables",   water: "3–4 in/wk",    ph: "6.0–7.0", sunlight: "6 hrs",            temp: "65–80°F" },
    { name: "Carrots",         category: "Vegetables",   water: "1 in/wk",      ph: "6.0–6.8", sunlight: "6 hrs",            temp: "55–75°F" },
    { name: "Cauliflower",     category: "Vegetables",   water: "1 in/wk",      ph: "6.0–7.5", sunlight: "6–8 hrs",          temp: "60–75°F" },
    { name: "Garlic",          category: "Vegetables",   water: "1 in/wk",      ph: "6.0–7.0", sunlight: "6–8 hrs",          temp: "40°F" },
    { name: "Kohlrabi",        category: "Vegetables",   water: "1–1.5 in/wk",  ph: "6.0–6.8", sunlight: "6 hrs",            temp: "70–80°F" },
    { name: "Onions",          category: "Vegetables",   water: "1 in/wk",      ph: "6.2–6.8", sunlight: "6–8 hrs",          temp: "70–85°F" },
    { name: "Parsnips",        category: "Vegetables",   water: "1 in/wk",      ph: "6.0–6.8", sunlight: "6 hrs shaded",     temp: "45–70°F" },
    { name: "Peas",            category: "Vegetables",   water: "1 in/wk",      ph: "5.5–7.5", sunlight: "6 hrs shaded",     temp: "54–65°F" },
    { name: "Radishes",        category: "Vegetables",   water: "1 in/wk",      ph: "6.0–7.0", sunlight: "6 hrs shaded",     temp: "50–70°F" },
    { name: "Rutabagas",       category: "Vegetables",   water: "1–1.5 in/wk",  ph: "6.0–7.5", sunlight: "6 hrs shaded",     temp: "60–70°F" },
    { name: "Tomatoes",        category: "Vegetables",   water: "3–4 in/wk",    ph: "6.0–6.8", sunlight: "6 hrs full",       temp: "50–90°F" },
    { name: "Turnip",          category: "Vegetables",   water: "1 in/wk",      ph: "6.0–7.5", sunlight: "6 hrs shaded",     temp: "45–75°F" },
  ];
  
  // ── State ──────────────────────────────────────────────────────────────────
  let activeFilter = "all";
  let searchQuery  = "";
  let sortCol      = null;
  let sortAsc      = true;
  
  // ── Render ─────────────────────────────────────────────────────────────────
  function render() {
    const data = CROPS
      .filter(c => {
        const matchCat    = activeFilter === "all" || c.category === activeFilter;
        const matchSearch = !searchQuery || Object.values(c).some(v =>
          v.toLowerCase().includes(searchQuery)
        );
        return matchCat && matchSearch;
      })
      .sort((a, b) => {
        if (!sortCol) return 0;
        const av = a[sortCol].toLowerCase();
        const bv = b[sortCol].toLowerCase();
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  
    const tbody = document.getElementById("cropBody");
    const noRes = document.getElementById("noResults");
  
    if (!data.length) {
      tbody.innerHTML = "";
      noRes.style.display = "block";
      return;
    }
  
    noRes.style.display = "none";
    tbody.innerHTML = data.map(c => {
      const cls = c.category.toLowerCase().replace(/\s+/g, "-");
      return `<tr>
        <td>${c.name}</td>
        <td><span class="tag tag-${cls}">${c.category}</span></td>
        <td>${c.water}</td>
        <td>${c.ph}</td>
        <td>${c.sunlight}</td>
        <td>${c.temp}</td>
      </tr>`;
    }).join("");
  }
  
  // ── Init ───────────────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
  
    document.getElementById("cropSearch").addEventListener("input", e => {
      searchQuery = e.target.value.trim().toLowerCase();
      render();
    });
  
    document.getElementById("filterPills").addEventListener("click", e => {
      const pill = e.target.closest(".pill");
      if (!pill) return;
      document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeFilter = pill.dataset.filter;
      render();
    });
  
    document.querySelectorAll(".crop-table th[data-col]").forEach(th => {
      th.addEventListener("click", () => {
        const col = th.dataset.col;
        sortAsc = sortCol === col ? !sortAsc : true;
        sortCol = col;
        document.querySelectorAll(".crop-table th").forEach(h => {
          h.classList.remove("sorted");
          h.querySelector(".sort-icon").textContent = "↕";
        });
        th.classList.add("sorted");
        th.querySelector(".sort-icon").textContent = sortAsc ? "↑" : "↓";
        render();
      });
    });
  
    render();
  });