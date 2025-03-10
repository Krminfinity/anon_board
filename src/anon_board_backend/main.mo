import Time "mo:base/Time";
import Array "mo:base/Array";

actor AnonBoard {

  public type Message = {
    id: Nat;
    content: Text;
    timestamp: Int;
  };

  private stable var messages: [Message] = [];

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
}

