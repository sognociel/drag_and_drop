// 객체 지향 방식으로 표현 (100% 선택사항. 하지만 클래스 등을 배웠기 때문에 어떻게 작동하는지 보기 위해 객체 지향 방식으로 진행)
// 템플릿과 그 안의 양식에 접근하고 div에 엑세스하여 그 div안의 템플릿을 렌더링하는 것.
// 그러면 템플릿의 내용이 엑세스한 div 안에서 실행된다.

// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// ProjectInput이라는 클래스에 constructor를 추가하여 여기에서 템플릿과 렌더링되어야 하는 위치에 접근한다.
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  titleInputElement: HTMLElement;
  descriptionInputElement: HTMLElement;
  peopleInputElement: HTMLElement;

  constructor() {
    // 템플릿
    this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
    // 템플릿 내용을 렌더링
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // 현재 문서가 아닌 외부 문서의 노드를 복사하여 현재 문서에 넣을 수 있도록 해준다.
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // 해당 요소에 user-input이라는 id를 추가해줌으로서 스타일 추가 가능
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector("#title") as HTMLElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLElement;
    this.peopleInputElement = this.element.querySelector("#people") as HTMLElement;

    this.configure();
    this.attach();
  }

  // 제출
  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInputElement);
  }

  // 이벤트 리스너 설정
  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
