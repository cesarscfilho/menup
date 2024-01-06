import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Input,
  Label,
  Textarea,
} from "@menup/ui";

import { Container } from "@/components/container";

export default function ContactPage() {
  return (
    <Container className="mb-20 space-y-12">
      <div className="mx-auto text-center sm:max-w-xl mt-10">
        <h1 className="text-5xl font-extrabold leading-[1.15] sm:leading-[1.15]">
          <span className="text-cyan-400">Doubt? </span>contact us
        </h1>
        <p className="text-muted-foreground mt-5 sm:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <Card className="mx-auto max-w-[510px] pt-6">
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">YOU WORK EMAIL</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">PHONE</Label>
            <Input id="phone" type="text" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="company">COMPANY NAME</Label>
            <Input id="company" type="text" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="help">HOW CAN WE HELP?</Label>
            <Textarea id="help" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit</Button>
        </CardFooter>
      </Card>
    </Container>
  );
}
