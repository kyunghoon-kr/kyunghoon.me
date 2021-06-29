---
title: "[Gatsby + Netlify] 배포 시에 Not Found Error 해결하기"
date: "2021-06-02T21:33:00.000Z"
description: "Gatsby project를 Netlify에 배포하면서 발생하는 에러를 해결한 경험에 대해 작성해보았다."
tag: "blog"
thumbnail: "banner.jpg"
---

Netlify는 *웹 애플리케이션이나 정적 웹 사이트 호스팅을 손쉽게 할 수 있도록 도와주는 서비스*이다. 특히 Git Repository와 연동하면 지정한 branch로 push할 때 마다 자동으로 배포해주는 등 간단하면서도 강력한 기능을 제공한다. Gatsby와의 궁합도 아주 괜찮기 때문에 Gatsby + Netlify 조합은 많이들 사용하고 있다.

Gatsby Command로 로컬 환경에서 Dev, Production 둘 다 테스트가 가능하다.

- `gatsby develop` : 프로젝트를 development server에서 시작한다
- `gatsby serve` : production build 세팅으로 사이트를 게시한다.

---

하지만 최근에 아주 황당한 문제와 맞닥뜨리게 되었다. 로컬에서는 develop, serve 해도 이상이 없는데 Netlify를 통해 배포를 하면 Not found가 뜨는 것이다.

```javascript
page resources for '/' not found. Not rendering React
```

정적 파일을 호스팅하고 있기 때문에 '/'를 못찾는다는 것은 build된 index.html을 불러오지 못하는 것으로 예상이 되었다. 그러면 뭔가 배포 단계에서 문제가 있었다는 것인데.. 그래서 배포 로그를 살펴보았다.

> Netlify는 기본적으로 배포 과정 로그를 살펴볼 수 있다.

![log.png](/log.png)

패키지 버전 싱크가 맞지않는 WARN 문구는 있었으나, 특별한 error 없이 배포가 완료되었다고 나온다. 더 당황스러운 부분은 캐시를 날리고 강제 새로고침하면 원래 페이지가 제대로 나온다는 점이었다. 구글링보니 bleepcoder gatsby 쪽에 PR을 남긴 글이 있어 이부분을 통해 확인해보기로 하였다.

---

# 😭 오류 원인이 참 다양하다..

https://bleepcoder.com/ko/gatsby/524949018/error-page-resources-for-not-found-not-rendering-react

다음 링크를 참조하였다. 코멘트가 참 많다.. 같은 현상인데 아주 다양한 방법으로 해결했다는 점을 알 수 있다. 그만큼 원인도 가지각색이며 내가 왜 안되는 건지 특정할 수가 없었다. 별 수 있나.. 이것저것 다 해보는 수 밖에..

그래도 많은 사람들이 해결한 방식을 한번 정리해보았다.

### Netlify Deploy Settings 살펴보기

Netlify의 Deploy 세팅을 들어가보자. https://app.netlify.com/sites/{내사이트이름}/settings/deploys

![settings.png](/settings.png)

내가 사용하는 gatsby-starter는 `gatsby build`를 실행하면 public으로 정적 파일을 모으기 때문에 Publish directory가 public으로 되어 있다. Base directory와 Publish directory를 잘 확인하여 정적 파일의 index.html을 가리킬 수 있도록 설정되어 있는지 확인해보아야 한다.

### 패키지 문제는 없는지 확인해보기

나 같은 경우는 `npm audit fix`를 통해 dependency의 취약점을 고치는 것은 효과가 없었다. (하지만 코멘트 중에 이 방법을 통해 해결했다는 사람이 있긴 하다).  
오히려 `gatsby` 버전을 강제로 3v로 마이그레이션되서 다시 통째로 커밋을 되돌려야 했다. `gatsby develop`을 돌려보면 `package.json`으로 부터 패키지를 받아오면서 문제가 없는지 확인한다. 이때 패키지간 버전이 많지 않거나 지원하지 않으면 WARNING이 뜬다. 이 문제를 해결한 사람 중 종속성 문제로 패키지를 다 uninstall 했다가 하나하나 install 해보면서 고쳤다는 코멘트가 있다.

나는 Gatsby starter를 통해 최초 세팅을 하였기 때문에 내가 직접 추가한 패키지에 관해서만 종속성 테스트를 해보았다. 특히 타입스크립트를 쓰고 있다면 npm 버전 불일치 문제가 발생하기 더 쉬울 수 있으니 확인이 필요하다고 한다.

이래도 특정하기 힘들다면 그냥 gatsby에서 많이 사용하는 package 버전 조합을 그대로 사용해보는 것도 나쁘지 않을 것 같다.

### 캐시를 초기화하고 다시 배포해보기

Netlify는 Deploy trigger로 캐시를 초기화 후 배포하도록 해 준다. Netlify가 캐시를 어떻게 관리하는지는 공식 문서를 참조해보았다.

![trigger.png](/trigger.png)

이렇게 다시 수동으로 배포를 해 볼 수 있다. 이렇게도 해결이 안된다면 프로젝트 내에서 `gatsby clean`명령어를 사용해 보는 방법도 있다. .cache 폴더와 공용 디렉토리를 지운다고 되어있는데 이 명령어를 사용하면 오래된 데이터나 종속성 문제, 플러그인 문제를 어느정도는 해결해 준다. 그다음에 다시 build -> serve를 해서 확인해볼 수 있다.

### Sensitive variable policy 건드리기

Netlify의 deploy -> Environment를 들어가보면 환경 변수 액세스를 관리할 수 있다. Netlify가 앱 내에서 작동하도록 한 환경 변수를 무시하거나, 쓸데없이 참조해서 에러가 발생하는 경우가 있다고 한다. 기본 값 `Require approval`은 모든 배포 요청은 승인을 거치도록 한다. 하지만 이를 `Deploy without restirictions`로 변경하면 모든 사용 가능한 환경 변수를 사용하여 빌드된다.

---

나는 마지막 방법까지 도달해서야 문제를 해결할 수 있었다 ㅠ ㅠ 장장 몇 시간에 걸쳐서야 겨우 해결할 수 있었는데 공식 문서를 꼼꼼이 살펴보고 해결하는 근력을 기른 것 같아 기분은 나쁘지 않다. 이 문제로 고생하는 사람들이 있다면 이 글을 통해 해결할 수 있기를 바란다.
