<script>
  let content = "";
  let messages = [];

  async function fetchMessages() {
    // Canistersから取得するコード（後ほど）
  }

  async function postMessage() {
    // Canistersへ投稿するコード（後ほど）
  }
</script>

<div>
  <h1>AnonBoard（匿名掲示板）</h1>

  <!-- 投稿フォーム -->
  <textarea bind:value={content}></textarea>
  <button on:click={postMessage}>投稿する</button>

  <!-- 投稿一覧 -->
  <ul>
    {#each messages as message}
      <li>{message.content}（投稿日時: {new Date(message.timestamp / 1_000_000).toLocaleString()}）</li>
    {/each}
  </ul>
</div>
