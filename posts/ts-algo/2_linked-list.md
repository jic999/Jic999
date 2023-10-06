---
title: TS数据结构：链表
date: 2023-09-20
tags:
  - TypeScript
  - 数据结构
---

在上一篇中提到，数组的存储单元是连续的，这意味着对数组进行新增或删除操作时，都需要批量移动元素，效率很低。

而链表则是一种非连续的存储结构，其每个节点都记录着下一个节点的地址，我们只需知道链表的首个节点，即头节点的地址，就可以遍历整个链表。因此链表的各个节点可以存储在内存中的任何位置，这无疑是极具灵活性的。

## 初始化链表

链表的初始化也很简单，定义一个节点类，实例化一系列节点，而后将它们链接起来即可。

```ts
class ListNode<T> {
  constructor(
    public element: T,
    public next?: ListNode<T>,
  ) {}
}

// 初始化节点
const node_1 = new ListNode(1)
const node_2 = new ListNode(2)
const node_3 = new ListNode(3)
const node_4 = new ListNode(4)
const node_5 = new ListNode(5)

// 链接节点
node_1.next = node_2
node_2.next = node_3
node_3.next = node_4
node_4.next = node_5
```

## 遍历链表

要遍历一个链表，我们只需从头节点开始，通过`next`依次访问每个节点元素即可。

```ts
function traverse<T>(head: ListNode<T>): void {
  let current: ListNode<T> | undefined = head
  let index = 0
  let str = ''
  while (current) {
    str += `${index}_element: ${current.element}`
    current = current.next
    if (current)
      str += ' -> '
    index++
  }
  console.log(str) // 0_element: 1 -> 1_element: 2 -> 2_element: 3 -> 3_element: 4 -> 4_element: 5
}
```

## 插入节点

要向链表中插入一个新节点，我们需要从头节点开始遍历，找到要插入的位置，而后将上一个节点的`next`指向新节点、新节点的`next`指向下一个节点即可。

```ts
function insert<T>(head: ListNode<T>, index: number, element: T): void {
  let current: ListNode<T> | undefined = head
  let prev: ListNode<T> | undefined
  let i = 0
  // 找到要插入的位置
  // en: find the position to insert
  while (current && i < index) {
    prev = current
    current = current.next
    i++
  }
  // prev -> current ==> prev -> new node -> current
  if (prev)
    prev.next = new ListNode(element, current)
}

insert(node_1, 2, 10)
traverse(node_1) // 0 element: 1 -> 1 element: 2 -> 2 element: 10 -> 3 element: 3 -> 4 element: 4 -> 5 element: 5
```
## 删除节点

知道如何插入节点后，删除节点也是同理，找到目标位置后，直接将上一个节点的`next`指向目标位置的下一个节点即可。

删除节点后，被删除的节点仍然会执着地指向其原始位置的下一个节点，但它已经不再属于这个链表了🙂。

```ts
function remove(head: ListNode<any>, index: number): void {
  let current: ListNode<any> | undefined = head
  let prev: ListNode<any> | undefined
  let i = 0
  while (current && i < index) {
    prev = current
    current = current.next
    i++
  }
  // prev -> current -> next ==> prev -> next
  if (prev)
    prev.next = current?.next
}

// 移除刚刚添加的节点
remove(node_1, 2)
traverse(node_1) // 0 element: 1 -> 1 element: 2 -> 2 element: 3 -> 3 element: 4 -> 4 element: 5
```

## 访问节点

链表的访问与数组大不相同。数组可以通过索引直接访问对应的元素，而链表由于其非连续存储的特性，我们无法直接获得目标节点的地址，因此需要从头节点开始遍历，直至找到目标节点。

```ts
function access<T>(head: ListNode<T>, index: number): ListNode<T> | undefined {
  let current: ListNode<T> | undefined = head
  let i = 0
  while (current && i < index) {
    current = current.next
    i++
  }
  return current
}

console.log(access(node_1, 2)) // ListNode { element: 3, next: ListNode {...} }
```

## 查找节点

与访问节点类似，查找节点也需要从头节点开始遍历，将每个节点元素与目标元素进行比较，直至找到目标节点。

```ts
function find<T>(head: ListNode<T>, element: T): number {
  let current: ListNode<T> | undefined = head
  let index = 0
  while (current) {
    if (current.element === element)
      return index
    current = current.next
    index++
  }
  return -1
}

console.log(find(node_1, 3)) // 2
```
## 总结

由于链表在内存空间中是非连续存储的，所以在插入或删除节点时，只需修改节点的`next`指向即可，效率极高。但也是由于非连续存储的特性，在访问链表元素时，我们无法直接获得任一节点的地址，而是需要从头节点开始遍历，直至找到目标节点，效率很低

数组与链表对比：

|     | 数组 | 链表 |
| - | - | - |
| 存储方式 | 连续内存空间 | 离散内存空间 |
| 容量扩展 | 需要重新分配内存空间 | 可灵活扩展 |
| 内存效率 | 占用内存小，浪费部分空间 | 占用内存多 |
| 插入/删除 | 需要批量移动元素 | 只需修改指针 |
| 访问 | 可直接访问 | 需要遍历 |
| 适用场景 | 频繁访问 | 频繁插入/删除 |


## 链表的类型：

常见的链表类型包括以下三种：

- **单向链表：** 即上述介绍的链表。单向链表的每个节点包含元素值和指向下一个节点的指针。

- **双向链表：** 与单向链表相比，双向链表的每个节点同时包括指向下一个节点（后继节点）和上一个节点（前驱节点）的指针。相对于单向链表，双向链表更具灵活性，但也需要更多的内存空间。
  
- **循环链表：** 与单向链表相比，循环链表的尾节点指向了头节点，形成一个环。这意味着我们可以从任意节点开始遍历整个链表，即任意节点都可以视作头节点。

## 参考

- [linked_list](https://www.hello-algo.com/chapter_array_and_linkedlist/linked_list/)