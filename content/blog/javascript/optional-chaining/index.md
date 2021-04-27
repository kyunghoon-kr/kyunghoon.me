---
title: "[Typescript] 옵셔널 체이닝"
date: "2021-02-12T19:15:00.000Z"
description: "Typescript의 옵셔널 체이닝 문법에 대해 알아본다."
tag: "typescript"
thumbnail: "main.png"
---

Typescript에는 옵셔널 체이닝이라는 문법이 있다. **null이나 undefined가 반환되면, 즉시 중단하고 undefined를 반환하는 문법**이다.

Javscript와 달리 Typescript는 컴파일 언어이기 때문에 undefined로 예상되는 객체에서 메소드를 사용하거나 하는 경우 오류를 발생시킨다. Javscript에도 존재하는 문법이지만 실험적으로 존재하는 기능이고 Typescript에서는 3.7 릴리즈 버전으로 도입되었다.

Swift나 Kotlin 같은 신세대(?) 언어에서도 널리 사용되고 있는 기능이다.

```typescript
const response = // API를 통해 데이터를 불러온다
    const { data } = response.data;
    if (data && data.person) {
    return data.person.name;
}

```

데이터가 제대로 수신되었는지 확인하려면 원래는 다음과 같은 과정을 거친다. null or undefined 체크를 if문으로 해주고 데이터가 존재한다면 받아오는 방식이다. 옵셔널 체이닝을 사용하면 다음과 같이 변환이 가능하다.

```typescript
const { data } = reponse.data;
return data?.person?.name;
```

타입스크립트에서 이렇게 사용해주지 않는다면 null인 객체의 person, name property를 각각 참조하면서 컴파일 에러(TypeError)가 발생할 것이다. 하지만 옵셔널 체이닝을 사용한다면 data가 null or undefined을 확인한 순간 더 이상 진행하지 않고 undefined을 즉시 반환하여 일단 다음으로 넘어갈 수 있다.
