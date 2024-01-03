import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"

export default function Index() {
  return (
    <section className="py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl space-y-6 lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-5xl font-bold tracking-tight">
              Lorem ipsum dolor sit amet.
            </h1>
            <p className="text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              ullam officia cumque voluptas obcaecati, consequuntur praesentium
              repellat labore non illum quia. Ab eaque ut error illo molestiae
              consequuntur perferendis culpa?
            </p>
            <Button>Get started for free</Button>
          </div>
          <div></div>
        </div>
      </Container>
    </section>
  )
}
