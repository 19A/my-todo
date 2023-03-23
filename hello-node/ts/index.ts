// 使用ts原因：提前规避一些错误...
function getFirstWord(msg: string | number) {
    console.log(msg.split(' ')[0])
}

getFirstWord('Hello World')
getFirstWord(123)

// 字符串
const str: string = 'Hello World'

// 数值
const num: number = 1

// 布尔值
const bool: boolean = true

// 数组
const strs: string[] = ['Hello world', 'Hi world']
const nums: number[] = [1, 2, 3]
const bools: boolean[] = [true, false]
// TS 会推导它们的类型
const strs1 = ['Hello world', 'Hi world']
const nums1 = [1, 2, 3]
const bools1 = [true, false]
const nums2 = []; // 这个时候会认为是 any[] 或者 never[] 类型
nums2.push(1);// 这个时候再 push 一个 number 数据进去，也不会使其成为 number[]

// 对象（接口）
interface UserItem {
    name: string,
    age?: number,
}
type UserItem1 = {
    name: string,
    age: number,
}
//ps: 两者仅在特殊的时候也有一定的区别
// 在声明变量的时候将其关联到类型上
const petter: UserItem = {
    name: 'Petter',
}

// 调用自身接口的属性 tree
interface User {
    name: string,
    age: number,
    friendList: User[],
}
const tom: User = {
    name: 'Tom',
    age: 20,
    friendList: [
        {
            name: 'Marry',
            age: 20,
            friendList: []
        }
    ]
}

// 接口的继承
// 接口还可以继承，比如要对用户设置管理员，管理员信息也是一个对象，
// 但要比普通用户多一个权限级别的属性，那么就可以使用继承，它通过 extends 来实现：
interface Role {
    name: string
    age: number
    enjoyFoods: string[]
    friendList: Role[]
}
// 在继承的过程中舍弃某些属性  type Omit<T, K extends string | number | symbol>
interface Admin extends Omit<Role, 'enjoyFoods' | 'friendList'> {
    permissionLevel: number
}
const amin: Admin = {
    name: 'Petter',
    age: 18,
    permissionLevel: 1,
}

// 基类
class BookBase {
    // constructor 上的数据需要先这样定好类型
    name: string
    // 入参也要定义类型
    constructor(bookName: string) {
        this.name = bookName;
    }
}

// 类与类之间可以继承：
class Book extends BookBase {
    getName() {
        console.log(this.name)
        return this.name;
    }
}
const bookA: Book = new Book('A');
bookA.getName();

// 类也可以提供给接口去继承：
interface BookA extends Omit<BookBase, 'getName' {
    page: number;
}
const bookB: BookA = {
    name: 'name',
    page: 300,
}
// 如果类上面本身有方法存在，接口在继承的时候也要相应的实现

// 联合类型 定义值可能出现多种类型的变量

// 函数
// 写法一：函数声明
function sum1(x, y) {
    return x + y
}

// 写法二：函数表达式
const sum2 = function (x, y) {
    return x + y
}

// 写法三：箭头函数
const sum3 = (x, y) => x + y

// 写法四：对象上的方法
const obj = {
    sum4(x, y) {
        return x + y
    },
}
// 还有很多……
const sum3ts = (x: number, y: number): number => x + y

// 函数的可选参数
const sum4ts = (x: number, y: number, z?: boolean): number => x + y

// 无返回值的函数 ps: null和undefined 不可混用，需要则必须返回
const callback = (a: string): void => console.log(a)

// 异步函数的返回值 Promise<T>
function queryData() {
    return new Promise((resolve) => {
        setTimeout(() => {
        }, 3000)
    })
}
queryData().then((data) => console.log(data))

// 函数本身的类型 通常ts会自动推导，无需显示定义，除非定义对象上的方法
const sum: (x: number, y: number) => number =
    (x: number, y: number): number => x + y

// 对象的接口
interface Obj {
    sum: (x: number, y: number) => number
}

// 声明一个对象
const obj1: Obj = {
    sum(x: number, y: number): number {
        return x + y
    }
}

// 函数的重载
// 无重载示例 类型定义混乱
// 对单人或者多人打招呼
function greet(name: string | string[]): string | string[] {
    if (Array.isArray(name)) {
        return name.map((n) => `Welcome, ${n}!`)
    }
    return `Welcome, ${name}!`
}

// 单个问候语
const greeting = greet('Petter')
console.log(greeting) // Welcome, Petter!

// 多个问候语
const greetings = greet(['Petter', 'Tom', 'Jimmy'])
console.log(greetings)
// [ 'Welcome, Petter!', 'Welcome, Tom!', 'Welcome, Jimmy!' ]


// 重载示例
function greetPro(name: string): string  // TS 类型
function greetPro(name: string[]): string[]  // TS 类型
function greetPro(name: string | string[]) {
    if (Array.isArray(name)) {
        return name.map((n) => `Welcome, ${n}!`)
    }
    return `Welcome, ${name}!`
}

// 任意值 any
