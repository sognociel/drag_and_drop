// 돔에 렌더링하는 모든 클래스의 공통 기능을 관리해주는 클래스 (부모 클래스)
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    // 템플릿
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    // 템플릿 내용을 렌더링
    this.hostElement = document.getElementById(hostElementId)! as T;

    // 현재 문서가 아닌 외부 문서의 노드를 복사하여 현재 문서에 넣을 수 있도록 해준다.
    const importedNode = document.importNode(this.templateElement.content, true);
    // 해당 요소에 newElementId라는 id를 추가해줌으로서 스타일 추가 가능
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
