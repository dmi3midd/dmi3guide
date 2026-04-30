export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  markdownFile: string;
  githubUrl: string;
  tags?: string[];
}
