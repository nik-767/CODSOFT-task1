// Modern portfolio JS
document.addEventListener('DOMContentLoaded', function () {
    setupNav();
    renderSkills();
    fetchAndRenderRepos();
    // CALL THE MODIFIED FUNCTION TO RENDER AUTOMATICALLY
    setupAchievements(); 
    enableSmoothScroll();
});

function setupNav(){
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if(!toggle || !nav) return;
    toggle.addEventListener('click', function(){
        nav.classList.toggle('mobile');
    });
}

function enableSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
        a.addEventListener('click', function(e){
            var href = a.getAttribute('href');
            if(href && href.startsWith('#')){
                var el = document.querySelector(href);
                if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); if(document.getElementById('site-nav').classList.contains('mobile')) document.getElementById('site-nav').classList.remove('mobile'); }
            }
        });
    });
}

function renderSkills(){
    var skills = ['HTML','CSS','JavaScript','React','Git','Responsive Design', 'GenrativeAI'];
    var container = document.getElementById('skills-list');
    if(!container) return;
    container.innerHTML = '';
    skills.forEach(function(s){
        var el = document.createElement('div'); el.className='skill-pill'; el.textContent = s; container.appendChild(el);
    });
}

function fetchAndRenderRepos(){
    var grid = document.getElementById('projects-grid');
    if(!grid) return;
    grid.textContent = 'Loading projects...';
    fetch('https://api.github.com/users/nik-767/repos?per_page=100')
        .then(function(res){ if(!res.ok) throw new Error('GitHub API: '+res.status); return res.json(); })
        .then(function(repos){ renderRepos(repos); })
        .catch(function(err){ grid.textContent = 'Could not load projects: '+err.message; });
}

function renderRepos(repos){
    var grid = document.getElementById('projects-grid');
    if(!grid) return;
    if(!Array.isArray(repos) || repos.length===0){ grid.textContent='No public repositories found.'; return; }
    repos.sort(function(a,b){ return new Date(b.pushed_at)-new Date(a.pushed_at); });
    grid.innerHTML = '';
    repos.forEach(function(r){
        var card = document.createElement('article'); card.className='project-card';
        var title = document.createElement('h3');
        var a = document.createElement('a'); a.href = r.html_url; a.target = '_blank'; a.rel='noopener noreferrer'; a.textContent = r.name;
        title.appendChild(a);
        var p = document.createElement('p'); p.textContent = r.description || '';
        var meta = document.createElement('div'); meta.className='project-meta';
        if(r.language){ var lang = document.createElement('span'); lang.className='tag'; lang.textContent = r.language; meta.appendChild(lang); }
        var pushed = document.createElement('span'); pushed.className='muted'; pushed.textContent = 'Updated '+new Date(r.pushed_at).toLocaleDateString(); meta.appendChild(pushed);
        card.appendChild(title); card.appendChild(p); card.appendChild(meta); grid.appendChild(card);
    });
}

function renderAchievements(arr, out) {
    if(!Array.isArray(arr) || arr.length === 0){ out.textContent='No achievements loaded.'; return; }
    out.innerHTML='';
    arr.forEach(function(a){ 
        var el = document.createElement('div'); el.className='achievement-item'; 
        var title = a.title||a.name||'Untitled'; 
        var issuer = a.issuer?(' — '+a.issuer):''; 
        var year = a.year?(' ('+a.year+')'):''; 
        el.innerHTML = '<strong>'+title+'</strong>'+issuer+year + (a.link?(' — <a href="'+a.link+'" target="_blank" rel="noopener noreferrer">link</a>'):''); 
        out.appendChild(el); 
    });
}

function setupAchievements(){
    var input = document.getElementById('achievements-input');
    var btn = document.getElementById('load-achievements');
    var out = document.getElementById('achievements-list');
    if(!out) return;

    // Default Achievements Data (Hardcoded to render automatically)
    var defaultAchievements = [
        {"title": "4 weeks of a virtual internship program in Web Development", "issuer": "CodSoft", "year": "2025"},
        {"title": "Generative AI Mastermind", "issuer": "Outskill", "year": "2025"},
        {"title": "5 Day Live Workshop on JavaScript", "issuer": "Code Easy", "year": "2025"},
        {"title": "Gen AI Academy – Google Cloud Skills Boost", "issuer": "Google Cloud", "year": "2025"},
        {"title": "Introduction to Figma", "issuer": "Simplilearn", "year": "2025"}
    ];
    
    // Render the default data on page load
    renderAchievements(defaultAchievements, out);

    // Keep the manual loading functionality in case the user pastes something new
    if(btn && input){
        btn.addEventListener('click', function(){
            var txt = input.value.trim(); if(!txt){ out.textContent='No achievements provided.'; return; }
            try{
                var arr = JSON.parse(txt); if(!Array.isArray(arr)) throw new Error('JSON must be an array');
                renderAchievements(arr, out);
            }catch(e){ out.textContent = 'Could not parse JSON: '+e.message; }
        });
    }
}
