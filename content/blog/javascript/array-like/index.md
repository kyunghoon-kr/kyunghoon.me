---
title: 유사배열 파헤치기
date: "2021-02-12T19:15:00.000Z"
description: "Javascript의 유사배열 개념에 대해 알아보았다."
tag: "javascript"
thumbnail: "test-commit.png"
---

Javascript에는 유사배열이(Array-Like)라는 개념이 존재한다. 이름 그대로 배열인 척 하는 객체라고 생각하면 된다.

유사배열에 대해 다루기에 앞서 Javascript의 Object 개념에 대해 자세히 파헤쳐보아야 한다. 명쾌한 설명을 위해 내 경험을 공유해보겠다.

## Python의 Dictionary, Java의 HashMap..

최근에 PS와 함께 알고리즘을 공부하면서 자료구조에 대해 다룰 일이 많아졌다. Iterable한 객체의 대표격인 배열만으로도 반복되는 데이터를 다룰 수 있지만, 메모리와 시간에서 극한의 효율을 끌어내야 하는 PS에서는 Key, Value를 사용하는 Dictionary 형태의 자료구조로 Iterable을 표현해야 할 때도 많다.

고유한 Key를 통해 Value를 호출하는 형태의 자료구조는 Python에서는 Dictionary, Java에서는 HashMap 등이 있다. (완전히 같다고 보긴 어려울 수 있지만)

```
{
    'name':'pey',
    'phone':'0119993323',
    'birth': '1118'
}
```

선언 및 사용 방식은 언어마다 다르겠지만 다음과 같은 형식을 취한다. Javascript는 Object라는 개념을 통해 Python의 Dictionary를 표현할 수 있다.

[developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object)

---

## 😒 이 얘기를 왜 하는 거죠 ...?

이제 흔한 유사배열의 예를 들어보겠다.

```
let arrayLikeObject = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}
```

그냥 Object와 똑같아 보인다. key 값으로 숫자가 사용되었고, length라는 key가 따로 있는 것 뿐?

그래서 처음에는 유사배열 = 객체, 라고 인지하였다. 유사배열이라는 단어는 알고리즘 풀이를 찾아보면서 발견한 개념이었기 때문에 그냥 객체와 혼용해서 사용하는 단어라고 생각했다.

[##_Image|kage@c6Hasy/btq1XhUH7f8/shSPfsdIZ5hTfDbwInU8Nk/img.png|alignCenter|data-origin-width="0" data-origin-height="0" data-ke-mobilestyle="widthContent"|유사배열은 MDN에서도 나오지 않았다.. 이러니 헷갈릴 수 밖에.. ㅠㅠ&nbsp;||_##]

하지만 잘 찾아보면 유사배열은 두 가지 조건을 가지고 있다.

#### 1\. Indexing이 가능하다

\- 유사배열은 array\[0\], array\[1\]의 형태로 인덱싱이 가능하도록 각 요소에 0부터 시작하는 숫자 형태의 index가 있어야 한다.

#### 2\. length 프로퍼티가 있어야 한다.

\- 배열에는 .length를 통해 요소의 갯수에 접근할 수 있다. 유사배열도 배열인 척 하는 녀석이기 때문에 마찬가지로 .length 프로퍼티가 존재해야 한다.

모든 객체가 유사배열로 표현할 수 있는 것이 아니라, 다음과 같이 객체이면서도 배열의 특징을 어느정도 띄고 있어야 유사배열로 본 다는 것이다.

---

## 유사배열의 활용

유사배열을 그럼 실제로 어디서 볼 수 있나? 라는 질문을 하면 여러 포스팅에서도 다음과 같은 예제를 든다.

```
<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="container">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
<script>
    const container = document.querySelector('#container').children;
    console.log(container);
</script>
</body>
</html>
```

다음과 같이 여러개 나열된 DOM에 선택자를 통해 접근할 때, 나온 값을 콘솔에 찍어보면 다음과 같이 나온다.

[##_Image|kage@cR2DvP/btq101JRna4/NkFlNtiF3XKYsqKbUsKx90/img.png|alignCenter|data-origin-width="0" data-origin-height="0" data-ke-mobilestyle="widthContent"|||_##]

프로토타입이 HTMLCollection이라고 되어 있는데, 얼핏보면 배열처럼 보인다. 하지만 배열의 프로토타입 메소드인 forEach 같은 것을 사용해보면 타입에러가 발생한다.

[##_Image|kage@lu0sj/btq1WOydwTX/CE83GeyJnkZLleBGLk3eg1/img.png|alignCenter|data-origin-width="0" data-origin-height="0" data-ke-mobilestyle="widthContent"|||_##]

결국에 배열인척하지만 근본은 객체라는 뜻이다. 유사배열을 배열처럼 사용하려면 배열로 바인딩해서 사용하거나, 배열로 변환한 후 사용해야 한다.

#### 1\. ES6을 사용하고 있다면

ES6에서는 Array.from() 메소드를 통해 배열로 변환할 수 있다.

```
let array = Array.from(arrayLike);
array.forEach((el) => {
	console.log(el); // 문제없다
});
```

#### 2\. 그 전 버전이라면

Array.prototype.call을 통해 this로 바인딩하여 배열인 것 처럼 사용할 수 있다.

```
Array.prototype.forEach.call(arrayLike, (value, key) => {
    console.log(`${value} : ${key}`);
})
```

PS에서는 ES6이 제공되지 않는 경우가 많기 때문에(Baekjoon같은 경우 node.js) 두 번째 방법을 주로 사용한다.

---

## 📚 레퍼런스

[kamang-it.tistory.com/entry/JavaScript15%EC%9C%A0%EC%82%AC%EB%B0%B0%EC%97%B4-%EA%B0%9D%EC%B2%B4Arraylike-Objects](https://kamang-it.tistory.com/entry/JavaScript15%EC%9C%A0%EC%82%AC%EB%B0%B0%EC%97%B4-%EA%B0%9D%EC%B2%B4Arraylike-Objects)

[

\[JavaScript-15\]유사배열 객체(Array-like Objects)

본 강의는 자바스크립트의 기초를 대충 안다고 가정하고 시작하는 조금 심도 깊은 포스팅이다. 완전 처음부터 배우고 싶다면 다른 블로그나 책의 글을 참조하기를 바란다. 특별한 추가 설명이

kamang-it.tistory.com

](https://kamang-it.tistory.com/entry/JavaScript15%EC%9C%A0%EC%82%AC%EB%B0%B0%EC%97%B4-%EA%B0%9D%EC%B2%B4Arraylike-Objects)

[www.zerocho.com/category/JavaScript/post/5af6f9e707d77a001bb579d2](https://www.zerocho.com/category/JavaScript/post/5af6f9e707d77a001bb579d2)

[

(JavaScript) 배열과 유사배열

안녕하세요. 이번 시간에는 배열과 유사배열에 대해서 살펴보겠습니다. 배열은 다들 아실겁니다. 그런데 유사배열은 잘 모르는 입문자분들이 많이 계십니다. 한 번 둘의 차이를 알아봅시다. var

www.zerocho.com

](https://www.zerocho.com/category/JavaScript/post/5af6f9e707d77a001bb579d2)
