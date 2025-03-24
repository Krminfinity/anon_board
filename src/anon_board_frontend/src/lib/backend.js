import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/anon_board_backend';

// // CanisterのIDを設定（ローカル用）
// const canisterId = process.env.CANISTER_ID_ANON_BOARD_BACKEND;

// ICPのエージェントを作成
const agent = new HttpAgent({
  host: 'https://icp0.io',
});

// // ローカル環境の場合、開発用のルートキーを取得（本番デプロイ時は不要）
// if (import.meta.env.DEV) {
//   agent.fetchRootKey();
// }

// 本番環境のCanister IDを直接記載
const canisterId = 'zntov-gqaaa-aaaaf-qanvq-cai';

// Actorを作成（Canistersとの通信を行う）
const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});


// 投稿一覧を取得する関数
export async function getMessages() {
  return await backend.getAllMessages();
}

// 新しい投稿を送信する関数
export async function postMessage(content) {
  return await backend.addMessage(content);
}
