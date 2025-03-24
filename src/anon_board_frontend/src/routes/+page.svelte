<script>
  import { onMount } from 'svelte';
  import { getMessages, postMessage } from '$lib/backend.js';

  let content = '';
  let messages = [];

  async function fetchMessages() {
    messages = await getMessages();
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

  onMount(fetchMessages);
</script>

<div class="container">
  <h1>AnonBoard（匿名掲示板）</h1>

  <textarea bind:value={content} placeholder="メッセージを入力してください"></textarea>
  <button on:click={submitMessage}>投稿する</button>

  <ul>
    {#each messages as message}
      <li class="message-item">
        <div class="message-content">{message.content}</div>
        <div class="message-timestamp">
          投稿日時: {new Date(Number(message.timestamp) / 1_000_000).toLocaleString()}
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  textarea {
    width: 100%;
    height: 80px;
    padding: 10px;
    font-size: 16px;
    box-sizing: border-box;
  }

  button {
    padding: 8px 16px;
    margin-top: 8px;
    font-size: 16px;
    cursor: pointer;
  }

  .message-item {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    margin-top: 10px;
  }

  .message-content {
    font-size: 18px;
  }

  .message-timestamp {
    color: #666;
    font-size: 12px;
    margin-top: 4px;
  }
</style>
