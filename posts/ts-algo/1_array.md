---
title: TS数据结构：数组
date: 2023-09-14
tags:
  - TypeScript
  - 数据结构
---

# TS数据结构：数组

顺序表，也称为数组，它是用一组连续的存储单元依次存储数据元素的线性存储结构。

在js中，数组的功能非常强大：它可以存储任意不同类型的数据，且支持动态扩容，其原型对象上还提供了许多方法供我们对数组进行操作。

为了学习演示，下面暂且把 Array 当做一个存储相同类型数据的、固定长度的数组。

## 初始化数组

我们在初始化数组时，可以根据自己的需求决定是否给数组赋值。

```ts
// - 初始化数组
// Array.from
const arr_1 = Array.from({ length: 10 })

// Array 构造函数
const arr_2 = Array(10)

// - 初始化数组并赋值
// 直接赋值
const arr_3 = [1, 2, 3, 4, 5]

// array.fill
const arr_4 = Array.from({ length: 5 }).fill(0)

console.log('arr_1 ==> ', arr_1) // arr_1 ==>  [ <10 empty items> ]
console.log('arr_2 ==> ', arr_2) // arr_2 ==>  [ <10 empty items> ]
console.log('arr_3 ==> ', arr_3) // arr_3 ==>  [ 1, 2, 3, 4, 5 ]
console.log('arr_4 ==> ', arr_4) // arr_4 ==>  [ 0, 0, 0, 0, 0 ]
```
::: warning
使用 fill 方法初始化数组时有一个坑：如果填充的值是一个复杂数据类型（如对象、数组），那么数组中的所有元素都会指向相同的地址。这意味着当你修改其中一个元素时，所有的元素都会一同改变。
:::

## 访问数组元素

由于数组中数据元素的地址值是连续的，所以计算其地址值时，只需要知道数组的首地址和指定元素的索引值即可。

假设索引为0的元素地址为`LOC(a[0])，`存储每个数组元素所需的存储单元大小为 `n`，那么第 `i` 个元素的地址为 `LOC(a[i]) = LOC(a[0]) + i * n`。

因此我们只用通过对应的索引即可访问数组的任意元素。

```ts
function randomAccess<T>(arr: T[]): T {
  // 获取 [0, arr.length - 1] 范围内的随机索引
  // en: get random index in [0, arr.length - 1]
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

const arr = [1, 2, 3, 4, 5]
console.log('item ==> ', randomAccess(arr)) // item ==>  3
```
## 插入元素

由于数组的存储空间是连续的，所以在插入元素时，需要将插入位置之后的元素都向后移动一位，然后再将新元素插入到指定位置。

```ts
function insert<T>(arr: T[], index: number, item: T): void {
  if (index < 0 || index > arr.length)
    throw new Error('非法的索引值')
  // 将 index 之后的元素都向后移动一位
  for (let i = arr.length - 1; i > index; i--)
    arr[i] = arr[i - 1]
  arr[index] = item
}

const arr = [1, 2, 3, 4, 5]
insert(arr, 2, 100)
console.log('arr ==> ', arr) // arr ==>  [ 1, 2, 100, 3, 4]
```

用上面的`insert`方法进行插入时，会丢失数组的最后一位元素。为了避免这种情况，我们可以在插入元素之前将 `arr.length++`。但在实际开发中，我们通常不会这么做，因为js提供了更好的办法。

## 删除元素

与插入元素类似，删除元素时，需要将删除位置之后的元素都向前移动一位。

```ts
function remove<T>(arr: T[], index: number): void {
  if (index < 0 || index >= arr.length)
    throw new Error('非法的索引值')
  // 将 index 之后的元素都向前移动一位
  for (let i = index; i < arr.length - 1; i++)
    arr[i] = arr[i + 1]
}
```

按照该方法删除元素后，最后一位元素仍然存在。当我们只是对数组元素进行简单的读写时，这通常不会造成什么影响。但当我们要遍历数组并进行一些操作时，这可能会导致预期之外的结果。

所以在有需要时，我们可以将`arr.length--`。当然，在实际开发中，我们同样有更好的办法。

## 遍历数组

```ts
function traverse<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++)
    console.log(`arr[${i}] ==> `, arr[i])
}
```
## 扩容数组

由于数组的长度是固定的，所以当我们想要在数组中添加更多元素时，就需要对数组进行扩容。扩容数组的思路很简单：创建一个更大的新数组，将原数组中的元素依次拷贝到新数组中，而后返回新数组。容易看出，在数组很大时，该操作是效率低下的。

```ts
function expand<T>(arr: T[], enlarge: number): T[] {
  const newArr: T[] = Array.from({ length: arr.length + enlarge })
  for (let i = 0; i < arr.length; i++)
    newArr[i] = arr[i]
  return newArr
}

const arr = [1, 2, 3, 4, 5]
const newArr = expand(arr, 5)
console.log('newArr ==> ', newArr) // newArr ==>  [ 1, 2, 3, 4, 5, <5 empty items> ]
```
## 总结

数组是一种非常常用的数据结构，其元素存储在连续的内存空间内。通过以上对数组的基本操作，可以看出数组的一些优点：

- **空间效率高：** 不需要额外的内存去存储每个元素的地址。
- **访问效率高：** 可以直接通过索引访问任意数组元素。

同时，由于其连续存储的特性，也带来了一些缺点：

- **插入、删除效率低：** 插入、删除元素时，需要批量移动元素，效率很低。

- **容量固定：** 当数组中的元素个数超过数组的长度时，需要对数组进行扩容，而这需要很大的开销。

- **空间利用率低：** 当数组中的元素个数小于数组的长度时，多余的空间就会被浪费。

## 参考

- [array](https://www.hello-algo.com/chapter_array_and_linkedlist/array/)