// ブログ記事一覧ページ(blog.html)専用の表示ロジック

async function renderPostList() {
  const posts = await loadJSON("data/posts.json");
  const list = document.getElementById("post-list");

  if (posts.length === 0) {
    list.innerHTML = `<p class="empty-state">まだ記事がありません。</p>`;
    return;
  }

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  list.innerHTML = sorted
    .map(
      (p) => `
      <li>
        <a href="post.html?slug=${encodeURIComponent(p.slug)}">
          <div class="post-date">${formatDateJP(p.date)}</div>
          <div class="post-title">${escapeHtml(p.title)}</div>
          <p class="post-excerpt">${escapeHtml(p.excerpt)}</p>
          <ul class="tag-list">
            ${p.tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}
          </ul>
        </a>
      </li>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", renderPostList);
