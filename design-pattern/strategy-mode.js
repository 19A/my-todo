// https://pattern.windliang.wang/posts/%E5%89%8D%E7%AB%AF%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E7%B3%BB%E5%88%97-%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F.html
// 策略模式: 对象有某个行为，在不同的场景下中 该行为有不同的实现算法

// 解决问题：抽离多重if else和switch的业务场景

// 不用会？

// 原则？

// 已知应用场景
//   表单验证：async-validator库 getValidationMethod 方法

// 示例场景：
// 优化以下代码：
async function getMainData() {
  try {
    const res = await activityQuery(); // 请求后端数据
    this.styleType = res.styleType;
    if (this.styleType === STYLE_TYPE.Reward) {
      this.openMoneyPop();
    } else if (this.styleType === STYLE_TYPE.Poster) {
      this.openPosterPop();
    } else if (this.styleType === STYLE_TYPE.Activity) {
      this.openActivityPop();
    } else if (this.styleType === STYLE_TYPE.Balance) {
      this.openBalancePop();
    } else if (this?.styleType === STYLE_TYPE.Cash) {
      this.openCashBalancePop();
    }
  } catch (error) {
    log.error(MODULENAME, "主接口异常", JSON.stringify(error));
  }
}

// =>
async function getMainData() {
  try {
    const res = await this.activityQuery();
    this.openPop(this.styleType);
  } catch (error) {
    log.error(MODULENAME, "主接口异常", JSON.stringify(error));
  }
}

const STYLE_TYPE = {
  Reward: function Reward() {},
  Poster: function Poster() {},
  Activity: function Activity() {},
  Balance: function Balance() {},
  Cash: function Cash() {}
};

function openPop(type) {
  return STYLE_TYPE[type];
}
