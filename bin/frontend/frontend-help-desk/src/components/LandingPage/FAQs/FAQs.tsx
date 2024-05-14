import React from "react";
import LayoutEffect from "../LayoutEffect";
import SectionWrapper from "../SectionWrapper";

interface FAQItem {
    q: string;
    a: string;
}

const faqsList: FAQItem[] = [
    {
        q: "O que é uma ferramenta de suporte ao cliente?",
        a: "Uma ferramenta de suporte ao cliente é um software que ajuda as empresas a gerenciar e responder a tickets de suporte de clientes de forma eficiente e eficaz.",
    },
    {
        q: "Por que devo usar uma ferramenta de suporte ao cliente?",
        a: "Uma ferramenta de suporte ao cliente pode ajudar as empresas a melhorar a satisfação do cliente, aumentar a eficiência operacional e reduzir custos.",
    },
    {
        q: "Como posso começar com uma ferramenta de suporte ao cliente?",
        a: "Para começar com uma ferramenta de suporte ao cliente, você precisa escolher a ferramenta certa para o seu negócio, configurá-la de acordo com suas necessidades e treinar sua equipe para usá-la efetivamente.",
    },
    {
        q: "Qual é a melhor ferramenta de suporte ao cliente para pequenas empresas?",
        a: "Existem muitas ferramentas de suporte ao cliente disponíveis para pequenas empresas, incluindo o DeskTail. Nossos recursos e preços são projetados para atender às necessidades das pequenas empresas.",
    },
    {
        q: "Como a inteligência artificial pode ajudar minha equipe no suporte ao cliente?",
        a: "A inteligência artificial pode ajudar sua equipe de suporte ao cliente a responder a tickets mais rapidamente, fornecer respostas mais precisas e melhorar a satisfação do cliente. Com o DeskTail, você pode usar a IA para automatizar tarefas repetitivas e fornecer suporte 24 horas por dia, 7 dias por semana.",
    },
    {
        q: "Posso personalizar o DeskTail para atender às necessidades específicas da minha empresa?",
        a: "Sim, o DeskTail é altamente personalizável e pode ser adaptado para atender às necessidades específicas da sua empresa. Você pode personalizar os campos de ticket, criar regras de automação personalizadas e muito mais.",
    }
];

const FAQs: React.FC = () => (
    <SectionWrapper id="faqs">
        <div className="custom-screen text-gray-300">
            <div className="max-w-xl text-center xl:mx-auto">
                <h2 className="text-gray-50 text-3xl font-extrabold sm:text-4xl">
                    Perguntas frequentes
                </h2>
                <p className="mt-3">
                    Aqui estão algumas perguntas frequentes sobre o DeskTail
                </p>
            </div>
            <div className='mt-12'>
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1",
                        falseState: "opacity-0 translate-y-12"
                    }}
                >
                    <ul className='space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3'>
                        {faqsList.map((item, idx) => (
                            <li
                                key={idx}
                                className="space-y-3"
                            >
                                <summary
                                    className="flex items-center justify-between font-semibold text-gray-100">
                                    {item.q}
                                </summary>
                                <p
                                    dangerouslySetInnerHTML={{ __html: item.a }}
                                    className='leading-relaxed'>
                                </p>
                            </li>
                        ))}
                    </ul>
                </LayoutEffect>
            </div>
        </div>
    </SectionWrapper>
);

export default FAQs;