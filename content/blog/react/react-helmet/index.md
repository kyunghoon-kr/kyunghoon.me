---
title: "[React] react-helmet 알아보기 "
date: "2021-04-26T22:15:00.000Z"
description: "React에서 검색 엔진 최적화를 할 수 있도록 도와주는 라이브러리인 react-helmet에 대해 알아본다. 또한 Gatsby에서는 react-helmet이 프로젝트와 서버 사이드 렌더링에 어떻게 작용하는지 알아본다."
tag: "react"
thumbnail: "helmet.png"
---

# 개요

리액트는 기본적으로 클라이언트 사이드 렌더링 방식을 사용한다. Single Page Application이기 때문에 `index.js`를 먼저 불러온 뒤 사용자에 행동에 따라 필요한 내용만 다시 읽어들인다.
최초에 많은 내용을 로드하고 넘어가기 때문에, 이후 사용자 인터렉션에서 빠르지만 최초 로딩 속도가 보다 길다. SPA가 대세가 되었기 때문에, _인터렉션에서 우위를 점할 수 있는_ 리액트가 큰 인기를 끈 이유이기도 하다.

(요즘 리액트로 빌드된 사이트를 여럿 살펴보면 App의 스플래쉬처럼 사이트 로딩이 길어 인터렉션으로 대응하는 모습을 볼 수 있다.)

이러한 클라이언트 사이드 렌더링에는 단점이 있다. 서버에서 페이지를 미리 띄워놓는 것이 아니라 사이트에 로딩하면 클라이언트가 자바스크립트를 통해 컴포넌트들을 불러오는 방식이기 때문에 크롬에서 React로 만든 웹앱의 소스를 확인하면 내용이 비어있다.
그렇기 때문에 검색엔진 크롤러가 데이터들을 제대로 수집하지 못한다. 브라우저에 따라 자바스크립트 엔진이 작동하기도 하지만, 모든 브라우저가 그런 것은 아니기에 대응을 해주어야 한다.

---

이 뜻은 꽤나 큰 의미를 담고있다. 검색 엔진 최적화에 활용되는 head의 meta 태그들이 의미가 없어진다는 뜻이다. 검색 엔진들은 meta 태그, title, description 등 사이트에 대해 설명하는 내용을 통해 사이트의 성질과 어떤 컨텐츠를 담고 있는지 유추하여, 검색 알고리즘에 적용한다. 키워드, 연관되는 컨텐츠 등으로 사이트를 노출시키기 위해 검색 엔진 최적화는 필수이며 그렇기 때문에 title, description 등의 메타 데이터들을 잘 작성해 주어야 한다. 실제로 검색 엔진 최적화를 도와주는 Tool인 구글 서치 콘솔이나 네이버 서치어드바이저를 참고하면

실제로 `react-helmet`, `next.js` 등 리액트에서 서버 사이드 렌더링을 지원할 수 있도록 도와주는 것을 사용하지 않으면 메타 데이터를 적용할 수 없다. `next.js`도 많이 사용되지만, 이번 포스팅에서는 react-helmet에 대해 알아보도록 하겠다. 현재 사용중인 `Gatsby`에서도 `react-helmet`을 확장한 플러그인을 사용하기 때문이다.

---

# Gatsby에서는 어떻게 사용할까?

실제로 `Gatsby`에서는 어떻게 사용중인지 알아보자.

```javascript
const SEO = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      ...
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};
```

`SEO`라는 컴포넌트를 정의한다. 이 컴포넌트는 props로 title, description 등의 메타 데이터를 받아온다. 그리고 Helmet에서 받아온 props를 바탕으로 meta 데이터를 객체화한다. 여기서 사용되는 `og:title`, `og:description`... 등은 타 플랫폼에 임베드될때 나타나는 이미지, 제목, 설명이며 twitter, facebook, instagram 등 social meta태그도 모두 지원한다. `Gatsby`에서는 GraphQL을 통해 사이트 메타데이터를 불러올 수 있기 때문에 StaticQuery를 사용하여 페이지 로드 시에 불러온 다음에, meta 데이터로 알아서 넣어주고 있다.

![embed.png](/embed.png)

카카오톡에 링크를 올려보면 임베드가 잘 되고 있다.

이 컴포넌트에서는 사용되지 않지만 `published_date`와 같이 블로그에서 꼭 필요한 메타 데이터도 적용이 가능하니 말 다한 셈이다. (Gatsby는 published_date는 frontmatter를 바탕으로 어찌어찌 알아서 넣는 듯 하다.)

이렇게 객체 형태로 넘기기만 하면 `react-helmet`이 알아서 서버 사이드 렌더링을 지원하여 title, description을 깔아준다.

---

그렇다면 `react-helmet`의 동작원리는 무엇일까. 기존에 html에서 meta 데이터들을 깔아주었던 것과는 다르게, `react-helmet`은 DOM API를 이용하여 직접 헤더를 변경하는 방식이다. 단순히 바닐라 자바스크립트에서 title, description의 값을 변경해주는 것과 유사하다. 하지만 역시 자바스크립트를 비활성화하면 헤더값이 설정되지 않는다. 하지만 `Gatsby`는 추가 플러그인을 통하여 정적파일 빌드시에 헤더값을 설정하는 미들웨어를 가지고 있다.

예로 `Gatsby`가 아닌 리액트 프로젝트를 로컬 환경에서 실행하면 `react-helmet`을 사용했어도 로컬에서는 localhost:3000 ,, 이런식으로 나타날 것이다. 하지만 `Gatsby`를 사용하여 `react-helmet` 플러그인을 확장했다면 로컬에서도 title, description이 정상적으로 나타날 것이다.

---

## 📚 레퍼런스

react-helmet의 동작 원리  
[https://jeonghwan-kim.github.io/dev/2020/08/15/react-helmet.html](https://jeonghwan-kim.github.io/dev/2020/08/15/react-helmet.html)
