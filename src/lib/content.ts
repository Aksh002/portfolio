import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx/mdx-components";
import type { Project, ProjectFrontmatter } from "@/lib/types";

const projectsDirectory = path.join(process.cwd(), "src", "content", "projects");

async function readProjectFile(fileName: string) {
  const fullPath = path.join(projectsDirectory, fileName);
  const source = await readFile(fullPath, "utf8");
  const { data } = matter(source);

  const { content } = await compileMDX<ProjectFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    ...(data as ProjectFrontmatter),
    content,
  } satisfies Project;
}

export async function getAllProjects() {
  const files = await readdir(projectsDirectory);
  const projects = await Promise.all(
    files.filter((file) => file.endsWith(".mdx")).map(readProjectFile),
  );

  return projects.sort((left, right) => left.order - right.order);
}

export async function getFeaturedProjects() {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured);
}

