namespace App {
  // 프로젝트 State 관찰...자?
  // Listener와 State는 여기에서만 쓰여서 따로 export 할 필요가 없다
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  // Project State Management. 싱글톤 클래스
  // 싱글톤 클래스란 생성자가 여러 차례 호출되더라도 실제로 생성되는 객체는 하나이고, 최초 생성 이후에 호출된 생성자는 최초의 생성자가 생성한 객체를 리턴한다.
  export class ProjectState extends State<Project> {
    // 무언가 변경이 될 때마다 함수 호출이 되어야 하는데 변경되는 것을 확인하기 위해 listeners 생성
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    // 프로젝트 추가
    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }

    // drag로 이동한 프로젝트 상태 변경
    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    // 프로젝트 관리하는 listener
    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  // 전역상수로 선언해서 사용할 수 있게 만든다.
  export const projectState = ProjectState.getInstance();
}
