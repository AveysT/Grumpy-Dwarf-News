const issues = [
    {
        id: 1,
        date: "November 19, 2025",
        vol: "Vol. 1, No. 1",
        lead: {
            tag: "Breaking News",
            headline: "Dragon Spotted Near The Northern Peaks",
            subhead: "Local villagers report smoke and tremors; King's Guard dispatched to investigate.",
            author: "Sir Alistair Penwright",
            body: `<p><span class="drop-cap">T</span>he quiet village of Oakhaven was thrown into chaos early this morning when a shadow, described by witnesses as "large enough to blot out the sun," passed over the market square. While skeptics claim it was merely a storm cloud, the scorched earth found near the northern ridge suggests otherwise.</p>
                   <p>"I saw it with my own eyes," claimed Martha, a local baker. "Scales as red as rubies and eyes like burning coals. It took three of my best sheep!"</p>
                   <p>The King's Guard has been alerted and a detachment is expected to arrive by sundown. Citizens are advised to stay indoors and keep water buckets handy.</p>`
        },
        sidebar: [
            { type: 'weather', title: 'Weather', content: `<p><strong>Today:</strong> Overcast, chance of dragon fire.</p><p><strong>Tomorrow:</strong> Sunny with a high of 22°C.</p>` },
            { type: 'wanted', title: 'WANTED', content: `<p class="wanted-name">"Slippery" Pete</p><p>For crimes against poultry.</p><p class="reward">Reward: 50 Silver</p>` }
        ],
        secondary: [
            { title: "New Potion Shop Opens", content: "The \"Bubbling Cauldron\" offers discounts on healing salves this week." },
            { title: "Tournament Announced", content: "Knights from across the realm gather for the Grand Melee next Sunday." },
            { title: "Lost Cat", content: "Answers to \"Mr. Whiskers\". May be invisible. Please check your pockets." }
        ]
    },
    {
        id: 2,
        date: "November 20, 2025",
        vol: "Vol. 1, No. 2",
        lead: {
            tag: "Politics",
            headline: "King Announces Tax on Magic Items",
            subhead: "Wizards Guild threatens strike; potion prices expected to soar.",
            author: "Lady Elara Vane",
            body: `<p><span class="drop-cap">I</span>n a controversial move today, King Theobald III decreed a 15% tariff on all enchanted goods, citing the need to fund the repair of the Northern Watchtower.</p>
                   <p>The Wizards Guild has formally protested, stating that this will unfairly impact the working-class mage. "We provide a service," said Grand Wizard Merlinus. "We shouldn't be taxed for our mana."</p>
                   <p>Merchants are already hoarding wands and crystals in anticipation of the price hike.</p>`
        },
        sidebar: [
            { type: 'weather', title: 'Weather', content: `<p><strong>Today:</strong> Clear skies, perfect for flying.</p><p><strong>Tomorrow:</strong> Heavy rain expected in the capital.</p>` },
            { type: 'ad', title: 'For Sale', content: `<p>Used Flying Carpet. Slight moth damage. 200 Gold. Ask for Aladdin.</p>` }
        ],
        secondary: [
            { title: "Goblin Strike Ends", content: "The miners have returned to work after securing better pickaxes." },
            { title: "Mystery Lights", content: "Strange lights seen over the swamp. Probably just swamp gas." },
            { title: "Recipe Corner", content: "How to cook a cockatrice without turning to stone." }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const issueList = document.getElementById('issue-list');

    // Render Newsstand
    issues.forEach(issue => {
        const item = document.createElement('div');
        item.className = 'issue-preview';
        item.dataset.id = issue.id;
        item.innerHTML = `
            <div class="preview-header">
                <span class="preview-date">${issue.date}</span>
            </div>
            <div class="preview-headline">${issue.lead.headline}</div>
        `;
        item.addEventListener('click', () => loadIssue(issue.id));
        issueList.appendChild(item);
    });

    // Load latest issue by default
    loadIssue(issues[0].id);
});

function loadIssue(id) {
    const issue = issues.find(i => i.id === id);
    if (!issue) return;

    // Update Active State in Newsstand
    document.querySelectorAll('.issue-preview').forEach(el => {
        el.classList.remove('active');
        if (parseInt(el.dataset.id) === id) {
            el.classList.add('active');
        }
    });

    // Update Paper Content
    document.getElementById('paper-vol').textContent = issue.vol;
    document.getElementById('paper-date').textContent = issue.date;

    document.getElementById('lead-tag').textContent = issue.lead.tag;
    document.getElementById('lead-headline').textContent = issue.lead.headline;
    document.getElementById('lead-subhead').textContent = issue.lead.subhead;
    document.getElementById('lead-author').textContent = issue.lead.author;
    document.getElementById('lead-body').innerHTML = issue.lead.body;

    // Update Sidebar
    const sidebar = document.getElementById('sidebar-content');
    sidebar.innerHTML = '';
    issue.sidebar.forEach(widget => {
        const div = document.createElement('div');
        div.className = `widget ${widget.type}-widget`;
        div.innerHTML = `<h3>${widget.title}</h3><div class="widget-content">${widget.content}</div>`;
        if (widget.type === 'wanted') {
            div.className += ' wanted-poster'; // Re-apply special class
            // Fix structure for wanted poster to match CSS if needed, or adjust CSS. 
            // The current CSS expects specific structure for wanted poster.
            // Let's just dump content for now as it contains the structure.
            div.innerHTML = `<h3>${widget.title}</h3>${widget.content}`;
        }
        sidebar.appendChild(div);

        const hr = document.createElement('hr');
        hr.className = 'divider';
        sidebar.appendChild(hr);
    });
    // Remove last divider
    if (sidebar.lastChild) sidebar.removeChild(sidebar.lastChild);

    // Update Secondary Stories
    const secondary = document.getElementById('secondary-stories');
    secondary.innerHTML = '';
    issue.secondary.forEach(story => {
        const article = document.createElement('article');
        article.className = 'story-card';
        article.innerHTML = `<h3>${story.title}</h3><p>${story.content}</p>`;
        secondary.appendChild(article);
    });
}
