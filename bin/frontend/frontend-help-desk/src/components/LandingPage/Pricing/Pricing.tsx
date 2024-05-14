import React from "react";
import LayoutEffect from "../LayoutEffect";
import SectionWrapper from "../SectionWrapper";
import Button from "../Button/Button";

interface Plan {
    name: string;
    desc: string;
    price: number;
    isMostPop: boolean;
    features: string[];
}

const Pricing: React.FC = () => {
    const plans: Plan[] = [
        {
            name: "Demo",
            desc: "Comece gratuitamente",
            price: 0,
            isMostPop: false,
            features: [
                "Emissão de tickets integrada em e-mails e redes sociais",
                "Base de conhecimento",
                "Relatório de tendências dos tickets",
                "Análises e relatórios prontos para uso",
                "Escolha o local de sua central de dados",
                "Colaboração em equipe",
                "Suporte por e-mail 24h",
                "Teste gratuito de 14 dias",
            ],
        },
        {
            name: "Freelancer",
            desc: "Para pequenas equipes e freelancers",
            price: 125.00,
            isMostPop: false,
            features: [
                "Tudo de Demo +",
                "Análises e relatórios avançados",
                "Chatbots",
                "Políticas de SLA ilimitadas e lembretes de violação",
                "Automação de fluxo de trabalho",
                "Suporte por e-mail e chat 24h",
                "Análise de dados de conversa",
                "Integração com aplicativos de terceiros"
            ],
        },
        {
            name: "Empresas",
            desc: "Solução de gerenciamento de serviços para empresas e grandes organizações",
            price: 475.00,
            isMostPop: true,
            features: [
                "Tudo de Freelancer +",
                "Caixas de entrada compartilhadas",
                "Exportações de dados",
                "API de integração",
                "Gerenciamento de SLA e contratos",
                "Suporte dedicado",
                "Acesso a novos recursos",
                "Treinamento personalizado",
                "Gerenciamento de contas",
            ],
        },
    ];

    const mostPopPricingBg =
        "radial-gradient(130.39% 130.39% at 51.31% -0.71%, #1F2937 0%, rgba(31, 41, 55, 0) 100%)";

    return (
        <SectionWrapper id="pricing" className="custom-screen">
            <div className="relative max-w-xl mx-auto text-center">
                <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                    Escolha o plano que melhor se adapta a você e sua empresa
                </h2>
            </div>
            <LayoutEffect
                className="duration-1000 delay-300"
                isInviewState={{
                    trueState: "opacity-1",
                    falseState: "opacity-0",
                }}
            >
                <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
                    {plans.map((item, idx) => (
                        <div
                            key={idx}
                            className={`relative flex-1 flex items-stretch flex-col rounded-xl border border-gray-800 mt-6 sm:mt-0 ${
                                item.isMostPop ? "border border-indigo-500" : ""
                            }`}
                            style={{
                                backgroundImage: item.isMostPop
                                    ? mostPopPricingBg
                                    : "",
                            }}
                        >
                            <div className="p-8 space-y-4 border-b border-gray-800 text-center">
                                <span className="text-indigo-600 font-medium">
                                    {item.name}
                                </span>
                                <div className="text-gray-50 text-3xl font-semibold">
                                    R${item.price}{" "}
                                    <span className="text-xl text-gray-400 font-normal">
                                        /mês
                                    </span>
                                </div>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-3">
                                    {item.features.map((featureItem, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center gap-5 text-gray-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-indigo-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                            {featureItem}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-8">
                                    <Button
                                        className={`w-full rounded-full text-white ring-offset-2 focus:ring ${
                                            item.isMostPop
                                                ? "bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-700 ring-indigo-600"
                                                : "bg-gray-800 hover:bg-gray-700 ring-gray-800"
                                        }`}
                                    >
                                        Comece seu teste gratuito
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </LayoutEffect>
        </SectionWrapper>
    );
};

export default Pricing;