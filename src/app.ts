// 객체 지향 방식으로 표현 (100% 선택사항. 하지만 클래스 등을 배웠기 때문에 어떻게 작동하는지 보기 위해 객체 지향 방식으로 진행)
// 템플릿과 그 안의 양식에 접근하고 div에 엑세스하여 그 div안의 템플릿을 렌더링하는 것.
// 그러면 템플릿의 내용이 엑세스한 div 안에서 실행된다.

// https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API

/// <reference path="components/project-input.ts"/>
/// <reference path="components/project-list.ts"/>

// namespace 사용
namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
