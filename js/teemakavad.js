const plans = [
  {
    id: 1,
    title: 'Emotsioonid igapäevaelus',
    description: 'Teemakava, mis aitab õppijatel kirjeldada ja mõista igapäevaseid emotsioone rollimängude ja arutelude kaudu.',
    subject: 'Eesti keel',
    field: 'Emotsionaalsed oskused',
    level: ['A2', 'B1'],
    hours: '3 x 45 minutit',
    focus: ['Kuulamine', 'Rääkimine'],
    author: 'Kaire Kask',
    date: '2024-05-12',
    tags: ['emotsioonid', 'suhtlemine', 'refleksioon'],
  },
  {
    id: 2,
    title: 'Minu kogukond ja kodukoht',
    description: 'Fookuses on kogukonna liikmete rollid ja koostöö. Sisaldab projektipõhist tööd ja välitunde.',
    subject: 'Sotsiaalõpetus',
    field: 'Sotsiaalsed oskused',
    level: ['A1', 'A2'],
    hours: '4 x 45 minutit',
    focus: ['Lugemine', 'Kirjutamine'],
    author: 'Peeter Piht',
    date: '2024-04-28',
    tags: ['kogukond', 'projektõpe', 'koostöö'],
  },
  {
    id: 3,
    title: 'Töömaailma avastamine',
    description: 'Õpilased saavad ülevaate erinevatest ametitest, koostavad töökuulutusi ja harjutavad tööintervjuu dialooge.',
    subject: 'Karjääriõpe',
    field: 'Kognitiivsed oskused',
    level: ['A2'],
    hours: '5 x 45 minutit',
    focus: ['Rääkimine', 'Kirjutamine'],
    author: 'Marika Mets',
    date: '2024-03-18',
    tags: ['töö', 'karjäär', 'enesetutvustus'],
  },
  {
    id: 4,
    title: 'Tervisliku toitumise põhitõed',
    description: 'Teemakava, kus õppijad uurivad toidugruppe, loovad nädalamenüüsid ja valmistavad lihtsaid roogi.',
    subject: 'Tervisõpetus',
    field: 'Praktiline tegevus',
    level: ['A1', 'A2'],
    hours: '6 x 45 minutit',
    focus: ['Lugemine', 'Kuulamine'],
    author: 'Anne Aun',
    date: '2024-02-20',
    tags: ['toitumine', 'praktiline töö', 'eluks vajalikud oskused'],
  },
];

function renderPlans(list) {
  const container = document.getElementById('planList');
  const emptyState = document.getElementById('planNoResults');
  container.innerHTML = '';

  if (!list.length) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  list.forEach(plan => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-gray-100';
    card.innerHTML = `
      <h2 class="text-lg font-normal text-[#5d0f57]">${plan.title}</h2>
      <p class="text-gray-600 text-sm">${plan.description}</p>
      <div class="space-y-2 text-xs text-gray-500">
        <div class="flex flex-wrap gap-2">
          <span class="bg-gray-100 rounded px-2 py-0.5">${plan.subject}</span>
          <span class="bg-indigo-50 text-indigo-700 rounded px-2 py-0.5">${plan.field}</span>
          <span class="bg-green-50 text-green-700 rounded px-2 py-0.5">${plan.hours}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          ${plan.level.map(level => `<span class="bg-purple-50 text-purple-700 rounded px-2 py-0.5">${level}</span>`).join(' ')}
        </div>
        <div class="flex flex-wrap gap-2">
          ${plan.focus.map(item => `<span class="bg-blue-50 text-blue-700 rounded px-2 py-0.5">${item}</span>`).join(' ')}
        </div>
        <div class="flex flex-wrap gap-2">
          ${plan.tags.map(tag => `<span class="bg-gray-200 text-gray-700 rounded px-2 py-0.5">#${tag}</span>`).join(' ')}
        </div>
      </div>
      <div class="text-xs text-gray-400">Viimati uuendatud: ${plan.date} · Autor: ${plan.author}</div>
      <a href="teemakava-sample.html?id=${plan.id}"
        class="mt-2 w-full bg-[#611e59] hover:bg-[#7a2671] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a2671] text-white font-normal py-2 px-4 rounded transition block text-center cursor-pointer">Vaata teemakava</a>
    `;
    container.appendChild(card);
  });
}

function filterPlans(list, term) {
  if (!term) {
    return [...list];
  }

  const query = term.toLowerCase();

  return list.filter(plan => {
    const haystack = [
      plan.title,
      plan.description,
      plan.subject,
      plan.field,
      plan.level.join(' '),
      plan.focus.join(' '),
      plan.tags.join(' '),
    ].join(' ').toLowerCase();

    return haystack.includes(query);
  });
}

function sortPlans(list, sort) {
  const sorted = [...list];

  switch (sort) {
    case 'date-asc':
      sorted.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case 'title-asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'date-desc':
    default:
      sorted.sort((a, b) => b.date.localeCompare(a.date));
      break;
  }

  return sorted;
}

function updatePlanList() {
  const searchInput = document.getElementById('planSearchInput');
  const sortSelect = document.getElementById('planSortSelect');
  const term = searchInput.value.trim();
  const sort = sortSelect.value;
  const filtered = filterPlans(plans, term);
  const sorted = sortPlans(filtered, sort);

  renderPlans(sorted);
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('planSearchInput');
  const searchButton = document.getElementById('planSearchButton');
  const sortSelect = document.getElementById('planSortSelect');

  searchInput.addEventListener('input', updatePlanList);
  searchButton.addEventListener('click', updatePlanList);
  sortSelect.addEventListener('change', updatePlanList);
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updatePlanList();
    }
  });

  updatePlanList();
});
