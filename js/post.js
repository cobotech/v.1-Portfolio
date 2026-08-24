// ブログ記事詳細ページ(post.html)専用の表示ロジック

async function renderPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const container = document.getElementById("post-container");

  if (!slug) {
    container.innerHTML = `<p class="empty-state">記事が指定されていません。<a href="blog.html">記事一覧に戻る</a></p>`;
    return;
  }

  const posts = await loadJSON("data/posts.json");
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    container.innerHTML = `<p class="empty-state">記事が見つかりませんでした。<a href="blog.html">記事一覧に戻る</a></p>`;
    return;
  }

  document.title = `${post.title} | cobotech portfolio`;
  document.getElementById("post-date").textContent = formatDateJP(post.date);
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-tags").innerHTML = post.tags
    .map((t) => `<li>${escapeHtml(t)}</li>`)
    .join("");

  const res = await fetch(post.file);
  const markdown = await res.text();
  document.getElementById("post-body").innerHTML = marked.parse(markdown);
}

document.addEventListener("DOMContentLoaded", renderPost);
