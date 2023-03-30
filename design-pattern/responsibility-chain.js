// 责任链模式:
// 通过给多个对象处理请求的机会，避免请求发送者与接收者之间的耦合。
// 将接收对象构成一个链并依次传递请求，直到某个对象处理该请求为止。

// 1. 解决了什么问题
// 解决多个对象触发触发一组流程中不同事件时，无需依次手动触发。将需要处理的对象组成链，委托。
// 2. 不用会怎么样
//
// 3. 原则
//
// 4. 已知应用场景
// DOM事件的冒泡和捕获机制
// 5. 示例代码
class AbstractHandle {
  next; // 下一个执行事件

  // 执行事件
  handle() {}

  // 设定事件触发条件
  canHandle(request) {
    return false;
  }

  setNext(next) {
    this.next = next;
    return next;
  }

  handleRequest = (request) => {
    if (this.canHandle(request)) {
      this.handle(request);
    } else if (this.next) {
      this.next.handleRequest(request);
    }
  };
}

class concreteHandle1 extends AbstractHandle {
  canHandle(request) {
    return request === "A";
  }

  handle(request) {
    console.log("ConcreteHandler1 handles request:", request);
  }
}

class concreteHandle2 extends AbstractHandle {
  canHandle(request) {
    return request === "B";
  }

  handle(request) {
    console.log("ConcreteHandler2 handles request:", request);
  }
}

const handle1 = new concreteHandle1();
const handle2 = new concreteHandle2();
handle1.setNext(handle2);

handle1.handleRequest("A"); // 输出：ConcreteHandler1 handles request: A
handle1.handleRequest("B"); // 输出：ConcreteHandler2 handles request: B
handle1.handleRequest("C"); // 没有输出，因为没有处理器能够处理请求 C

// 6. 开源代码
