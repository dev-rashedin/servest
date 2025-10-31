'use client';
import { useRef } from 'react';
import Image from 'next/image';
import HomeSectionHeading from '../HomeSectionHeading';
import { TimelineContent } from '../TimelineContent';
import { revealVariants } from '@/lib/utils';

function DevFeedback() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  return (
    <main
      ref={testimonialRef}
      className="min-h-screen flex-center bg-gradient-to-b from-background to-muted/30"
    >
      <section className="relative boundary rounded-lg overflow-hidden py-16">
        <HomeSectionHeading
          title="Developers Love Servest"
          subtitle="Hear why Servest is becoming the go-to tool for backend projects"
          ref={testimonialRef}
        />

        <div className="lg:grid lg:grid-cols-3 gap-2 flex flex-col w-full pb-4 xl:px-10">
          {/* first column */}
          <div className="md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2">
            {/* first feedback */}
            <TimelineContent
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative overflow-hidden rounded-lg bg-card hover:bg-card-secondary border-primary p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 grid-line-color"></div>
              <figure>
                <Image src="/logo.svg" alt="Servest" width={50} height={50} />
              </figure>
              <article className="mt-4">
                <p>
                  Servest offers real value for teams needing a fast, consistent way to bootstrap
                  backend projects. Inspired by tools like Vite and shadcn/ui, its developer
                  experience is clear and intuitive. The clean CLI and backend “addons” system
                  bridge a genuine gap in how backend services start today. A cool idea with solid
                  potential.
                </p>
                <div className="flex justify-between pt-8">
                  <div>
                    <h6 className="font-semibold">Adriano Raiano</h6>
                    <p>Creator of i18next, locize & vaultrice</p>
                  </div>
                  <Image
                    src="/devs/Adriano.jpg"
                    alt="Adriano Raiano"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>

            {/* second feedback */}
            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-card hover:bg-cardSecondary overflow-hidden rounded-lg border-primary p-5"
            >
              <article className="mt-auto">
                <p>
                  It is a great project. This Open Source project would certainly help developers to
                  get started with their projects smartly and quickly. Good work!
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h6 className="font-semibold">Tapas Adhikary</h6>
                    <p>CEO, CreoWis | Teacher, tapaScript</p>
                  </div>
                  <Image
                    src="/devs/Tapas.png"
                    alt="Tapas Adhikary"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* second column */}
          <div className="lg:h-full md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2">
            {/* third feedback */}
            <TimelineContent
              animationNum={2}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-card hover:bg-cardSecondary overflow-hidden rounded-lg border-primary p-5"
            >
              <article className="mt-auto">
                <p>
                  Servest Addons feels just like shadcn but for backend tools. Added Mongoose and
                  ESLint in seconds — brilliant experience.
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h6 className="font-semibold">Liam O’Connor</h6>
                    <p>CTO at StackMotion</p>
                  </div>
                  <Image
                    src="/devs/dev3.jpg"
                    alt="Liam"
                    width={64}
                    height={64}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>

            {/* fourth feedback */}
            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-card hover:bg-cardSecondary overflow-hidden rounded-lg border-primary p-5"
            >
              <article className="mt-auto">
                <p>
                  The CLI experience is smooth and developer-friendly. Servest feels like
                  create-vite, but perfectly tuned for backend devs.
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h6 className="font-semibold">Elena Grayson</h6>
                    <p>API Engineer at NovaTech</p>
                  </div>
                  <Image
                    src="/devs/dev4.jpg"
                    alt="Elena"
                    width={64}
                    height={64}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>

            {/* 5th feedback */}
            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-card hover:bg-cardSecondary overflow-hidden rounded-lg border-primary p-5"
            >
              <article className="mt-auto">
                <p>
                  Adding ESLint, Prettier, and Mongoose used to be tedious. Now, it’s literally one
                  command with Servest and — it even adds the right scripts to your package.json.
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h6 className="font-semibold">William Smith</h6>
                    <p>Backend Developer at APIGrid</p>
                  </div>
                  <Image
                    src="/devs/dev6.jpg"
                    alt="Mateo"
                    width={64}
                    height={64}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* third column */}
          <div className="h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2">
            {/* 6th feedback */}
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-card hover:bg-cardSecondary overflow-hidden rounded-lg border-primary p-5"
            >
              <article className="mt-auto">
                <p>
                  Servest brings frontend-style DX to the backend world. It’s modern, fast, and easy
                  to extend.
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h6 className="font-semibold">Sarah Lin</h6>
                    <p>Software Engineer at Craftify</p>
                  </div>
                  <Image
                    src="/devs/dev5.jpg"
                    alt="Sarah Lin"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>

            {/* 7th feedback */}
            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-card hover:bg-cardSecondary overflow-hidden rounded-lg border-primary p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 grid-line-color"></div>
              <figure>
                <Image src="/logo.svg" alt="Servest" width={60} height={60} />
              </figure>
              <article className="mt-auto">
                <p>
                  Servest is honestly awesome! The idea of a next-gen backend starter with instant
                  setup and CLI addons is super cool. Love how it’s modular, typed, and easy to use.
                  The Express templates are a great start too. This has real potential!
                </p>
                <div className="flex justify-between pt-8">
                  <div>
                    <h6 className="font-semibold">Rocky Haque</h6>
                    <p>CTO at Programming-Fighter</p>
                  </div>
                  <Image
                    src="/devs/Rocky.jpg"
                    alt="Rocky Haque"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DevFeedback;
