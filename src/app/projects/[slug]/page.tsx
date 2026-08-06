import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { getAllProjectSlugs } from "@/data/portfolio";

type ProjectCasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
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
