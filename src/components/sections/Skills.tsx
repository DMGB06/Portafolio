"use client";
import { skills } from "@/data/portfolio";

const Skills = () => {
  return (
    // <section> - Contenedor principal semántico para la sección de habilidades
    <section className="py-2 md:py-10">
      <div className="w-full mb-7 lg:mt-10 md:mb-20 flex flex-row gap-4 items-center">
        {/* Título de la sección de habilidades */}
        <h2
          className="font-normal whitespace-nowrap"
          style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
        >
          <span className="text-secondary">#</span>
          skills
        </h2>
        <div
          className="h-px max-w-1/2 flex-1"
          style={{ backgroundColor: "rgb(var(--secondary))" }}
          aria-hidden="true"
        ></div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {Object.entries(skills).map(([category, skillList]) => (
            <div
              key={category}
              className="mb-5 gap-2 flex w-full max-w-xs justify-center border p-2 rounded min-h-full"
              style={{ borderColor: "rgb(var(--muted))" }}
            >
              <div className="flex-col justify-center">
                <h3 className="p-1 text-center">{category}</h3>
                <ul className="p-2 grid grid-cols-2 gap-3">
                  {skillList.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex flex-col justify-center items-center gap-3"
                    >
                      <skill.icon
                        size={24}
                        className="inline-block mr-2"
                        style={{ color: skill.color }}
                      />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {/*Aqui un pequeño diseñito ps*/}
          <div
            className="hidden md:flex justify-end"
            style={{
              position: "relative",
              width: "200px",
              height: "200px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 100,
                left: 0,
                width: "80px",
                height: "100px",
                border: "2px solid secondary",
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                top: 50,
                left: "40px",
                width: "80px",
                height: "100px",
                border: "2px solid #d4af37",
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                top: 0,
                left: "79px",
                width: "80px",
                height: "100px",
                border: "2px solid #d4af37",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
