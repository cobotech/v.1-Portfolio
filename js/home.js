// トップページ(index.html)専用の表示ロジック

async function renderProfile() {
  const profile = await loadJSON("data/profile.json");

  document.getElementById("hero-avatar").textContent = profile.avatarInitial;
  document.getElementById("hero-name").textContent = profile.name;
  document.getElementById("hero-title").textContent = profile.title;
  document.getElementById("hero-bio").textContent = profile.bio;

  const links = document.getElementById("social-links");
  links.innerHTML = "";
  if (profile.links.github) {
    links.innerHTML += `<a href="${profile.links.github}" target="_blank" rel="noopener">GitHub</a>`;
  }
  if (profile.links.twitter) {
    links.innerHTML += `<a href="${profile.links.twitter}" target="_blank" rel="noopener">X (Twitter)</a>`;
  }
  if (profile.links.email) {
    links.innerHTML += `<a href="${profile.links.email}">Email</a>`;
  }

  const skillList = document.getElementById("skill-list");
  skillList.innerHTML = profile.skills
    .map((s) => {
      const icon = s.icon
        ? `<i class="${s.icon}"></i>`
        : `<span class="skill-icon-fallback">${escapeHtml(s.iconText)}</span>`;
      return `
      <li>
        ${icon}
        <span class="skill-name">${escapeHtml(s.name)}</span>
      </li>`;
    })
    .join("");
}

async function renderCareer() {
  const career = await loadJSON("data/career.json");
  const timeline = document.getElementById("career-timeline");

  if (career.length === 0) {
    timeline.innerHTML = `<p class="empty-state">まだ経歴がありません。</p>`;
    return;
  }

  timeline.innerHTML = career
    .map(
      (item) => `
      <li>
        <div class="period">${escapeHtml(item.period)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </li>`
    )
    .join("");
}

async function renderFeaturedProjects() {
  const projects = await loadJSON("data/projects.json");
  const grid = document.getElementById("featured-projects");

  if (projects.length === 0) {
    grid.innerHTML = `<p class="empty-state">まだプロジェクトがありません。</p>`;
    return;
  }

  grid.innerHTML = projects
    .slice(0, 3)
    .map(
      (p) => `
      <div class="card">
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <ul class="tag-list">
          ${p.tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}
        </ul>
        <div class="card-links">
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Demo</a>` : ""}
          ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">Code</a>` : ""}
        </div>
      </div>`
    )
    .join("");
}

async function renderLatestPosts() {
  const posts = await loadJSON("data/posts.json");
  const list = document.getElementById("latest-posts");

  if (posts.length === 0) {
    list.innerHTML = `<p class="empty-state">まだ記事がありません。</p>`;
    return;
  }

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  list.innerHTML = sorted
    .slice(0, 3)
    .map(
      (p) => `
      <li>
        <a href="post.html?slug=${encodeURIComponent(p.slug)}">
          <div class="post-date">${formatDateJP(p.date)}</div>
          <div class="post-title">${escapeHtml(p.title)}</div>
          <p class="post-excerpt">${escapeHtml(p.excerpt)}</p>
        </a>
      </li>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderCareer();
  renderFeaturedProjects();
  renderLatestPosts();
});
