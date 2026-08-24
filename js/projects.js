// プロジェクト一覧ページ(projects.html)専用の表示ロジック

async function renderAllProjects() {
  const projects = await loadJSON("data/projects.json");
  const grid = document.getElementById("project-grid");

  if (projects.length === 0) {
    grid.innerHTML = `<p class="empty-state">まだプロジェクトがありません。</p>`;
    return;
  }

  grid.innerHTML = projects
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

document.addEventListener("DOMContentLoaded", renderAllProjects);
