export default class Post {
    constructor(
      public id: string,
      public titre: string,
      public description: string,
      public image: string,
      public tags: Array<string>,
      public editor: string
    ) {}
}
  