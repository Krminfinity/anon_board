import { Actor, HttpAgent } from '@dfinity/agent';

// IDL Factory for the backend canister
const idlFactory = ({ IDL }) => {
  const Message = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'addMessage' : IDL.Func([IDL.Text], [Message], []),
    'getAllMessages' : IDL.Func([], [IDL.Vec(Message)], ['query']),
  });
};

// .env (dfx が生成) から注入される環境変数を参照 (vite-plugin-environment)
// ローカル: CANISTER_ID_ANON_BOARD_BACKEND が存在
// 本番: フォールバックとして mainnet の固定 ID

// ICPのエージェントを作成
const agent = new HttpAgent({
  host: 'https://icp0.io',
});

// // ローカル環境の場合、開発用のルートキーを取得（本番デプロイ時は不要）
// if (import.meta.env.DEV) {
//   agent.fetchRootKey();
// }

const canisterId = (
  // Vite の環境 (import.meta.env) 優先
  (import.meta?.env && import.meta.env.CANISTER_ID_ANON_BOARD_BACKEND) ||
  // Node/SSR 側 (念のため)
  process.env?.CANISTER_ID_ANON_BOARD_BACKEND ||
  // フォールバック: IC 本番デプロイ済み ID
  'zntov-gqaaa-aaaaf-qanvq-cai'
);

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
