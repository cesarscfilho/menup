import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"

export default function Index() {
  return (
    <section>
      <Container>
        <div className="mx-auto mb-10 mt-12 max-w-md px-2.5 text-center sm:max-w-xl sm:px-0">
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] sm:text-6xl sm:leading-[1.15]">
            Lorem ipsum dolor
            <br />
            <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
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
      </Container>
    </section>
  )
}
