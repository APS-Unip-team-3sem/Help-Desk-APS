import React from "react";
import SectionWrapper from "../SectionWrapper";
import GradientWrapper from "../GradientWrapper";
import user1 from "../../../images/user/user-05.png";
import user2 from "../../../images/user/user-01.png";
import user3 from "../../../images/user/user-03.png";
import user4 from "../../../images/user/user-04.png";
import user5 from "../../../images/user/user-02.png";
import user6 from "../../../images/user/user-06.png";
import LayoutEffect from "../LayoutEffect";

interface TestimonialItem {
    avatar: StaticImageData;
    name: string;
    title: string;
    quote: string;
}

const Testimonial: React.FC = () => {
    const testimonials: TestimonialItem[] = [
        {
            avatar: user1,
            name: "Mattheo Silva",
            title: "Fundador da Agropecuária Silva",
            quote: "DeskTail é uma ferramenta incrível para gerenciar tickets de suporte. É fácil de usar e tem muitos recursos úteis. Recomendo a todos!"
        },
        {
            avatar: user2,
            name: "Guilhermo Machado",
            title: "Freelancer da Agreg",
            quote: "Recomendo o DeskTail para quem precisa de uma ferramenta de suporte ao cliente. A automação de fluxo de trabalho é incrível!"
        },
        {
            avatar: user3,
            name: "Sidi Carvalho",
            title: "Fundador da Carvalho Tech",
            quote: "Eu uso o DeskTail para gerenciar tickets de suporte e estou muito satisfeito com a ferramenta. A IA integrada ao ChatBot economiza muito tempo!"
        },
        {
            avatar: user4,
            name: "Isabel Cristina Oliveira",
            title: "Fundadora da Tech Solutions", 
            quote: "Uso o DeskTail há mais de um ano e estou muito satisfeita com o suporte e os recursos oferecidos."
        },
        {
            avatar: user5,
            name: "Ana Laura Ferreira de Souza",
            title: "Freelancer da Solutions Math",
            quote: "Já utilizei diversos softwares de suporte ao cliente, mas o DeskTail é o melhor de todos. Facilita muito o gerenciamento de tickets, as respostas são rápidas e eficientes. Recomendo muito!"
        },
        {
            avatar: user6,
            name: "Arthur Gonçalves",
            title: "Funcionário da TGH Solutions",
            quote: "É a primeira vez que vejo um software de suporte ao cliente tão completo. O DeskTail é incrível e facilita muito o nosso trabalho. Recomendo!"
        },
    ];

    return (
        <SectionWrapper>
            <div id="testimonials" className="custom-screen text-gray-300">
                <div className="max-w-2xl text-center md:mx-auto">
                    <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Depoimentos de nossos clientes
                    </h2>
                </div>
                <GradientWrapper wrapperClassName="max-w-sm h-40 top-12 inset-x-0" className="mt-12">
                    <LayoutEffect
                        className="duration-1000 delay-300"
                        isInviewState={{
                            trueState: "opacity-1",
                            falseState: "opacity-0 translate-y-12"
                        }}
                    >
                        <ul className="grid gap-6 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((item, idx) => (
                                <li key={idx} className="p-4 rounded-xl border border-gray-800"
                                    style={{
                                        backgroundImage: "radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)"
                                    }}
                                >
                                    <figure className="flex flex-col justify-between gap-y-6 h-full">
                                        <blockquote className="">
                                            <p className="">
                                                {item.quote}
                                            </p>
                                        </blockquote>
                                        <div className="flex items-center gap-x-4">
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-14 h-14 rounded-full object-cover"
                                            />
                                            <div>
                                                <span className="block text-gray-50 font-semibold">{item.name}</span>
                                                <span className="block text-sm mt-0.5">{item.title}</span>
                                            </div>
                                        </div>
                                    </figure>
                                </li>
                            ))}
                        </ul>
                    </LayoutEffect>
                </GradientWrapper>
            </div>
        </SectionWrapper>
    );
};

export default Testimonial;