export type marketingConfig = typeof marketingConfig

const marketingConfig = {
  gradient: "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
  navItems: [
    { title: "Features", href: "/#features" },
    { title: "Pricing", href: "/#pricing" },
    { title: "FAQ", href: "/#faq" },
  ],
  testimonials: [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "O que é JavaScript?",
      answer:
        "JavaScript é uma linguagem de programação de alto nível, dinâmica e interpretada, utilizada principalmente para criar interatividade em páginas web.",
    },
    {
      id: "faq-2",
      question: "Quais são os principais recursos do JavaScript?",
      answer:
        "JavaScript oferece recursos poderosos, como manipulação do DOM, gerenciamento de eventos, chamadas assíncronas a servidores, entre outros.",
    },
    {
      id: "faq-3",
      question: "Como posso declarar uma variável em JavaScript?",
      answer:
        'Você pode declarar uma variável em JavaScript utilizando as palavras-chave "var", "let" ou "const", seguidas pelo nome da variável.',
    },
    {
      id: "faq-4",
      question: "O que é DOM em JavaScript?",
      answer:
        "O DOM (Document Object Model) em JavaScript é uma interface que representa um documento como uma árvore de objetos, permitindo a manipulação do conteúdo do documento.",
    },
    {
      id: "faq-5",
      question: "JavaScript é igual a Java?",
      answer:
        "Não, JavaScript e Java são linguagens de programação diferentes, com sintaxe, semântica e casos de uso diferentes. Elas não estão relacionadas.",
    },
  ],
  features: [
    {
      title: "Stripe",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
    {
      title: "Google",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
    {
      title: "Meta",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
    },
    {
      title: "Amazon",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "https://amazon.com",
    },
    {
      title: "Microsoft",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      link: "https://microsoft.com",
    },
  ],
  numberOfUsers: [
    {
      title: "3000+",
      subtitle: "Lorem ipsum",
    },
    {
      title: "7M",
      subtitle: "Lorem ipsum",
    },
    {
      title: "300k",
      subtitle: "Lorem ipsum",
    },
  ],
}

export default marketingConfig
