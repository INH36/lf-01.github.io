// 警告管理器
type WarnCallback = (message: string) => void;

class WarnManager {
  private callback: WarnCallback | null = null;

  // 设置警告回调函数
  setCallback(callback: WarnCallback) {
    this.callback = callback;
  }

  // 显示警告
  show(message: string) {
    if (this.callback) {
      this.callback(message);
    }
  }
}

// 导出单例实例
export const warnManager = new WarnManager();