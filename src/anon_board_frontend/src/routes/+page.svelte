<script>
  import { onMount } from 'svelte';
  import { getMessages, postMessage } from '$lib/backend.js';

  let content = '';
  let messages = [];

  // 投稿一覧を取得する
  async function fetchMessages() {
    messages = await getMessages();
  }

  // 新規投稿をICPに送信する
  async function submitMessage() {
    await postMessage(content);
    content = '';
    await fetchMessages(); // 投稿後に投稿一覧を更新
  }

  // ページ読み込み時に投稿一覧を取得
  onMount(fetchMessages);
</script>

<div>
  <h1>AnonBoard（匿名掲示板）</h1>

  <!-- 投稿フォーム -->
  <textarea bind:value={content}></textarea>
  <button on:click={submitMessage}>投稿する</button>

  <!-- 投稿一覧 -->
  <ul>
    {#each messages as message}
      <li>{message.content}（投稿日時: {new Date(Number(message.timestamp) / 1_000_000).toLocaleString()}）</li>
    {/each}
  </ul>
</div>
