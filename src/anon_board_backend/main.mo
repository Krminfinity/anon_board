import Time "mo:base/Time";
import Array "mo:base/Array";

// NOTE: 'persistent actor' 構文は新しい Motoko バージョンで導入された機能です。
// 新しいバージョンでは persistent actor を使用する必要があります。
persistent actor AnonBoard {

  public type Message = {
    id: Nat;
    content: Text;
    timestamp: Int;
  };

  // 永続化したいので stable を利用
  stable var messages : [Message] = [];

  // 将来スキーマ変更時のための一時退避領域 (必要になったら使用)
  // 現状は空配列を placeholder として利用
  stable var _upgrade_buffer : [Message] = [];

  // 投稿を格納する（匿名投稿機能）
  public func addMessage(content: Text): async Message {
    let message: Message = {
      id = messages.size();
      content = content;
      timestamp = Time.now();
    };

    messages := Array.append<Message>(messages, [message]);

    return message;
  };

  // 現在までの全投稿を取得する関数
  public query func getAllMessages(): async [Message] {
    return messages;
  };

  // アップグレード前に state を退避 (今はそのままコピー)
  system func preupgrade() {
    _upgrade_buffer := messages;
  };

  // アップグレード後に退避領域から復元
  system func postupgrade() {
    if (_upgrade_buffer.size() > 0) {
      messages := _upgrade_buffer;
      _upgrade_buffer := [];
    };
  };
}

