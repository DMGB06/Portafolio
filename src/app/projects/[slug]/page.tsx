import type { Metadata } from "next";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/portfolio";
import { DEFAULT_LOCALE } from "@/i18n";

type ProjectCasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(DEFAULT_LOCALE, slug);

  if (!project) {
    return { title: "Proyecto no encontrado · Denilson Godoy" };
  }

  return {
    title: `${project.title} · Denilson Godoy`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.images,
    },
  };
}

export default async function ProjectCasePage({ params }: ProjectCasePageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-2 md:px-10 pt-6 md:pt-10">
        <ProjectCaseStudy slug={slug} />
      </div>
    </main>
  );
}
