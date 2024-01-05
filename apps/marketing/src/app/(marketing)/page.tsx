import Image from "next/image";

import marketingConfig from "@/config/marketing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Container } from "@/components/container";
import { FeatureCard } from "@/components/feature-card";

export default function Index() {
  return (
    <>
      <section>
        <div className="mx-auto mt-20 max-w-md px-2.5 text-center sm:max-w-xl sm:px-0 md:mt-24">
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] sm:text-6xl sm:leading-[1.15]">
            Lorem ipsum dolor
            <br />
            <span
              className={`${marketingConfig.gradient} bg-clip-text text-transparent`}
            >
              sit amet.
            </span>
          </h1>
          <p className="mt-5 text-muted-foreground sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            ullam officia cumque voluptas obcaecati.
          </p>
          <div className="mx-auto mt-5 flex max-w-fit space-x-4">
            <Button>Start for free</Button>
            <Button variant="outline">Get a demo</Button>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-20 pb-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold leading-[1.15] lg:text-4xl">
              Design modern and{" "}
              <span className="text-orange-500">for anyone</span>
            </h2>
          </div>
          <div className="flow-root">
            <div className="-m-2 rounded-xl bg-muted-foreground/5 p-2 ring-1 ring-inset ring-border/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/dashboard-dark.png"
                alt="product preview"
                width={1364}
                height={866}
                quality={100}
                className="hidden rounded-md dark:block "
              />
              <Image
                src="/dashboard-light.png"
                alt="product preview"
                width={1364}
                height={866}
                quality={100}
                className="block rounded-md dark:hidden"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="features">
        <Container className="space-y-10 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold leading-[1.15] lg:text-4xl">
              <span className={`bg-clip-text text-blue-500`}>All tools,</span>{" "}
              one place.
            </h2>
            <p className="text-muted-foreground sm:text-lg">
              Automate your business with our fee-free platform.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketingConfig.features.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </Container>
      </section>
      <section id="numberOfUsers">
        <div className="md:py-15 border-y border-border py-10  backdrop-blur-[90px]">
          <div className="mx-auto grid w-full max-w-screen-xl gap-y-4 px-2.5 md:grid-cols-3 md:gap-y-0 lg:px-20">
            {marketingConfig.numberOfUsers.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <p className="text-4xl font-bold md:text-5xl">{item.title}</p>
                <p className="font-semibold uppercase text-gray-500 md:text-lg">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="testimonials">
        <div className="space-y-10 py-32">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold leading-[1.15] lg:text-4xl">
              <span className="text-red-500">Don&apos;t take</span> it from us
            </h2>
            <p className="text-muted-foreground sm:text-lg">
              Here&apos;s what our users have to say about Menup
            </p>
          </div>
          <InfiniteMovingCards
            speed="normal"
            items={marketingConfig.testimonials}
          />
        </div>
      </section>
      <section id="faq" className="border-t border-border backdrop-blur-[50px]">
        <Container className="max-w-screen-lg py-20">
          <div className="grid space-y-6">
            <div className="text-start">
              <h2 className="text-4xl font-extrabold leading-[1.15]">FAQ</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {marketingConfig.faqs.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>
    </>
  );
}
