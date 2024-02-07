export const InfoCard = ({
  heading,
  icon,
  subheading,
  button,
}: {
  heading: string
  subheading?: string
  icon?: React.ReactNode
  button?: React.ReactNode
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-md border border-border bg-background p-6 py-24">
      <span className="text-muted-foreground">{icon}</span>
      <div className="text-center">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {heading}
        </h2>
        <p className="leading-7 text-muted-foreground">{subheading}</p>
      </div>
      {button}
    </div>
  )
}
