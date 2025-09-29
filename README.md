# AnonBoard（匿名掲示板）

## サービスコンセプト
**AnonBoard** は、Internet Computer Protocol（ICP）上に構築された、**匿名性・改ざん不可・完全分散型**の掲示板です。中央管理者不要で投稿を行えることにより、**検閲のない自由な言論空間**を実現します。



## ターゲットユーザー
- 言論の自由を求める一般ユーザー
- 政治的・社会的にセンシティブな話題を発信したい人
- 改ざん・削除されない記録を残したいジャーナリストや研究者
- 分散型Web3プロジェクトを探している開発者・技術者



## 特徴・機能一覧
- **完全匿名投稿**（ウォレット不要）
- **投稿の削除・改ざん不可能**（ICPのCanisterに保存）
- **一覧表示**（新しい順／古い順切替ボタンあり）
- **わかりやすいUI**（SvelteKit + スタイリング）
- **本番環境で動作確認済**



## ICPの活用ポイント
- **Canisters**：投稿データを保存。中央のデータベース不要で、永続・分散保存が可能。
- **HttpAgent + Actor** により、フロントエンドとCanisterを直結。
- **改ざん不能な履歴管理**：全投稿がブロックチェーン上に保持され、検閲・操作不可能。



## なぜICPなのか？（ICPの優位性）
- **サーバーレスで永続的にホスティング可能**（Canisterの存在＝サービスの存在）
- **中央サーバーが不要で、検閲リスクなし**
- **運用コストが圧倒的に低い**（Ethereumなどと比較しても非常に安価）
- **ユーザー管理不要でも匿名性と安全性を両立**



## 技術スタック
- フロントエンド：SvelteKit
- バックエンド：Motoko（ICP Canister）
- スタイリング：CSS / SCSS
- デプロイ：ICP（本番）



## 開発進捗と今後の展望
- 投稿保存 / 取得機能
- 並び替え機能（新→古 / 古→新）
- 本番環境デプロイ・動作確認

### 今後の展望（予定）
- カテゴリ・タグ機能
- 投稿への返信 / スレッド構造
- Internet Identity連携による「任意の本人性」追加

---

## ローカル開発 & デプロイ手順

### 前提
dfx (Internet Computer SDK) が利用可能であること。Windows の場合は WSL2(Ubuntu) 推奨。

### 初回セットアップ
```bash
git clone <REPO_URL> anon_board
cd anon_board
npm install
dfx start --background
npm run deploy:local
```

### 変更を反映 (ローカル上書き)
```bash
npm run deploy:local:backend   # Motoko だけ変更した場合
```

### 本番 (IC) へアップグレード / 再デプロイ
```bash
# バックエンドのみ (state維持 / stable 互換必須)
npm run deploy:ic:backend

# フロントエンド資産更新
npm run deploy:ic:frontend

# 両方まとめて
npm run deploy:ic:all
```

### Canister ID の解決ロジック
`src/anon_board_frontend/src/lib/backend.js` で以下優先順:
1. `import.meta.env.CANISTER_ID_ANON_BOARD_BACKEND`
2. `process.env.CANISTER_ID_ANON_BOARD_BACKEND`
3. ハードコードされた本番 ID フォールバック (`zntov-gqaaa-...`)

### アップグレード互換性について
`main.mo` の `stable var messages : [Message]` はそのまま維持されるため、型を壊さなければ state が保持されます。フィールド追加時は preupgrade/postupgrade で古いデータのマイグレーションを実装してください。

### よくあるトラブル
| 症状 | 対処 |
|------|------|
| `dfx: command not found` | PATH 再読込 or WSL 内でインストール |
| Upgrade 失敗 (権限) | `dfx identity list` → 以前の identity を `dfx identity use` |
| Agent root key error (ローカル) | 開発時 `agent.fetchRootKey()` を一時的に有効化 |
| 型変更で復旧不可 | 旧型保持し変換関数で新配列へ移し替え |

---

## 今後の改善候補 (技術)
- ページング API (大量メッセージ対策)
- スパム防止 (簡易 PoW / レート制限)
- preupgrade/postupgrade のテンプレート導入
- CI での `dfx canister create --no-wallet` + candid チェック



