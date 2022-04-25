export interface Post {
  id: string;
  titre: string;
  description: string;
  image: string;
  tags: Array<string>;
  editor: string;
}

class PostService {
  public posts: Array<Post> = [
    {
      id: "1",
      titre: "Party",
      description: "Halloween",
      image:
        "https://www.mieuxenseigner.eu/boutique/image/cache/sellers/2887/1477232884_2bbcf90055ed0df7dcede63d4f0dc0af-800x800.JPG",
      tags: [
        "Evènement",
        "Annonce",
        "BDE",
        "Afterwork",
        "Soirée",
        "Shotgun",
      ],
      editor: "bde",
    },
    {
      id: "2",
      titre: "Sack race",
      description: "Tomorrow, let's meet at Peixotto Park for a fun bag race with your favourite BDS. You'll have to choose a team and a team name",
      image:
        "https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      tags: ["Evénement", "BDS", "Annonce"],
      editor: "bds",
    },
    {
      id: "3",
      titre: "Cognitive Gazette",
      description:
        "Here is the April edition ! Read it and be quick to answer our game, because there will be points only for the first to give the solution ! ❤️🧡💛💚💙 https://drive.google.com/file/d/1PHxdcN-8Rg6N0Dc1yrZczrBcslXb69l_/view?usp=sharing. The theme for the following month if you would like to participate (and we encourage you to do so):  💫 THE LEGENDS 💫 Answer our survey to share your thoughts on the legends of the world and the ENSC in the next issue:https://forms.gle/koTWMcULQQpqqfj16✨✨✨✨✨✨✨✨✨✨✨✨✨",
      image:
        "https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      tags: ["Gazette", "Shotgun", "BDA"],
      editor: "bdf",
    },];

  // Return all post asynchronously. Returns a Promise
  getAll(): Promise<Array<Post>> {
    return new Promise((resolve) => {
      resolve(this.posts);
    });
  }

  add(post: Post) {
    // Add new post at beginning of array
    this.posts = [post, ...this.posts];
  }

  remove(id: string) {
    this.posts = this.posts.filter((post: Post) => post.id !== id);
  }

  update(postUpdated: Post){
    this.remove(postUpdated.id);
    this.add(postUpdated)
  }
}

export default new PostService();