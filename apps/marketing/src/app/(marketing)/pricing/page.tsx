import marketingConfig from "@/config/marketing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@menup/ui";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/container";
import PrincigCard from "@/components/pricing-card";

export default function PrincigPage() {
  return (
    <>
      <Container>
        <div className="mx-auto text-center sm:max-w-xl">
          <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:leading-[1.15]">
            Simple, <span className="text-blue-500">affordable pricing</span>
          </h1>
          <p className="mt-5 text-muted-foreground sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <Badge variant="success" className="mt-10 px-2 py-1.5">
            🎁 2 months FREE
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-8 py-20 lg:grid-cols-3">
          <PrincigCard />
          <PrincigCard />
          <PrincigCard />
        </div>
      </Container>
      <section className="border-t border-border backdrop-blur-[50px]">
        <Container className="max-w-screen-lg py-20">
          <div className="grid space-y-6">
            <div className="text-start">
              <h2 className="text-4xl font-extrabold leading-[1.15]">
                Pricing FAQs
              </h2>
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
