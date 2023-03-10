namespace App {
  //항상 동일한 구조를 갖는 프로젝트 객체 구축
  export enum ProjectStatus {
    Active,
    Finished,
  }

  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}
