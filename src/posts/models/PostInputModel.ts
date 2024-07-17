export interface PostInputModelForSpecificBlog {
  title: string;
  shortDescription: string;
  content: string;
}

export interface PostInputModel extends PostInputModelForSpecificBlog {
  blogId: string;
}
