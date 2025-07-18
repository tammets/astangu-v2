// Example resource data
const resources = [
  {
    id: 1,
    title: 'Riik ja sümboolika: Eesti lipp',
    description: 'Õppematerjal Eesti riigi sümbolite tutvustamiseks. Sisaldab rühmatööd ja mängulisi tegevusi.',
    teema: 'Riik ja sümboolika',
    keeleaste: ['A1', 'A2'],
    osaoskus: ['Kuulamine', 'Rääkimine'],
    keeleopiv: 'Õpilane oskab nimetada Eesti sümboleid',
    teemaopiv: 'Õpilane tunneb Eesti lippu',
    tegevus: ['Rühmatöö', 'Mäng'],
    autor: 'Mari Maasikas',
    date: '2024-05-01',
    tags: ['Eesti', 'sümbolid', 'lipp'],
    tunniosa: ['Uue materjali tutvustamine', 'Harjutamine'],
  },
  {
    id: 2,
    title: 'Pere ja suhted: Minu perekond',
    description: 'Individuaaltöö pere liikmete nimetuste õppimiseks. Sisaldab kirjutamisülesandeid.',
    teema: 'Pere ja suhted',
    keeleaste: ['Eel-A1', 'A1'],
    osaoskus: ['Kirjutamine', 'Lugemine'],
    keeleopiv: 'Õpilane oskab kirjutada oma perekonnaliikmete nimed',
    teemaopiv: 'Õpilane mõistab perekonna mõistet',
    tegevus: ['Individuaaltöö'],
    autor: 'Jüri Kask',
    date: '2024-04-15',
    tags: ['pere', 'kirjutamine'],
    tunniosa: ['Harjutamine', 'Kinnistamine'],
  },
  {
    id: 3,
    title: 'Töö ja ametid: Ametite bingo',
    description: 'Mänguline rühmatöö erinevate ametite õppimiseks. Sisaldab kuulamis- ja rääkimisülesandeid.',
    teema: 'Töö ja ametid',
    keeleaste: ['A2', 'B1'],
    osaoskus: ['Kuulamine', 'Rääkimine'],
    keeleopiv: 'Õpilane oskab nimetada erinevaid ameteid',
    teemaopiv: 'Õpilane oskab kirjeldada tööülesandeid',
    tegevus: ['Rühmatöö', 'Mäng'],
    autor: 'Liis Lepik',
    date: '2024-03-20',
    tags: ['ametid', 'bingo', 'mäng'],
    tunniosa: ['Häälestamine', 'Uue materjali tutvustamine'],
  },
  // Add more resources as needed
];

function renderResources(list) {
  const container = document.getElementById('resourceList');
  const noResults = document.getElementById('noResults');
  container.innerHTML = '';
  if (!list.length) {
    noResults.classList.remove('hidden');
    return;
  } else {
    noResults.classList.add('hidden');
  }
  list.forEach(res => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-gray-100';
    card.innerHTML = `
      <h2 class="text-lg font-semibold text-gray-900">${res.title}</h2>
      <p class="text-gray-600 text-sm mb-2">${res.description}</p>
      <div class="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
        <span class="bg-gray-100 rounded px-2 py-0.5">${res.teema}</span>
        ${res.keeleaste.map(k => `<span class="bg-indigo-50 text-indigo-700 rounded px-2 py-0.5">${k}</span>`).join(' ')}
        ${res.osaoskus.map(o => `<span class="bg-green-50 text-green-700 rounded px-2 py-0.5">${o}</span>`).join(' ')}
        ${res.tegevus.map(t => `<span class="bg-yellow-50 text-yellow-700 rounded px-2 py-0.5">${t}</span>`).join(' ')}
        ${res.tags.map(t => `<span class="bg-gray-200 text-gray-700 rounded px-2 py-0.5">#${t}</span>`).join(' ')}
      </div>
      <div class="text-xs text-gray-400">${res.date} &middot; ${res.autor}</div>
      <button class="mt-2 w-fit rounded bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition">Vaata lähemalt</button>
    `;
    container.appendChild(card);
  });
}

function getFilterValues(form) {
  const data = new FormData(form);
  // Multi-checkboxes
  const keeleaste = data.getAll('keeleaste');
  const osaoskus = data.getAll('osaoskus');
  const tegevus = data.getAll('tegevus');
  const tunniosa = data.getAll('tunniosa');
  // Only keep the remaining fields
  return {
    teema: data.get('teema') || '',
    keeleaste,
    osaoskus,
    tegevus,
    tunniosa,
  };
}

function filterResources(resources, filters, search) {
  return resources.filter(res => {
    // Search (search all fields for now)
    if (search) {
      const haystack = [
        res.title,
        res.description,
        res.teema,
        res.keeleaste.join(' '),
        res.osaoskus.join(' '),
        res.tegevus.join(' '),
        res.tunniosa.join(' '),
      ].join(' ').toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    // Teema
    if (filters.teema && res.teema !== filters.teema) return false;
    // Keeleaste
    if (filters.keeleaste.length && !filters.keeleaste.some(k => res.keeleaste.includes(k))) return false;
    // Osaoskus
    if (filters.osaoskus.length && !filters.osaoskus.some(o => res.osaoskus.includes(o))) return false;
    // Õppetegevuse tüüp
    if (filters.tegevus.length && !filters.tegevus.some(t => res.tegevus.includes(t))) return false;
    // Tunni osa
    if (filters.tunniosa.length && !filters.tunniosa.some(t => res.tunniosa.includes(t))) return false;
    return true;
  });
}

function sortResources(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case 'date-desc':
      sorted.sort((a, b) => b.date.localeCompare(a.date));
      break;
    case 'date-asc':
      sorted.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case 'title-asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'author-asc':
      sorted.sort((a, b) => a.autor.localeCompare(b.autor));
      break;
    case 'author-desc':
      sorted.sort((a, b) => b.autor.localeCompare(a.autor));
      break;
  }
  return sorted;
}

function updateResourceList() {
  const form = document.getElementById('filterForm');
  const filters = getFilterValues(form);
  const search = document.getElementById('searchInput').value.trim().toLowerCase();
  const sort = document.getElementById('sortSelect').value;
  let filtered = filterResources(resources, filters, search);
  filtered = sortResources(filtered, sort);
  renderResources(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  renderResources(resources);
  document.getElementById('filterForm').addEventListener('change', updateResourceList);
  document.getElementById('searchInput').addEventListener('input', updateResourceList);
  document.getElementById('sortSelect').addEventListener('change', updateResourceList);
  document.getElementById('resetFilters').addEventListener('click', () => {
    document.getElementById('filterForm').reset();
    updateResourceList();
  });
}); 