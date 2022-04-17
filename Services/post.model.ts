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
      titre: "Planet of Nature",
      description: "description1",
      image:
        "https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
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
      titre: "Lampost",
      description: "description2",
      image:
        "https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      tags: ["tag number 1", "original tag", "tag 2"],
      editor: "bds",
    },
    {
      id: "3",
      titre: "test 3",
      description:
        "lorem ipsum dolor sit amet ça ne veut rien dire mais j'ai besoin des faire des lignes et donc d'écrire à peu près n'importe quoi, j'espère que ce sera pas trop long, mdr j'ai déjà trop la flemme, d'ailleurs faut que j'aille me coucher demain je me lève tot",
      image:
        "https://images.unsplash.com/photo-1482822683622-00effad5052e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      tags: ["numero 0", "numéro 1"],
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