<script>
  import { onMount } from 'svelte';
  import { getMessages, postMessage } from '$lib/backend.js';

  let content = '';
  let messages = [];
  let sortOrder = 'newest'; // 並び替え初期値（新しい順）

  async function fetchMessages() {
    messages = await getMessages();
    sortMessages();
  }

  async function submitMessage() {
    if (!content.trim()) {
      alert('投稿内容を入力してください。');
      return;
    }
    await postMessage(content);
    content = '';
    await fetchMessages();
  }

  function sortMessages() {
    messages = [...messages].sort((a, b) => {
      return sortOrder === 'newest'
        ? Number(b.timestamp) - Number(a.timestamp)
        : Number(a.timestamp) - Number(b.timestamp);
    });
  }

   // 並び替え順序の切り替え
   function toggleSortOrder() {
    sortOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
    sortMessages();
  }

  onMount(fetchMessages);
</script>

<div class="container">
  <header>
    <h1>📢 AnonBoard（匿名掲示板）</h1>
  </header>

  <section class="form-section">
    <textarea bind:value={content} placeholder="匿名でメッセージを書いてみよう"></textarea>
    <button on:click={submitMessage}>投稿する</button>
  </section>

  <section class="sort-section">
    <button on:click={toggleSortOrder}>
      {sortOrder === 'newest' ? '🔼 古い順に表示' : '🔽 新しい順に表示'}
    </button>
  </section>

  <section class="messages-section">
    {#each messages as message (message.id)}
      <div class="message-card">
        <p class="message-content">{message.content}</p>
        <div class="message-date">{new Date(Number(message.timestamp) / 1_000_000).toLocaleString()}</div>
      </div>
    {/each}
  </section>
</div>

<style>
  .container {
    max-width: 700px;
    margin: 30px auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9fafb;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  }

  header {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .form-section {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  }

  textarea {
    width: 100%;
    height: 90px;
    padding: 12px;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    resize: vertical;
  }

  button {
    padding: 10px 20px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #2563eb;
  }

  .messages-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .message-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  }

  .message-content {
    margin: 0;
    font-size: 16px;
    color: #111827;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .message-date {
    font-size: 12px;
    color: #6b7280;
    margin-top: 8px;
    text-align: right;
  }

  .sort-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.sort-section button {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sort-section button:hover {
  background-color: #059669;
}

</style>
